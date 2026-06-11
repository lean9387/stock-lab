const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

const port = Number(process.env.PORT || process.argv[2] || 5173);
const host = process.env.HOST || "0.0.0.0";
const root = path.resolve(process.argv[3] || __dirname);
const krxIsins = {
  "005930": "KR7005930003",
  "000660": "KR7000660001",
  "005380": "KR7005380001",
  "498400": "KR7498400001"
};
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".md": "text/plain; charset=utf-8"
};

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

function recentBusinessDates(count, end = new Date()) {
  const dates = [];
  const date = new Date(end);
  while (dates.length < count) {
    const day = date.getDay();
    if (day !== 0 && day !== 6) {
      dates.unshift(formatDate(date));
    }
    date.setDate(date.getDate() - 1);
  }
  return dates;
}

function parseKrxNumber(value) {
  if (typeof value === "number") return value;
  if (!value || value === "-") return 0;
  return Number(String(value).replace(/,/g, "")) || 0;
}

function postForm(url, params) {
  return new Promise((resolve, reject) => {
    const body = params.toString();
    const request = https.request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Content-Length": Buffer.byteLength(body),
        "User-Agent": "Mozilla/5.0 StockLab/1.0",
        "Referer": "https://data.krx.co.kr/contents/MDC/MDI/outerLoader/index.cmd",
        "X-Requested-With": "XMLHttpRequest"
      }
    }, (res) => {
      let responseBody = "";
      res.on("data", (chunk) => {
        responseBody += chunk;
      });
      res.on("end", () => {
        resolve({ status: res.statusCode, body: responseBody });
      });
    });

    request.on("error", reject);
    request.setTimeout(8000, () => {
      request.destroy(new Error("Request timed out"));
    });
    request.end(body);
  });
}

async function fetchKrxInvestorFlow(code) {
  const isin = krxIsins[code];
  if (!isin) {
    return { rows: [], source: "KRX", error: "KRX ISIN mapping not found" };
  }

  const businessDates = recentBusinessDates(10);
  const response = await postForm("https://data.krx.co.kr/comm/bldAttendant/getJsonData.cmd", new URLSearchParams({
    bld: "dbms/MDC/STAT/standard/MDCSTAT02302",
    locale: "ko_KR",
    strtDd: businessDates[0],
    endDd: businessDates[businessDates.length - 1],
    isuCd: isin,
    inqTpCd: "2",
    trdVolVal: "2",
    askBid: "3"
  }));

  if (response.status !== 200 || response.body.trim() === "LOGOUT") {
    throw new Error("KRX가 현재 세션 요청을 거부했습니다. 개발 서버 재시작 후에도 반복되면 KRX 로그인 세션이 필요한 상태입니다.");
  }

  const payload = JSON.parse(response.body);
  const output = Array.isArray(payload.output) ? payload.output : [];
  const rows = output.slice(0, 5).reverse().map((row) => {
    const institution = parseKrxNumber(row.TRDVAL1);
    const personal = parseKrxNumber(row.TRDVAL3);
    const foreigner = parseKrxNumber(row.TRDVAL4);
    return {
      date: String(row.TRD_DD || "").replace(/\//g, ".").slice(2),
      personal,
      foreigner,
      institution
    };
  });

  return { rows, source: "KRX", updatedAt: Date.now() };
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 StockLab/1.0"
      }
    }, (res) => {
      let body = "";
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
    });

    request.on("error", reject);
    request.setTimeout(8000, () => {
      request.destroy(new Error("Request timed out"));
    });
  });
}

function lastNumber(values) {
  if (!Array.isArray(values)) return null;
  for (let index = values.length - 1; index >= 0; index -= 1) {
    if (typeof values[index] === "number" && Number.isFinite(values[index])) {
      return values[index];
    }
  }
  return null;
}

async function fetchYahooChart(symbol) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1d&interval=1m`;
  const json = await fetchJson(url);
  const result = json.chart && json.chart.result && json.chart.result[0];
  if (!result) throw new Error(`No quote data for ${symbol}`);

  const meta = result.meta || {};
  const closes = result.indicators && result.indicators.quote && result.indicators.quote[0]
    ? result.indicators.quote[0].close
    : [];
  const price = meta.regularMarketPrice || lastNumber(closes) || meta.previousClose || meta.chartPreviousClose;
  const previousClose = meta.previousClose || meta.chartPreviousClose || price;
  const change = price && previousClose ? ((price - previousClose) / previousClose) * 100 : 0;

  return {
    symbol,
    currency: meta.currency || null,
    marketState: meta.marketState || null,
    price,
    previousClose,
    change,
    time: meta.regularMarketTime ? meta.regularMarketTime * 1000 : Date.now()
  };
}

http.createServer((request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host || "127.0.0.1"}`);
  const urlPath = decodeURIComponent(requestUrl.pathname);

  if (urlPath === "/api/quotes") {
    const symbols = (requestUrl.searchParams.get("symbols") || "")
      .split(",")
      .map((symbol) => symbol.trim())
      .filter(Boolean);

    Promise.all(symbols.map(async (symbol) => {
      try {
        return await fetchYahooChart(symbol);
      } catch (error) {
        return { symbol, error: error.message };
      }
    })).then((quotes) => {
      response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      response.end(JSON.stringify({ quotes, updatedAt: Date.now() }));
    }).catch((error) => {
      response.writeHead(502, { "Content-Type": "application/json; charset=utf-8" });
      response.end(JSON.stringify({ error: error.message }));
    });
    return;
  }

  if (urlPath === "/api/investor-flow") {
    const code = (requestUrl.searchParams.get("code") || "").trim();
    const dates = recentBusinessDates(5).map((date) => `${date.slice(2, 4)}.${date.slice(4, 6)}.${date.slice(6, 8)}`);

    if (!code) {
      response.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
      response.end(JSON.stringify({ error: "Missing code" }));
      return;
    }

    fetchKrxInvestorFlow(code).then((result) => {
      response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      response.end(JSON.stringify({
        code,
        rows: result.rows,
        source: result.source,
        updatedAt: result.updatedAt || Date.now()
      }));
    }).catch((error) => {
      response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      response.end(JSON.stringify({
        code,
        rows: dates.map((date) => ({ date, personal: null, foreigner: null, institution: null })),
        source: "KRX",
        error: error.message,
        updatedAt: Date.now()
      }));
    });
    return;
  }

  const relativePath = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, "");
  const filePath = path.resolve(root, relativePath);

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, { "Content-Type": types[path.extname(filePath)] || "application/octet-stream" });
    response.end(data);
  });
}).listen(port, host, () => {
  console.log(`Stock Lab is running on ${host}:${port}`);
});
