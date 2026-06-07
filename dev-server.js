const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

const port = Number(process.env.PORT || process.argv[2] || 5173);
const host = process.env.HOST || "0.0.0.0";
const root = path.resolve(process.argv[3] || __dirname);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".md": "text/plain; charset=utf-8"
};

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
