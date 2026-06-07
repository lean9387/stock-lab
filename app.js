let usdKrw = 1559;

const stocks = [
  { code: "JOBY", name: "Joby Aviation", koName: "조비 에비에이션", market: "NASDAQ", currency: "USD", price: 9.55, change: -0.14, momentum: 0.22, volatility: 0.48, sector: "eVTOL", annualDividend: 0, dividendYield: 0, dividendFrequency: "없음", marketCap: 7600000000, tradedValue: 184000000 },
  { code: "SLDP", name: "Solid Power", koName: "솔리드파워", market: "NASDAQ", currency: "USD", price: 2.94, change: -0.12, momentum: 0.11, volatility: 0.58, sector: "전고체 배터리", annualDividend: 0, dividendYield: 0, dividendFrequency: "없음", marketCap: 560000000, tradedValue: 19200000 },
  { code: "SCHD", name: "Schwab US Dividend Equity ETF", koName: "슈드 배당 ETF", market: "NYSE", currency: "USD", price: 26.35, change: 0.18, momentum: 0.05, volatility: 0.14, sector: "배당 ETF", annualDividend: 1.02, dividendYield: 3.87, dividendFrequency: "분기", marketCap: 64000000000, tradedValue: 310000000 },
  { code: "O", name: "Realty Income", koName: "리얼티인컴", market: "NYSE", currency: "USD", price: 54.82, change: 0.32, momentum: 0.04, volatility: 0.18, sector: "리츠", annualDividend: 3.22, dividendYield: 5.87, dividendFrequency: "월", marketCap: 49000000000, tradedValue: 260000000 },
  { code: "VZ", name: "Verizon", koName: "버라이즌", market: "NYSE", currency: "USD", price: 40.12, change: -0.21, momentum: 0.02, volatility: 0.16, sector: "통신", annualDividend: 2.71, dividendYield: 6.75, dividendFrequency: "분기", marketCap: 169000000000, tradedValue: 760000000 },
  { code: "KO", name: "Coca-Cola", koName: "코카콜라", market: "NYSE", currency: "USD", price: 63.88, change: 0.15, momentum: 0.03, volatility: 0.12, sector: "필수소비재", annualDividend: 2.04, dividendYield: 3.19, dividendFrequency: "분기", marketCap: 275000000000, tradedValue: 650000000 },
  { code: "TSLA", name: "Tesla", koName: "테슬라", market: "NASDAQ", currency: "USD", price: 322.05, change: 1.22, momentum: 0.2, volatility: 0.38, sector: "전기차", annualDividend: 0, dividendYield: 0, dividendFrequency: "없음", marketCap: 1030000000000, tradedValue: 23000000000 },
  { code: "NVDA", name: "NVIDIA", koName: "엔비디아", market: "NASDAQ", currency: "USD", price: 141.72, change: 0.68, momentum: 0.3, volatility: 0.34, sector: "AI 반도체", annualDividend: 0.04, dividendYield: 0.03, dividendFrequency: "분기", marketCap: 3480000000000, tradedValue: 28000000000 },
  { code: "005930", name: "Samsung Electronics", koName: "삼성전자", market: "KRX", currency: "KRW", price: 74200, change: 1.4, momentum: 0.18, volatility: 0.22, sector: "반도체", annualDividend: 1444, dividendYield: 1.95, dividendFrequency: "분기", marketCap: 441000000000000, tradedValue: 920000000000 },
  { code: "000660", name: "SK hynix", koName: "SK하이닉스", market: "KRX", currency: "KRW", price: 224500, change: 2.1, momentum: 0.28, volatility: 0.31, sector: "반도체", annualDividend: 1200, dividendYield: 0.53, dividendFrequency: "분기", marketCap: 163000000000000, tradedValue: 1120000000000 },
  { code: "005380", name: "Hyundai Motor", koName: "현대차", market: "KRX", currency: "KRW", price: 271000, change: 0.8, momentum: 0.12, volatility: 0.2, sector: "자동차", annualDividend: 12000, dividendYield: 4.43, dividendFrequency: "반기", marketCap: 56800000000000, tradedValue: 210000000000 }
];

let holdings = [
  { code: "JOBY", quantity: 1040, avgPrice: 9.55 },
  { code: "SLDP", quantity: 470, avgPrice: 2.94 }
];

let watchlist = ["JOBY", "SLDP", "SCHD", "O", "VZ", "KO", "005930"];
let forecastDays = 1;
let stockFilter = "all";
let detailPeriod = "1m";
let detailChartHoverIndex = null;
const colors = ["#4f8cff", "#27d596", "#ff5d73", "#f2bf4b", "#8b5cf6", "#39d0ff", "#f472b6", "#94a3b8"];

const krwFormatter = new Intl.NumberFormat("ko-KR");
const usdFormatter = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const won = (value) => `${krwFormatter.format(Math.round(value))}원`;
const money = (stock, value) => stock.currency === "USD" ? `$${usdFormatter.format(value)}` : won(value);
const priceInKrw = (stock) => stock.currency === "USD" ? stock.price * usdKrw : stock.price;
const avgInKrw = (stock, avgPrice) => stock.currency === "USD" ? avgPrice * usdKrw : avgPrice;
const annualDividendInKrw = (stock) => stock.currency === "USD" ? stock.annualDividend * usdKrw : stock.annualDividend;
const percent = (value) => `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
const stockByCode = (code) => stocks.find((stock) => stock.code === code);
const isDomestic = (stock) => stock.market === "KRX";
const compactMoney = (stock, value) => {
  if (stock.currency === "USD") {
    if (value >= 1_000_000_000_000) return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
    if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
    return `$${usdFormatter.format(value)}`;
  }
  if (value >= 1_0000_0000_0000) return `${(value / 1_0000_0000_0000).toFixed(1)}조원`;
  if (value >= 1_0000_0000) return `${(value / 1_0000_0000).toFixed(1)}억원`;
  return won(value);
};
const yahooSymbolFor = (stock) => {
  if (stock.code === "005930") return "005930.KS";
  if (stock.code === "000660") return "000660.KS";
  if (stock.code === "005380") return "005380.KS";
  return stock.code;
};
const signedPercentText = (value) => `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
const heartIcon = (active) => `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 20.2c-.3 0-.6-.1-.8-.3C5.5 15.1 2 11.9 2 7.9 2 4.9 4.3 2.7 7.2 2.7c1.7 0 3.4.8 4.4 2.1 1-1.3 2.7-2.1 4.4-2.1 2.9 0 5.2 2.2 5.2 5.2 0 4-3.5 7.2-9.2 12-.2.2-.5.3-.8.3Z"/>
  </svg>
  <span>${active ? "관심중" : "관심"}</span>
`;

function prepareCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(320, Math.round(rect.width));
  const height = Math.max(240, Math.round(rect.height));

  if (canvas.width !== width * ratio || canvas.height !== height * ratio) {
    canvas.width = width * ratio;
    canvas.height = height * ratio;
  }

  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return { ctx, width, height };
}

const elements = {
  marketTime: document.querySelector("#marketTime"),
  totalValue: document.querySelector("#totalValue"),
  totalChange: document.querySelector("#totalChange"),
  forecastReturn: document.querySelector("#forecastReturn"),
  forecastLabel: document.querySelector("#forecastLabel"),
  riskScore: document.querySelector("#riskScore"),
  riskLabel: document.querySelector("#riskLabel"),
  holdingCount: document.querySelector("#holdingCount"),
  stockSelect: document.querySelector("#stockSelect"),
  quantityInput: document.querySelector("#quantityInput"),
  avgPriceInput: document.querySelector("#avgPriceInput"),
  holdingForm: document.querySelector("#holdingForm"),
  holdingsList: document.querySelector("#holdingsList"),
  allocationChart: document.querySelector("#allocationChart"),
  forecastChart: document.querySelector("#forecastChart"),
  stockTable: document.querySelector("#stockTable"),
  largestHolding: document.querySelector("#largestHolding"),
  resetButton: document.querySelector("#resetButton"),
  onlyPositiveToggle: document.querySelector("#onlyPositiveToggle"),
  stockSearchInput: document.querySelector("#stockSearchInput"),
  clearSearchButton: document.querySelector("#clearSearchButton"),
  searchResults: document.querySelector("#searchResults")
};

const marketElements = {
  usdKrwValue: document.querySelector("#usdKrwValue"),
  kospiValue: document.querySelector("#kospiValue"),
  kospiChange: document.querySelector("#kospiChange"),
  nasdaqValue: document.querySelector("#nasdaqValue"),
  nasdaqChange: document.querySelector("#nasdaqChange"),
  status: document.querySelector("#marketDataStatus")
};
const detailElements = {
  modal: document.querySelector("#stockModal"),
  title: document.querySelector("#stockDetailTitle"),
  code: document.querySelector("#detailCode"),
  price: document.querySelector("#detailPrice"),
  change: document.querySelector("#detailChange"),
  market: document.querySelector("#detailMarket"),
  sector: document.querySelector("#detailSector"),
  dividend: document.querySelector("#detailDividend"),
  yield: document.querySelector("#detailYield"),
  watchButton: document.querySelector("#detailWatchButton"),
  holdButton: null
};
let activeDetailCode = null;

function filteredStocks(list) {
  return list.filter((stock) => {
    if (stockFilter === "domestic") return isDomestic(stock);
    if (stockFilter === "overseas") return !isDomestic(stock);
    return true;
  });
}

function generatePriceSeries(stock, period) {
  const lengthMap = { "1m": 22, "3m": 63, "1y": 252 };
  const count = lengthMap[period] || 22;
  const amplitude = stock.volatility * stock.price * (period === "1y" ? 0.45 : period === "3m" ? 0.24 : 0.1);
  const drift = stock.momentum * stock.price * (period === "1y" ? 0.55 : period === "3m" ? 0.28 : 0.1);
  const start = new Date();
  start.setDate(start.getDate() - count + 1);

  return Array.from({ length: count }, (_, index) => {
    const progress = index / Math.max(count - 1, 1);
    const wave = Math.sin(progress * Math.PI * 2.4) * amplitude * 0.42;
    const smallWave = Math.cos(progress * Math.PI * 6.2) * amplitude * 0.16;
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return {
      date,
      close: Math.max(stock.price * 0.25, stock.price - drift + drift * progress + wave + smallWave)
    };
  });
}

function investorFlow(stock) {
  if (!isDomestic(stock)) {
    return [
      { date: "D-4", personal: "-", foreigner: "-", institution: "-" },
      { date: "D-3", personal: "-", foreigner: "-", institution: "-" },
      { date: "D-2", personal: "-", foreigner: "-", institution: "-" },
      { date: "D-1", personal: "-", foreigner: "-", institution: "-" },
      { date: "오늘", personal: "-", foreigner: "-", institution: "-" }
    ];
  }

  const seed = Number(stock.code.slice(-3));
  return Array.from({ length: 5 }, (_, index) => {
    const personal = Math.round((Math.sin(seed + index) * 420 + 80) * 1000000);
    const foreigner = Math.round((Math.cos(seed * 0.7 + index) * 360 - 40) * 1000000);
    const institution = -(personal + foreigner);
    return {
      date: index === 4 ? "오늘" : `D-${4 - index}`,
      personal,
      foreigner,
      institution
    };
  });
}

function holdingRows() {
  return holdings.map((holding) => {
    const stock = stockByCode(holding.code);
    const value = priceInKrw(stock) * holding.quantity;
    const cost = avgInKrw(stock, holding.avgPrice) * holding.quantity;
    const profitRate = cost ? ((value - cost) / cost) * 100 : 0;
    const forecast = forecastFor(stock, forecastDays);
    const annualDividend = annualDividendInKrw(stock) * holding.quantity;
    return { ...holding, stock, value, cost, profitRate, forecast, annualDividend };
  });
}

function forecastFor(stock, days) {
  const horizonWeight = Math.sqrt(days / 30);
  const signal = stock.momentum * 8 + stock.change * 0.18 - stock.volatility * 1.7;
  return signal * horizonWeight;
}

function riskFrom(rows) {
  const total = rows.reduce((sum, row) => sum + row.value, 0);
  if (!total) return { score: 0, label: "낮음" };
  const maxWeight = Math.max(...rows.map((row) => row.value / total));
  const weightedVolatility = rows.reduce((sum, row) => sum + (row.value / total) * row.stock.volatility, 0);
  const score = Math.min(100, Math.round(maxWeight * 55 + weightedVolatility * 120));
  const label = score > 55 ? "높음" : score > 34 ? "보통" : "낮음";
  return { score, label };
}

function fillChartBackground(ctx, width, height) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#101827");
  gradient.addColorStop(1, "#060a12");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function drawAllocation(rows) {
  const canvas = elements.allocationChart;
  const { ctx, width, height } = prepareCanvas(canvas);
  const total = rows.reduce((sum, row) => sum + row.value, 0);
  ctx.clearRect(0, 0, width, height);
  fillChartBackground(ctx, width, height);

  if (!total) return;

  const compact = width < 560;
  const cx = compact ? width / 2 : Math.min(150, width * 0.24);
  const cy = height / 2 + 2;
  const radius = compact ? Math.min(width, height) * 0.28 : 72;
  const lineWidth = compact ? 20 : 22;
  const gap = 0.025;

  const halo = ctx.createRadialGradient(cx, cy, 36, cx, cy, radius + 44);
  halo.addColorStop(0, "rgba(79, 140, 255, 0.12)");
  halo.addColorStop(0.62, "rgba(39, 213, 150, 0.06)");
  halo.addColorStop(1, "rgba(79, 140, 255, 0)");
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(cx, cy, radius + 44, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(148, 163, 184, 0.14)";
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(cx, cy, radius, -Math.PI / 2, Math.PI * 1.5);
  ctx.stroke();

  let start = -Math.PI / 2;

  rows.forEach((row, index) => {
    const angle = (row.value / total) * Math.PI * 2;
    const end = start + angle - gap;
    ctx.beginPath();
    ctx.strokeStyle = colors[index % colors.length];
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "butt";
    ctx.shadowColor = "rgba(0, 0, 0, 0)";
    ctx.shadowBlur = 0;
    ctx.arc(cx, cy, radius, start + gap, Math.max(start + gap, end));
    ctx.stroke();
    start += angle;
  });

  ctx.beginPath();
  ctx.fillStyle = "rgba(5, 9, 17, 0.92)";
  ctx.arc(cx, cy, radius - lineWidth / 2 - 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = "#f4f7fb";
  ctx.textAlign = "center";
  ctx.font = "800 17px Arial";
  ctx.fillText(`${rows.length}개`, cx, cy - 2);
  ctx.fillStyle = "#8b98aa";
  ctx.font = "12px Arial";
  ctx.fillText("보유종목", cx, cy + 18);

  if (compact) {
    ctx.textAlign = "center";
    rows.slice(0, 3).forEach((row, index) => {
      const percentValue = (row.value / total) * 100;
      const x = width / 2 + (index - (Math.min(rows.length, 3) - 1) / 2) * 96;
      const y = height - 24;
      ctx.fillStyle = colors[index % colors.length];
      ctx.font = "800 13px Arial";
      ctx.fillText(row.stock.code, x, y - 14);
      ctx.fillStyle = "#f4f7fb";
      ctx.fillText(`${percentValue.toFixed(1)}%`, x, y + 2);
    });
    ctx.textAlign = "left";
    return;
  }

  ctx.textAlign = "left";
  rows.forEach((row, index) => {
    const percentValue = (row.value / total) * 100;
    const legendX = Math.max(292, width - 286);
    const y = 72 + index * 50;
    const color = colors[index % colors.length];

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(legendX, y - 17, 4, 34, 2);
    ctx.fill();

    ctx.fillStyle = "#f4f7fb";
    ctx.font = "800 18px Arial";
    ctx.fillText(row.stock.code, legendX + 16, y - 4);

    ctx.fillStyle = "#8b98aa";
    ctx.font = "12px Arial";
    ctx.fillText(won(row.value), legendX + 16, y + 15);

    ctx.textAlign = "right";
    ctx.fillStyle = color;
    ctx.font = "800 20px Arial";
    ctx.fillText(`${percentValue.toFixed(1)}%`, width - 30, y + 4);
    ctx.textAlign = "left";
  });
}

function drawForecast(rows) {
  const canvas = elements.forecastChart;
  const { ctx, width, height } = prepareCanvas(canvas);
  ctx.clearRect(0, 0, width, height);
  fillChartBackground(ctx, width, height);

  const total = rows.reduce((sum, row) => sum + row.value, 0);
  const annualIncome = rows.reduce((sum, row) => sum + row.annualDividend, 0);
  if (!total) return;

  const years = forecastDays;
  const steps = Math.max(2, years + 1);
  const points = Array.from({ length: steps }, (_, index) => {
    return annualIncome * index;
  });

  const min = 0;
  const max = Math.max(...points, annualIncome || total * 0.01) * 1.12;
  const left = 60;
  const right = width - 28;
  const top = 30;
  const bottom = height - 46;

  ctx.strokeStyle = "rgba(148, 163, 184, 0.2)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i += 1) {
    const y = top + ((bottom - top) / 3) * i;
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
    ctx.stroke();
  }

  const lineGradient = ctx.createLinearGradient(left, 0, right, 0);
  lineGradient.addColorStop(0, "#39d0ff");
  lineGradient.addColorStop(1, annualIncome > 0 ? "#27d596" : "#8b98aa");

  ctx.beginPath();
  points.forEach((point, index) => {
    const x = left + ((right - left) / (steps - 1)) * index;
    const y = bottom - ((point - min) / (max - min)) * (bottom - top);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = lineGradient;
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = "#8b98aa";
  ctx.font = "12px Arial";
  ctx.fillText(won(max), 8, top + 4);
  ctx.fillText("0원", 8, bottom);
  ctx.fillText("현재", left, height - 18);
  ctx.textAlign = "right";
  ctx.fillText(`${years}년 누적`, right, height - 18);
  ctx.textAlign = "left";

  ctx.fillStyle = "#f4f7fb";
  ctx.font = "800 18px Arial";
  ctx.fillText(annualIncome > 0 ? `연 ${won(annualIncome)}` : "현재 보유 배당 0원", left, top + 24);
}

function renderSummary(rows) {
  const total = rows.reduce((sum, row) => sum + row.value, 0);
  const cost = rows.reduce((sum, row) => sum + row.cost, 0);
  const totalChange = cost ? ((total - cost) / cost) * 100 : 0;
  const annualIncome = rows.reduce((sum, row) => sum + row.annualDividend, 0);
  const dividendYield = total ? (annualIncome / total) * 100 : 0;
  const dividendPayers = rows.filter((row) => row.annualDividend > 0).length;
  const largest = rows.length ? [...rows].sort((a, b) => b.value - a.value)[0] : null;

  elements.totalValue.textContent = won(total);
  elements.totalChange.textContent = percent(totalChange);
  elements.totalChange.className = totalChange >= 0 ? "up" : "down";
  elements.forecastReturn.textContent = won(annualIncome);
  elements.forecastLabel.textContent = annualIncome > 0 ? "연간 세전 기준" : "보유 종목 배당 없음";
  elements.forecastLabel.className = annualIncome > 0 ? "up" : "neutral";
  elements.riskScore.textContent = `${dividendYield.toFixed(2)}%`;
  elements.riskLabel.textContent = "세전 배당률";
  elements.holdingCount.textContent = String(dividendPayers);
  elements.largestHolding.textContent = largest ? `${largest.stock.code} ${((largest.value / total) * 100).toFixed(1)}%` : "-";
}

function renderHoldings(rows) {
  elements.holdingsList.innerHTML = rows.map((row) => `
    <div class="holding-item">
      <div>
        <strong>${row.stock.koName} <small>${row.stock.code}</small></strong>
        <span>${row.quantity.toLocaleString("ko-KR")}주 · ${money(row.stock, row.stock.price)} · 배당률 ${row.stock.dividendYield.toFixed(2)}%</span>
        <small class="holding-sub">${won(row.value)} · 연 배당 ${won(row.annualDividend)} · ${row.stock.dividendFrequency}</small>
      </div>
      <button type="button" aria-label="${row.stock.code} 삭제" data-remove="${row.code}">×</button>
    </div>
  `).join("");
}

function watchlistRows() {
  return watchlist.map(stockByCode).filter(Boolean);
}

function renderTable() {
  const onlyPositive = elements.onlyPositiveToggle.checked;
  const rows = filteredStocks(watchlistRows())
    .map((stock) => ({ ...stock, forecast: forecastFor(stock, forecastDays) }))
    .filter((stock) => !onlyPositive || stock.dividendYield > 0);

  elements.stockTable.innerHTML = `
    <div class="table-header">
      <span>종목</span>
      <span>현재가</span>
      <span>배당률</span>
      <span>연배당</span>
    </div>
    ${rows.map((stock) => `
      <div class="stock-row clickable-row" data-open-detail="${stock.code}">
        <div class="stock-name">
          <strong>${stock.koName}</strong>
          <span>${stock.code} · ${stock.market} · ${stock.sector}</span>
        </div>
        <strong>${money(stock, stock.price)}</strong>
        <span class="${stock.dividendYield > 0 ? "up" : "neutral"}">${stock.dividendYield.toFixed(2)}%</span>
        <strong class="${stock.annualDividend > 0 ? "up" : "neutral"}">${money(stock, stock.annualDividend)}</strong>
      </div>
    `).join("")}
  `;
}

function renderSearchResults() {
  const query = elements.stockSearchInput.value.trim().toLowerCase();
  const rows = filteredStocks(stocks).filter((stock) => {
    const haystack = `${stock.code} ${stock.name} ${stock.koName} ${stock.sector} ${stock.market}`.toLowerCase();
    return !query || haystack.includes(query);
  });

  elements.searchResults.innerHTML = rows.map((stock) => `
    <div class="search-result" data-open-detail="${stock.code}">
      <button class="heart-button ${watchlist.includes(stock.code) ? "active" : ""}" type="button" data-watch="${stock.code}" aria-label="${stock.koName} 관심">${heartIcon(watchlist.includes(stock.code))}</button>
      <div class="stock-name">
        <strong>${stock.koName}</strong>
        <span>${stock.code} · ${stock.name} · ${stock.market}</span>
      </div>
      <div class="search-price">
        <strong>${money(stock, stock.price)}</strong>
        <span class="${stock.dividendYield > 0 ? "up" : "neutral"}">배당 ${stock.dividendYield.toFixed(2)}%</span>
      </div>
      <div class="search-actions">
      </div>
    </div>
  `).join("");
}

function renderMarketStockCards() {
  ["005930", "000660", "005380"].forEach((code) => {
    const stock = stockByCode(code);
    const priceElement = document.querySelector(`[data-card-price="${code}"]`);
    const changeElement = document.querySelector(`[data-card-change="${code}"]`);
    if (!stock || !priceElement || !changeElement) return;

    priceElement.textContent = money(stock, stock.price);
    changeElement.textContent = signedPercentText(stock.change || 0);
    changeElement.className = stock.change >= 0 ? "up" : "down";
  });
}

function drawDetailChart(stock) {
  const canvas = document.querySelector("#detailChart");
  if (!canvas) return;
  const { ctx, width, height } = prepareCanvas(canvas);
  ctx.clearRect(0, 0, width, height);
  fillChartBackground(ctx, width, height);

  const points = generatePriceSeries(stock, detailPeriod);
  const closes = points.map((point) => point.close);
  const min = Math.min(...closes) * 0.98;
  const max = Math.max(...closes) * 1.02;
  const left = 58;
  const right = width - 26;
  const top = 24;
  const bottom = height - 36;
  const xForIndex = (index) => left + ((right - left) / Math.max(points.length - 1, 1)) * index;
  const yForClose = (close) => bottom - ((close - min) / (max - min)) * (bottom - top);

  ctx.strokeStyle = "rgba(148, 163, 184, 0.2)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 3; i += 1) {
    const y = top + ((bottom - top) / 2) * i;
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
    ctx.stroke();
  }

  const gradient = ctx.createLinearGradient(left, 0, right, 0);
  gradient.addColorStop(0, "#39d0ff");
  gradient.addColorStop(1, stock.change >= 0 ? "#27d596" : "#ff5d73");
  ctx.beginPath();
  points.forEach((point, index) => {
    const x = xForIndex(index);
    const y = yForClose(point.close);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 3;
  ctx.stroke();

  if (detailChartHoverIndex !== null && points[detailChartHoverIndex]) {
    const point = points[detailChartHoverIndex];
    const x = xForIndex(detailChartHoverIndex);
    const y = yForClose(point.close);

    ctx.strokeStyle = "rgba(244, 247, 251, 0.32)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, top);
    ctx.lineTo(x, bottom);
    ctx.stroke();

    ctx.fillStyle = "#050911";
    ctx.strokeStyle = stock.change >= 0 ? "#27d596" : "#ff5d73";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  ctx.fillStyle = "#8b98aa";
  ctx.font = "12px Arial";
  ctx.fillText(money(stock, max), 8, top + 4);
  ctx.fillText(money(stock, min), 8, bottom);
  ctx.fillText(detailPeriod === "1m" ? "1개월" : detailPeriod === "3m" ? "3개월" : "1년", left, height - 12);
}

function updateDetailChartTooltip(event) {
  if (!activeDetailCode) return;
  const stock = stockByCode(activeDetailCode);
  const canvas = document.querySelector("#detailChart");
  const tooltip = document.querySelector("#detailChartTooltip");
  if (!stock || !canvas || !tooltip) return;

  const points = generatePriceSeries(stock, detailPeriod);
  const rect = canvas.getBoundingClientRect();
  const left = 58;
  const right = rect.width - 26;
  const relativeX = Math.min(Math.max(event.clientX - rect.left, left), right);
  const index = Math.round(((relativeX - left) / Math.max(right - left, 1)) * (points.length - 1));
  const point = points[Math.min(Math.max(index, 0), points.length - 1)];
  detailChartHoverIndex = points.indexOf(point);
  drawDetailChart(stock);

  const tooltipX = Math.min(Math.max(relativeX + 14, 8), rect.width - 148);
  const tooltipY = Math.max(event.clientY - rect.top - 44, 8);
  tooltip.style.left = `${tooltipX}px`;
  tooltip.style.top = `${tooltipY}px`;
  tooltip.hidden = false;
  tooltip.innerHTML = `
    <span>${new Intl.DateTimeFormat("ko-KR", { month: "short", day: "numeric" }).format(point.date)}</span>
    <strong>${money(stock, point.close)}</strong>
    <span>종가</span>
  `;
}

function hideDetailChartTooltip() {
  const tooltip = document.querySelector("#detailChartTooltip");
  if (tooltip) tooltip.hidden = true;
  detailChartHoverIndex = null;
  if (activeDetailCode) drawDetailChart(stockByCode(activeDetailCode));
}

function renderInvestorFlow(stock) {
  const table = document.querySelector("#investorFlowTable");
  if (!table) return;
  table.innerHTML = `
    <div class="investor-row investor-head">
      <span>일자</span>
      <span>개인</span>
      <span>외국인</span>
      <span>기관</span>
    </div>
    ${investorFlow(stock).map((row) => `
      <div class="investor-row">
        <span>${row.date}</span>
        <span class="${typeof row.personal === "number" && row.personal >= 0 ? "up" : "down"}">${typeof row.personal === "number" ? compactMoney(stock, row.personal) : row.personal}</span>
        <span class="${typeof row.foreigner === "number" && row.foreigner >= 0 ? "up" : "down"}">${typeof row.foreigner === "number" ? compactMoney(stock, row.foreigner) : row.foreigner}</span>
        <span class="${typeof row.institution === "number" && row.institution >= 0 ? "up" : "down"}">${typeof row.institution === "number" ? compactMoney(stock, row.institution) : row.institution}</span>
      </div>
    `).join("")}
  `;
}

function openStockDetail(code) {
  const stock = stockByCode(code);
  if (!stock) return;
  activeDetailCode = code;
  detailChartHoverIndex = null;

  detailElements.title.textContent = stock.koName;
  detailElements.code.textContent = `${stock.code} · ${stock.name}`;
  detailElements.price.textContent = money(stock, stock.price);
  detailElements.change.textContent = signedPercentText(stock.change || 0);
  detailElements.change.className = stock.change >= 0 ? "up" : "down";
  detailElements.market.textContent = stock.market;
  detailElements.sector.textContent = stock.sector;
  detailElements.dividend.textContent = money(stock, stock.annualDividend);
  detailElements.yield.textContent = `${stock.dividendYield.toFixed(2)}%`;
  document.querySelector("#detailMarketCap").textContent = compactMoney(stock, stock.marketCap || 0);
  document.querySelector("#detailTradedValue").textContent = compactMoney(stock, stock.tradedValue || 0);
  detailElements.watchButton.textContent = watchlist.includes(code) ? "관심중" : "관심추가";
  document.querySelectorAll("[data-detail-period]").forEach((button) => {
    button.classList.toggle("active", button.dataset.detailPeriod === detailPeriod);
  });
  drawDetailChart(stock);
  renderInvestorFlow(stock);
  detailElements.modal.classList.add("open");
  detailElements.modal.setAttribute("aria-hidden", "false");
}

function closeStockDetail() {
  detailElements.modal.classList.remove("open");
  detailElements.modal.setAttribute("aria-hidden", "true");
}

function setActiveView(viewName) {
  document.querySelectorAll("[data-view]").forEach((view) => {
    view.classList.toggle("active", view.dataset.view === viewName);
  });
  document.querySelectorAll("[data-view-target]").forEach((button) => {
    button.classList.toggle("active", button.dataset.viewTarget === viewName);
  });
  render();
}

function render() {
  const rows = holdingRows();
  renderSummary(rows);
  renderHoldings(rows);
  renderTable();
  renderSearchResults();
  renderMarketStockCards();
  drawAllocation(rows);
  drawForecast(rows);
}

function populateStocks() {
  elements.stockSelect.innerHTML = stocks.map((stock) => (
    `<option value="${stock.code}">${stock.koName} (${stock.code})</option>`
  )).join("");
}

function updateSelectedPrice() {
  const stock = stockByCode(elements.stockSelect.value);
  if (stock) elements.avgPriceInput.value = String(stock.price);
}

function updateMarketTime() {
  const now = new Date();
  elements.marketTime.textContent = new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(now);
}

function setChangeClass(element, value) {
  if (!element) return;
  element.classList.toggle("up", value >= 0);
  element.classList.toggle("down", value < 0);
}

function updateIndexDisplay(prefix, quote) {
  const valueElement = marketElements[`${prefix}Value`];
  const changeElement = marketElements[`${prefix}Change`];
  if (!quote || typeof quote.price !== "number") return;

  valueElement.textContent = krwFormatter.format(Number(quote.price.toFixed(2)));
  changeElement.textContent = signedPercentText(quote.change || 0);
  setChangeClass(changeElement, quote.change || 0);
}

async function refreshMarketData() {
  const stockSymbols = [...new Set(stocks.map((stock) => yahooSymbolFor(stock)))];
  const symbols = ["^KS11", "^IXIC", "KRW=X", ...stockSymbols];

  try {
    const response = await fetch(`/api/quotes?symbols=${encodeURIComponent(symbols.join(","))}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    const quotes = new Map(payload.quotes.map((quote) => [quote.symbol, quote]));

    const fxQuote = quotes.get("KRW=X");
    if (fxQuote && typeof fxQuote.price === "number") {
      usdKrw = fxQuote.price;
      marketElements.usdKrwValue.textContent = `₩${krwFormatter.format(Math.round(usdKrw))}`;
    }

    updateIndexDisplay("kospi", quotes.get("^KS11"));
    updateIndexDisplay("nasdaq", quotes.get("^IXIC"));

    stocks.forEach((stock) => {
      const quote = quotes.get(yahooSymbolFor(stock));
      if (!quote || typeof quote.price !== "number") return;
      stock.price = quote.price;
      stock.change = quote.change || 0;
      if (quote.currency) stock.currency = quote.currency;
      if (stock.price > 0 && stock.annualDividend > 0) {
        stock.dividendYield = (stock.annualDividend / stock.price) * 100;
      }
    });

    const updatedAt = new Date(payload.updatedAt || Date.now());
    marketElements.status.textContent = `실시간 데이터 갱신 ${new Intl.DateTimeFormat("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    }).format(updatedAt)}`;
    render();
  } catch (error) {
    marketElements.status.textContent = "실시간 데이터 연결 실패 · 샘플값 유지";
  }
}

elements.holdingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const code = elements.stockSelect.value;
  const quantity = Number(elements.quantityInput.value);
  const avgPrice = Number(elements.avgPriceInput.value);
  if (!quantity || !avgPrice) return;

  const existing = holdings.find((holding) => holding.code === code);
  if (existing) {
    const totalQuantity = existing.quantity + quantity;
    existing.avgPrice = ((existing.avgPrice * existing.quantity) + (avgPrice * quantity)) / totalQuantity;
    existing.quantity = totalQuantity;
  } else {
    holdings.push({ code, quantity, avgPrice });
  }
  if (!watchlist.includes(code)) watchlist.unshift(code);
  render();
});

elements.holdingsList.addEventListener("click", (event) => {
  const code = event.target.dataset.remove;
  if (!code) return;
  holdings = holdings.filter((holding) => holding.code !== code);
  render();
});

elements.searchResults.addEventListener("click", (event) => {
  const actionButton = event.target.closest("button");
  if (!actionButton) {
    const row = event.target.closest("[data-open-detail]");
    if (row) openStockDetail(row.dataset.openDetail);
    return;
  }
  const watchCode = actionButton.dataset.watch;
  const holdCode = actionButton.dataset.hold;

  if (watchCode) {
    if (watchlist.includes(watchCode)) {
      watchlist = watchlist.filter((code) => code !== watchCode);
    } else {
      watchlist.unshift(watchCode);
    }
    render();
  }

  if (holdCode) {
    elements.stockSelect.value = holdCode;
    elements.quantityInput.value = "1";
    updateSelectedPrice();
    elements.quantityInput.focus();
  }
});

elements.stockTable.addEventListener("click", (event) => {
  const row = event.target.closest("[data-open-detail]");
  if (row) openStockDetail(row.dataset.openDetail);
});

document.querySelectorAll("[data-days]").forEach((button) => {
  button.addEventListener("click", () => {
    forecastDays = Number(button.dataset.days);
    document.querySelectorAll("[data-days]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    render();
  });
});

elements.resetButton.addEventListener("click", () => {
  holdings = [];
  render();
});

elements.onlyPositiveToggle.addEventListener("change", renderTable);
elements.stockSearchInput.addEventListener("input", renderSearchResults);
elements.clearSearchButton.addEventListener("click", () => {
  elements.stockSearchInput.value = "";
  renderSearchResults();
});
elements.stockSelect.addEventListener("change", updateSelectedPrice);
document.querySelectorAll("[data-view-target]").forEach((button) => {
  button.addEventListener("click", () => setActiveView(button.dataset.viewTarget));
});
document.querySelectorAll("[data-stock-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    stockFilter = button.dataset.stockFilter;
    document.querySelectorAll("[data-stock-filter]").forEach((item) => {
      item.classList.toggle("active", item === button);
    });
    render();
  });
});
document.querySelectorAll("[data-stock-card]").forEach((button) => {
  button.addEventListener("click", () => openStockDetail(button.dataset.stockCard));
});
document.querySelectorAll("[data-detail-period]").forEach((button) => {
  button.addEventListener("click", () => {
    detailPeriod = button.dataset.detailPeriod;
    detailChartHoverIndex = null;
    if (activeDetailCode) openStockDetail(activeDetailCode);
  });
});
document.querySelector("#detailChart").addEventListener("mousemove", updateDetailChartTooltip);
document.querySelector("#detailChart").addEventListener("mouseleave", hideDetailChartTooltip);
document.querySelectorAll("[data-close-stock-modal]").forEach((button) => {
  button.addEventListener("click", closeStockDetail);
});
detailElements.watchButton.addEventListener("click", () => {
  if (activeDetailCode && !watchlist.includes(activeDetailCode)) {
    watchlist.unshift(activeDetailCode);
  }
  render();
  openStockDetail(activeDetailCode);
});
populateStocks();
updateSelectedPrice();
updateMarketTime();
setInterval(updateMarketTime, 1000);
refreshMarketData();
setInterval(refreshMarketData, 10000);
render();
