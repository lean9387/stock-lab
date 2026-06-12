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
  { code: "005380", name: "Hyundai Motor", koName: "현대차", market: "KRX", currency: "KRW", price: 271000, change: 0.8, momentum: 0.12, volatility: 0.2, sector: "자동차", annualDividend: 12000, dividendYield: 4.43, dividendFrequency: "반기", marketCap: 56800000000000, tradedValue: 210000000000 },
  { code: "CSWC", name: "Capital Southwest", koName: "캐피탈 사우스웨스트", market: "NASDAQ", currency: "USD", price: 23.55, change: -0.13, momentum: 0.05, volatility: 0.22, sector: "BDC", annualDividend: 2.32, dividendYield: 9.85, dividendFrequency: "분기", marketCap: 1574147846, tradedValue: 5900000 },
  { code: "HPQ", name: "HP Inc.", koName: "HP", market: "NYSE", currency: "USD", price: 24.83, change: 0.57, momentum: 0.03, volatility: 0.2, sector: "PC·프린터", annualDividend: 1.10, dividendYield: 4.43, dividendFrequency: "분기", marketCap: 22981625000, tradedValue: 96000000 },
  { code: "498400", name: "KODEX 200 Target Weekly Covered Call", koName: "KODEX 200타겟위클리커버드콜", market: "KRX", currency: "KRW", price: 24550, change: 0.84, momentum: 0.16, volatility: 0.2, sector: "월배당 ETF", annualDividend: 3600, dividendYield: 14.66, dividendFrequency: "월", marketCap: 6300000000000, tradedValue: 253790000000 }
];

let holdings = [
  { code: "JOBY", quantity: 1040, avgPrice: 9.55 },
  { code: "SLDP", quantity: 470, avgPrice: 2.94 }
];

let watchlist = ["JOBY", "SLDP", "SCHD", "O", "VZ", "KO", "005930"];
let forecastDays = 1;
let stockFilter = "all";
let stockSort = "watch";
let stockSortDirection = "asc";
let detailPeriod = "1m";
let detailChartHoverIndex = null;
let allocationChartHoverIndex = null;
let allocationChartState = { rows: [], segments: [], total: 0, layout: null };
let activeHoldingEditorCode = null;
let modalScrollY = 0;
const marketQuotes = new Map();
const investorFlowCache = new Map();
const colors = ["#4f8cff", "#27d596", "#ff5d73", "#f2bf4b", "#8b5cf6", "#39d0ff", "#f472b6", "#94a3b8"];

const krwFormatter = new Intl.NumberFormat("ko-KR");
const usdFormatter = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const won = (value) => `${krwFormatter.format(Math.round(value))}원`;
const money = (stock, value) => stock.currency === "USD" ? `$${usdFormatter.format(value)}` : won(value);
const chartPriceLabel = (stock, value) => {
  if (stock.currency === "USD") {
    if (value >= 1000) return `$${Math.round(value).toLocaleString("en-US")}`;
    if (value >= 100) return `$${value.toFixed(1)}`;
    return `$${value.toFixed(2)}`;
  }

  const manwon = value / 10000;
  return `${manwon >= 10 ? manwon.toFixed(1) : manwon.toFixed(2)}만원`;
};
const chartDateLabel = (date) => `${date.getMonth() + 1}.${date.getDate()}`;
const priceInKrw = (stock) => stock.currency === "USD" ? stock.price * usdKrw : stock.price;
const avgInKrw = (stock, avgPrice) => stock.currency === "USD" ? avgPrice * usdKrw : avgPrice;
const annualDividendInKrw = (stock) => stock.currency === "USD" ? stock.annualDividend * usdKrw : stock.annualDividend;
const percent = (value) => `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
const stockByCode = (code) => stocks.find((stock) => stock.code === code);
const isDomestic = (stock) => stock.market === "KRX";
const ratioText = (value) => typeof value === "number" && Number.isFinite(value) ? value.toFixed(value >= 10 ? 1 : 2) : "-";
const multipleText = (value) => typeof value === "number" && Number.isFinite(value) ? `${ratioText(value)}배` : "-";
const metricPercentText = (value) => typeof value === "number" && Number.isFinite(value) ? `${value.toFixed(1)}%` : "-";
const marketCapKrw = (stock) => stock.currency === "USD" ? stock.marketCap * usdKrw : stock.marketCap;
const compactKrw = (value) => {
  if (value >= 1_0000_0000_0000) return `${(value / 1_0000_0000_0000).toFixed(1)}조원`;
  if (value >= 1_0000_0000) return `${(value / 1_0000_0000).toFixed(1)}억원`;
  return won(value);
};
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
  if (stock.market === "KRX" && /^\d{6}$/.test(stock.code)) return `${stock.code}.KS`;
  return stock.code;
};
const signedPercentText = (value) => `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
const stockLogos = {
  JOBY: { text: "J", url: "https://logo.clearbit.com/jobyaviation.com" },
  SLDP: { text: "SP", url: "https://logo.clearbit.com/solidpowerbattery.com" },
  SCHD: { text: "S", url: "https://logo.clearbit.com/schwabassetmanagement.com" },
  O: { text: "O", url: "https://logo.clearbit.com/realtyincome.com" },
  VZ: { text: "VZ", url: "https://logo.clearbit.com/verizon.com" },
  KO: { text: "KO", url: "https://logo.clearbit.com/coca-cola.com" },
  TSLA: { text: "T", url: "https://logo.clearbit.com/tesla.com" },
  NVDA: { text: "NV", url: "https://logo.clearbit.com/nvidia.com" },
  "005930": { text: "삼", url: "https://logo.clearbit.com/samsung.com" },
  "000660": { text: "SK", url: "https://logo.clearbit.com/skhynix.com" },
  "005380": { text: "H", url: "https://logo.clearbit.com/hyundai.com" },
  CSWC: { text: "CS", url: "https://logo.clearbit.com/capitalsouthwest.com" },
  HPQ: { text: "HP", url: "https://logo.clearbit.com/hp.com" },
  "498400": { text: "KX", url: "https://logo.clearbit.com/samsungfund.com" }
};
const stockLogoFor = (stock) => stockLogos[stock.code] || { text: stock.code.slice(0, 2), url: "" };
const valuationMetrics = {
  JOBY: { pbr: 5.8, per: null, roe: -45.2, psr: 252.0 },
  SLDP: { pbr: 1.2, per: null, roe: -33.4, psr: 148.0 },
  SCHD: { pbr: null, per: null, roe: null, psr: null },
  O: { pbr: 1.3, per: 43.8, roe: 3.1, psr: 9.2 },
  VZ: { pbr: 1.7, per: 9.4, roe: 18.0, psr: 1.3 },
  KO: { pbr: 10.5, per: 24.8, roe: 41.5, psr: 6.0 },
  TSLA: { pbr: 13.2, per: 177.0, roe: 8.2, psr: 11.0 },
  NVDA: { pbr: 51.0, per: 41.5, roe: 123.8, psr: 23.5 },
  "005930": { pbr: 4.16, per: 24.17, roe: 17.2, psr: 2.8 },
  "000660": { pbr: 2.1, per: 8.4, roe: 25.0, psr: 3.0 },
  "005380": { pbr: 0.65, per: 5.5, roe: 12.2, psr: 0.36 },
  CSWC: { pbr: 1.1, per: 11.3, roe: 10.2, psr: 9.5 },
  HPQ: { pbr: null, per: 9.1, roe: null, psr: 0.36 },
  "498400": { pbr: null, per: null, roe: null, psr: null }
};
const heartIcon = (active) => `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 20.2c-.3 0-.6-.1-.8-.3C5.5 15.1 2 11.9 2 7.9 2 4.9 4.3 2.7 7.2 2.7c1.7 0 3.4.8 4.4 2.1 1-1.3 2.7-2.1 4.4-2.1 2.9 0 5.2 2.2 5.2 5.2 0 4-3.5 7.2-9.2 12-.2.2-.5.3-.8.3Z"/>
  </svg>
  <span>${active ? "관심중" : "관심"}</span>
`;

function syncModalScrollLock() {
  const hasOpenModal = !!document.querySelector(".stock-modal.open, .index-modal.open, .holding-modal.open");
  if (hasOpenModal && !document.body.classList.contains("modal-open")) {
    modalScrollY = window.scrollY || document.documentElement.scrollTop || 0;
    document.body.classList.add("modal-open");
    document.body.style.top = `-${modalScrollY}px`;
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    return;
  }
  if (!hasOpenModal && document.body.classList.contains("modal-open")) {
    document.body.classList.remove("modal-open");
    document.body.style.top = "";
    document.body.style.position = "";
    document.body.style.width = "";
    window.scrollTo(0, modalScrollY);
  }
}

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
  monthlyDividend: document.querySelector("#monthlyDividend"),
  stockSelect: document.querySelector("#stockSelect"),
  quantityInput: document.querySelector("#quantityInput"),
  avgPriceInput: document.querySelector("#avgPriceInput"),
  holdingForm: document.querySelector("#holdingForm"),
  holdingsList: document.querySelector("#holdingsList"),
  allocationChart: document.querySelector("#allocationChart"),
  largestHolding: document.querySelector("#largestHolding"),
  resetButton: document.querySelector("#resetButton"),
  stockSearchInput: document.querySelector("#stockSearchInput"),
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
const indexModalElements = {
  modal: document.querySelector("#indexModal"),
  kicker: document.querySelector("#indexModalKicker"),
  title: document.querySelector("#indexModalTitle"),
  list: document.querySelector("#indexModalList")
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
  investorPanel: document.querySelector("#investorPanel")
};
const holdingModalElements = {
  modal: document.querySelector("#holdingModal"),
  code: document.querySelector("#holdingModalCode"),
  name: document.querySelector("#holdingModalName"),
  price: document.querySelector("#holdingModalPrice")
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

function recentBusinessDateLabels(count = 5) {
  const dates = [];
  const date = new Date();
  while (dates.length < count) {
    const day = date.getDay();
    if (day !== 0 && day !== 6) {
      const year = String(date.getFullYear()).slice(2);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const dayOfMonth = String(date.getDate()).padStart(2, "0");
      dates.unshift(`${year}.${month}.${dayOfMonth}`);
    }
    date.setDate(date.getDate() - 1);
  }
  return dates;
}

function investorFlow(stock) {
  return recentBusinessDateLabels().map((date) => ({
    date,
    personal: "-",
    foreigner: "-",
    institution: "-"
  }));
}

function holdingRows() {
  return holdings.map((holding) => {
    const stock = stockByCode(holding.code);
    if (!stock) return null;
    const value = priceInKrw(stock) * holding.quantity;
    const avgPriceKrwValue = holding.avgPriceKrw || avgInKrw(stock, holding.avgPrice);
    const cost = avgPriceKrwValue * holding.quantity;
    const profitRate = cost ? ((value - cost) / cost) * 100 : 0;
    const forecast = forecastFor(stock, forecastDays);
    const annualDividend = annualDividendInKrw(stock) * holding.quantity;
    return { ...holding, avgPriceKrwValue, stock, value, cost, profitRate, forecast, annualDividend };
  }).filter(Boolean);
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
  allocationChartState = { rows, segments: [], total, layout: null };
  if (allocationChartHoverIndex !== null && allocationChartHoverIndex >= rows.length) {
    allocationChartHoverIndex = null;
  }
  ctx.clearRect(0, 0, width, height);
  fillChartBackground(ctx, width, height);

  if (!total) return;

  const compact = width < 620;
  const legendWidth = compact ? Math.min(170, width * 0.42) : 286;
  const chartWidth = Math.max(150, width - legendWidth - 24);
  const cx = Math.max(84, Math.min(chartWidth / 2, chartWidth - 76));
  const cy = height / 2 + 2;
  const radius = Math.min(Math.max(Math.min(chartWidth, height) * 0.27, compact ? 50 : 64), compact ? 66 : 82);
  const lineWidth = compact ? 18 : 22;
  const gap = 0.025;
  allocationChartState.layout = { cx, cy, radius, lineWidth };

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
    const hovered = allocationChartHoverIndex === index;
    ctx.beginPath();
    ctx.strokeStyle = colors[index % colors.length];
    ctx.lineWidth = hovered ? lineWidth + 6 : lineWidth;
    ctx.lineCap = "butt";
    ctx.shadowColor = hovered ? colors[index % colors.length] : "rgba(0, 0, 0, 0)";
    ctx.shadowBlur = hovered ? 12 : 0;
    ctx.arc(cx, cy, radius, start + gap, Math.max(start + gap, end));
    ctx.stroke();
    allocationChartState.segments.push({
      index,
      start: start + gap,
      end: Math.max(start + gap, end),
      row
    });
    start += angle;
  });
  ctx.shadowBlur = 0;

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

  ctx.textAlign = "left";
  const legendCount = Math.min(rows.length, compact ? 3 : 5);
  const legendX = compact ? Math.max(cx + radius + 30, width - legendWidth + 8) : Math.max(cx + radius + 68, width - 286);
  const legendTop = compact ? Math.max(58, cy - (legendCount - 1) * 24) : Math.max(64, cy - (legendCount - 1) * 25);
  const rowGap = compact ? 46 : 50;
  rows.slice(0, legendCount).forEach((row, index) => {
    const percentValue = (row.value / total) * 100;
    const y = legendTop + index * rowGap;
    const color = colors[index % colors.length];

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(legendX, y - 17, 4, 34, 2);
    ctx.fill();

    ctx.fillStyle = "#f4f7fb";
    ctx.font = compact ? "800 14px Arial" : "800 18px Arial";
    ctx.fillText(row.stock.code, legendX + 16, y - 4);

    ctx.fillStyle = "#8b98aa";
    ctx.font = compact ? "11px Arial" : "12px Arial";
    ctx.fillText(won(row.value), legendX + 16, y + 15);

    ctx.textAlign = "right";
    ctx.fillStyle = color;
    ctx.font = compact ? "800 17px Arial" : "800 20px Arial";
    ctx.fillText(`${percentValue.toFixed(1)}%`, width - (compact ? 18 : 30), y + 4);
    ctx.textAlign = "left";
  });
  ctx.textAlign = "left";
}

function normalizeAngle(angle) {
  const full = Math.PI * 2;
  return ((angle % full) + full) % full;
}

function isAngleBetween(angle, start, end) {
  const normalized = normalizeAngle(angle);
  const normalizedStart = normalizeAngle(start);
  const normalizedEnd = normalizeAngle(end);
  if (normalizedStart <= normalizedEnd) {
    return normalized >= normalizedStart && normalized <= normalizedEnd;
  }
  return normalized >= normalizedStart || normalized <= normalizedEnd;
}

function updateAllocationTooltip(event) {
  const canvas = elements.allocationChart;
  const tooltip = document.querySelector("#allocationTooltip");
  const { rows, segments, total, layout } = allocationChartState;
  if (!canvas || !tooltip || !layout || !total) return;

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const dx = x - layout.cx;
  const dy = y - layout.cy;
  const distance = Math.hypot(dx, dy);
  const inner = layout.radius - layout.lineWidth / 2 - 10;
  const outer = layout.radius + layout.lineWidth / 2 + 10;

  if (distance < inner || distance > outer) {
    hideAllocationTooltip();
    return;
  }

  const angle = Math.atan2(dy, dx);
  const segment = segments.find((item) => isAngleBetween(angle, item.start, item.end));
  if (!segment) {
    hideAllocationTooltip();
    return;
  }

  if (allocationChartHoverIndex !== segment.index) {
    allocationChartHoverIndex = segment.index;
    drawAllocation(rows);
  }

  const percentValue = (segment.row.value / total) * 100;
  const tooltipX = Math.min(Math.max(x + 14, 8), rect.width - 178);
  const tooltipY = Math.min(Math.max(y - 42, 8), rect.height - 92);
  tooltip.style.left = `${tooltipX}px`;
  tooltip.style.top = `${tooltipY}px`;
  tooltip.hidden = false;
  tooltip.innerHTML = `
    <span>${segment.row.stock.koName} · ${segment.row.stock.code}</span>
    <strong>${percentValue.toFixed(1)}%</strong>
    <span>${won(segment.row.value)} · ${segment.row.quantity.toLocaleString("ko-KR")}주</span>
  `;
}

function hideAllocationTooltip() {
  const tooltip = document.querySelector("#allocationTooltip");
  if (tooltip) tooltip.hidden = true;
  if (allocationChartHoverIndex !== null) {
    allocationChartHoverIndex = null;
    drawAllocation(allocationChartState.rows);
  }
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
  const monthlyIncome = annualIncome / 12;
  const dividendYield = total ? (annualIncome / total) * 100 : 0;
  const largest = rows.length ? [...rows].sort((a, b) => b.value - a.value)[0] : null;

  elements.totalValue.textContent = won(total);
  elements.totalChange.textContent = percent(totalChange);
  elements.totalChange.className = totalChange >= 0 ? "up" : "down";
  elements.forecastReturn.textContent = won(annualIncome);
  elements.forecastLabel.textContent = annualIncome > 0 ? "연간 세전 기준" : "보유 종목 배당 없음";
  elements.forecastLabel.className = annualIncome > 0 ? "up" : "neutral";
  elements.riskScore.textContent = `${dividendYield.toFixed(2)}%`;
  elements.riskLabel.textContent = "세전 배당률";
  elements.monthlyDividend.textContent = won(monthlyIncome);
  elements.largestHolding.textContent = largest ? `${largest.stock.code} ${((largest.value / total) * 100).toFixed(1)}%` : "-";
}

function renderHoldings(rows) {
  const rowMap = new Map(rows.map((row) => [row.code, row]));
  const watchRows = watchlistRows();
  elements.holdingsList.innerHTML = watchRows.length ? watchRows.map((stock) => {
    const row = rowMap.get(stock.code);
    const isOpen = activeHoldingEditorCode === stock.code;
    const defaultAvgPrice = Math.round(row?.avgPriceKrwValue || priceInKrw(stock));
    const defaultQuantity = row?.quantity || "";
    return `
      <div class="holding-item watch-holding ${isOpen ? "open" : ""}">
        <button class="holding-toggle" type="button" data-toggle-holding="${stock.code}" aria-expanded="${isOpen}">
          <span class="holding-logo" aria-hidden="true">
            ${stockLogoFor(stock).url ? `<img src="${stockLogoFor(stock).url}" alt="" loading="lazy" onload="this.parentElement.classList.add('has-logo')" onerror="this.remove()" />` : ""}
            <span>${stockLogoFor(stock).text}</span>
          </span>
          <span class="holding-copy">
            <strong>${stock.koName} <small>${stock.code}</small></strong>
            <span>${stock.market} · ${money(stock, stock.price)} · 배당률 ${stock.dividendYield.toFixed(2)}%</span>
            <small class="holding-sub">${row ? `${row.quantity.toLocaleString("ko-KR")}주 · 평가 ${won(row.value)} · 연 배당 ${won(row.annualDividend)}` : "보유수량과 평균 매입가를 입력해 내 주식에 반영"}</small>
          </span>
          <span class="holding-chevron" aria-hidden="true">⌄</span>
        </button>
        <form class="inline-holding-form" data-holding-editor="${stock.code}">
          <label>
            보유수량
            <input type="number" min="0" step="1" inputmode="numeric" name="quantity" value="${defaultQuantity}" placeholder="0" />
          </label>
          <label>
            평균 매입가(원)
            <input type="number" min="0" step="1" inputmode="numeric" name="avgPriceKrw" value="${defaultAvgPrice}" placeholder="${Math.round(priceInKrw(stock))}" />
          </label>
          <button type="submit">저장</button>
        </form>
      </div>
    `;
  }).join("") : `
    <div class="empty-search">
      <strong>관심 종목이 없습니다</strong>
      <span>주식 화면에서 하트를 눌러 관심 종목을 추가해보세요.</span>
    </div>
  `;
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

function sortedSearchStocks(rows) {
  const list = [...rows];
  const direction = stockSortDirection === "asc" ? 1 : -1;
  if (stockSort === "watch") {
    return list
      .filter((stock) => watchlist.includes(stock.code))
      .sort((a, b) => watchlist.indexOf(a.code) - watchlist.indexOf(b.code));
  }
  if (stockSort === "traded") {
    return list.sort((a, b) => ((a.tradedValue || 0) - (b.tradedValue || 0)) * direction);
  }
  if (stockSort === "marketCap") {
    return list.sort((a, b) => ((a.marketCap || 0) - (b.marketCap || 0)) * direction);
  }
  if (stockSort === "change") {
    return list.sort((a, b) => ((a.change || 0) - (b.change || 0)) * direction);
  }
  return list;
}

function updateSortButtons() {
  const directionalSorts = new Set(["traded", "marketCap", "change"]);
  document.querySelectorAll("[data-stock-sort]").forEach((button) => {
    const isActive = button.dataset.stockSort === stockSort;
    button.classList.toggle("active", isActive);
    button.dataset.direction = isActive && directionalSorts.has(stockSort) ? stockSortDirection : "";
    let arrow = button.querySelector(".sort-arrow");
    if (!arrow && directionalSorts.has(button.dataset.stockSort)) {
      arrow = document.createElement("span");
      arrow.className = "sort-arrow";
      button.appendChild(arrow);
    }
    if (arrow) {
      arrow.textContent = isActive && directionalSorts.has(stockSort) ? (stockSortDirection === "asc" ? "↑" : "↓") : "";
    }
  });
}

function renderSearchResults() {
  const query = elements.stockSearchInput.value.trim().toLowerCase();
  const rows = sortedSearchStocks(filteredStocks(stocks).filter((stock) => {
    const haystack = `${stock.code} ${stock.name} ${stock.koName} ${stock.sector} ${stock.market}`.toLowerCase();
    return !query || haystack.includes(query);
  }));

  elements.searchResults.innerHTML = rows.length ? rows.map((stock) => `
    <div class="search-result" data-open-detail="${stock.code}">
      <button class="heart-button ${watchlist.includes(stock.code) ? "active" : ""}" type="button" data-watch="${stock.code}" aria-label="${stock.koName} 관심">${heartIcon(watchlist.includes(stock.code))}</button>
      <div class="search-logo" aria-hidden="true">
        ${stockLogoFor(stock).url ? `<img src="${stockLogoFor(stock).url}" alt="" loading="lazy" onload="this.parentElement.classList.add('has-logo')" onerror="this.remove()" />` : ""}
        <span>${stockLogoFor(stock).text}</span>
      </div>
      <div class="stock-name">
        <strong>${stock.koName}</strong>
        <span>${stock.code} · ${stock.name} · ${stock.market}</span>
      </div>
      <div class="search-price">
        <strong>${money(stock, stock.price)}</strong>
        <span class="${stock.dividendYield > 0 ? "up" : "neutral"}">배당 ${stock.dividendYield.toFixed(2)}%</span>
      </div>
    </div>
  `).join("") : `
    <div class="empty-search">
      <strong>표시할 종목이 없습니다</strong>
      <span>관심 종목을 추가하거나 다른 보기 기준을 선택해보세요.</span>
    </div>
  `;
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
  const left = stock.currency === "USD" ? 60 : 74;
  const right = width - 26;
  const top = 24;
  const bottom = height - 48;
  const xForIndex = (index) => left + ((right - left) / Math.max(points.length - 1, 1)) * index;
  const yForClose = (close) => bottom - ((close - min) / (max - min)) * (bottom - top);

  ctx.strokeStyle = "rgba(148, 163, 184, 0.2)";
  ctx.lineWidth = 1;
  ctx.fillStyle = "#8b98aa";
  ctx.font = "12px Arial";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  const tickCount = 5;
  for (let i = 0; i < tickCount; i += 1) {
    const ratio = i / (tickCount - 1);
    const y = top + (bottom - top) * ratio;
    const value = max - (max - min) * ratio;
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
    ctx.stroke();
    ctx.fillText(chartPriceLabel(stock, value), 8, y);
  }
  ctx.textBaseline = "alphabetic";

  const xTickCount = detailPeriod === "1m" ? 5 : 6;
  const xTickIndexes = Array.from({ length: xTickCount }, (_, index) => (
    Math.round((index / Math.max(xTickCount - 1, 1)) * (points.length - 1))
  ));
  ctx.fillStyle = "#7f8da3";
  ctx.font = "11px Arial";
  ctx.textBaseline = "top";
  xTickIndexes.forEach((pointIndex, index) => {
    const x = xForIndex(pointIndex);
    ctx.strokeStyle = "rgba(148, 163, 184, 0.1)";
    ctx.beginPath();
    ctx.moveTo(x, top);
    ctx.lineTo(x, bottom);
    ctx.stroke();

    ctx.textAlign = index === 0 ? "left" : index === xTickIndexes.length - 1 ? "right" : "center";
    ctx.fillText(chartDateLabel(points[pointIndex].date), x, bottom + 14);
  });
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

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

}

function updateDetailChartTooltip(event) {
  if (!activeDetailCode) return;
  const stock = stockByCode(activeDetailCode);
  const canvas = document.querySelector("#detailChart");
  const tooltip = document.querySelector("#detailChartTooltip");
  if (!stock || !canvas || !tooltip) return;

  const points = generatePriceSeries(stock, detailPeriod);
  const rect = canvas.getBoundingClientRect();
  const left = stock.currency === "USD" ? 60 : 74;
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
    <strong>${chartPriceLabel(stock, point.close)}</strong>
    <span>종가</span>
  `;
}

function hideDetailChartTooltip() {
  const tooltip = document.querySelector("#detailChartTooltip");
  if (tooltip) tooltip.hidden = true;
  detailChartHoverIndex = null;
  if (activeDetailCode) drawDetailChart(stockByCode(activeDetailCode));
}

function investorValueClass(value) {
  if (typeof value !== "number") return "";
  return value >= 0 ? "up" : "down";
}

function investorValueText(stock, value) {
  if (typeof value !== "number") return value || "-";
  const text = compactMoney(stock, value);
  if (window.matchMedia("(max-width: 760px)").matches && isDomestic(stock)) {
    return text.replace(/조원|억원|만원|원/g, "").trim();
  }
  return text;
}

function renderInvestorFlow(stock, rows = investorFlow(stock), note = "") {
  const table = document.querySelector("#investorFlowTable");
  if (!table) return;
  table.innerHTML = `
    <div class="investor-row investor-head">
      <span>일자</span>
      <span>개인</span>
      <span>외국인</span>
      <span>기관</span>
    </div>
    ${rows.map((row) => `
      <div class="investor-row">
        <span>${row.date}</span>
        <span class="${investorValueClass(row.personal)}">${investorValueText(stock, row.personal)}</span>
        <span class="${investorValueClass(row.foreigner)}">${investorValueText(stock, row.foreigner)}</span>
        <span class="${investorValueClass(row.institution)}">${investorValueText(stock, row.institution)}</span>
      </div>
    `).join("")}
    ${note ? `<p class="investor-note">${note}</p>` : ""}
  `;
}

async function loadInvestorFlow(stock) {
  if (!isDomestic(stock)) {
    if (detailElements.investorPanel) detailElements.investorPanel.hidden = true;
    return;
  }

  if (detailElements.investorPanel) detailElements.investorPanel.hidden = false;

  if (investorFlowCache.has(stock.code)) {
    const cached = investorFlowCache.get(stock.code);
    renderInvestorFlow(stock, cached.rows, cached.error ? `KRX 연동 실패: ${cached.error}` : "출처: KRX 투자자별 거래실적");
    return;
  }

  renderInvestorFlow(stock, investorFlow(stock).map((row) => ({
    ...row,
    personal: "연동 중",
    foreigner: "연동 중",
    institution: "연동 중"
  })), "KRX 투자자별 거래실적을 불러오는 중입니다.");

  try {
    const response = await fetch(`/api/investor-flow?code=${encodeURIComponent(stock.code)}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    const rows = Array.isArray(payload.rows) && payload.rows.length ? payload.rows : investorFlow(stock);
    investorFlowCache.set(stock.code, { rows, error: payload.error || "" });
    if (activeDetailCode === stock.code) {
      renderInvestorFlow(stock, rows, payload.error ? `KRX 연동 실패: ${payload.error}` : "출처: KRX 투자자별 거래실적");
    }
  } catch (error) {
    const rows = investorFlow(stock);
    investorFlowCache.set(stock.code, { rows, error: error.message });
    if (activeDetailCode === stock.code) {
      renderInvestorFlow(stock, rows, `KRX 연동 실패: ${error.message}`);
    }
  }
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
  const metrics = valuationMetrics[stock.code] || {};
  detailElements.market.textContent = compactKrw(marketCapKrw(stock) || 0);
  detailElements.sector.textContent = `${stock.dividendYield.toFixed(2)}%`;
  detailElements.dividend.textContent = multipleText(metrics.pbr);
  detailElements.yield.textContent = multipleText(metrics.per);
  document.querySelector("#detailMarketCap").textContent = metricPercentText(metrics.roe);
  document.querySelector("#detailTradedValue").textContent = multipleText(metrics.psr);
  document.querySelectorAll("[data-detail-period]").forEach((button) => {
    button.classList.toggle("active", button.dataset.detailPeriod === detailPeriod);
  });
  drawDetailChart(stock);
  if (isDomestic(stock)) {
    if (detailElements.investorPanel) detailElements.investorPanel.hidden = false;
    renderInvestorFlow(stock);
    loadInvestorFlow(stock);
  } else if (detailElements.investorPanel) {
    detailElements.investorPanel.hidden = true;
  }
  detailElements.modal.classList.add("open");
  detailElements.modal.setAttribute("aria-hidden", "false");
  syncModalScrollLock();
}

function closeStockDetail() {
  detailElements.modal.classList.remove("open");
  detailElements.modal.setAttribute("aria-hidden", "true");
  syncModalScrollLock();
}

function quoteFor(symbol, fallbackPrice, fallbackChange = 0) {
  const quote = marketQuotes.get(symbol);
  return {
    price: typeof quote?.price === "number" ? quote.price : fallbackPrice,
    change: typeof quote?.change === "number" ? quote.change : fallbackChange
  };
}

function indexModalRows(group) {
  if (group === "korea") {
    return {
      kicker: "Korea Market",
      title: "국내 시장",
      rows: [
        { label: "KOSPI", source: "KRX", ...quoteFor("^KS11", 3160.59, -0.54) },
        { label: "KOSDAQ", source: "KRX", ...quoteFor("^KQ11", 842.18, -0.28) },
        { label: "USD/KRW", source: "FX", price: usdKrw, change: 0, prefix: "₩", noPercent: true }
      ]
    };
  }
  return {
    kicker: "US Market",
    title: "미국 시장",
    rows: [
      { label: "NASDAQ", source: "Yahoo Finance", ...quoteFor("^IXIC", 19447.41, -0.83) },
      { label: "S&P 500", source: "Yahoo Finance", ...quoteFor("^GSPC", 6043.82, -0.31) },
      { label: "다우존스", source: "Yahoo Finance", ...quoteFor("^DJI", 42865.77, -0.22) }
    ]
  };
}

function formatIndexPrice(item) {
  if (item.prefix) return `${item.prefix}${krwFormatter.format(Math.round(item.price))}`;
  return krwFormatter.format(Number(item.price.toFixed(2)));
}

function openIndexModal(group) {
  const data = indexModalRows(group);
  indexModalElements.kicker.textContent = data.kicker;
  indexModalElements.title.textContent = data.title;
  indexModalElements.list.innerHTML = data.rows.map((item) => {
    const change = item.change || 0;
    return `
      <div class="index-modal-item">
        <div>
          <strong>${item.label}</strong>
          <span>${item.source}</span>
        </div>
        <div class="index-modal-price">
          <strong>${formatIndexPrice(item)}</strong>
          <em class="${change >= 0 ? "up" : "down"}">${item.noPercent ? "실시간 환율" : signedPercentText(change)}</em>
        </div>
      </div>
    `;
  }).join("");
  indexModalElements.modal.classList.add("open");
  indexModalElements.modal.setAttribute("aria-hidden", "false");
  syncModalScrollLock();
}

function closeIndexModal() {
  indexModalElements.modal.classList.remove("open");
  indexModalElements.modal.setAttribute("aria-hidden", "true");
  syncModalScrollLock();
}

function openHoldingModal(code) {
  const stock = stockByCode(code);
  if (!stock) return;
  elements.stockSelect.value = code;
  elements.quantityInput.value = "1";
  elements.avgPriceInput.value = String(stock.price);
  holdingModalElements.code.textContent = `${stock.code} · ${stock.market}`;
  holdingModalElements.name.textContent = stock.koName;
  holdingModalElements.price.textContent = `현재가 ${money(stock, stock.price)}`;
  holdingModalElements.modal.classList.add("open");
  holdingModalElements.modal.setAttribute("aria-hidden", "false");
  syncModalScrollLock();
  setTimeout(() => elements.quantityInput.focus(), 0);
}

function closeHoldingModal() {
  holdingModalElements.modal.classList.remove("open");
  holdingModalElements.modal.setAttribute("aria-hidden", "true");
  syncModalScrollLock();
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
  renderSearchResults();
  renderMarketStockCards();
  drawAllocation(rows);
}

function populateStocks() {
  elements.stockSelect.value = holdings[0]?.code || stocks[0]?.code || "";
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
  const symbols = ["^KS11", "^KQ11", "^IXIC", "^GSPC", "^DJI", "KRW=X", ...stockSymbols];

  try {
    const response = await fetch(`/api/quotes?symbols=${encodeURIComponent(symbols.join(","))}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    const quotes = new Map(payload.quotes.map((quote) => [quote.symbol, quote]));
    marketQuotes.clear();
    quotes.forEach((quote, symbol) => marketQuotes.set(symbol, quote));

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
  closeHoldingModal();
  setActiveView("my-stocks");
  render();
});

elements.holdingsList.addEventListener("click", (event) => {
  const toggle = event.target.closest("[data-toggle-holding]");
  if (!toggle) return;
  activeHoldingEditorCode = activeHoldingEditorCode === toggle.dataset.toggleHolding ? null : toggle.dataset.toggleHolding;
  render();
});

elements.holdingsList.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-holding-editor]");
  if (!form) return;
  event.preventDefault();
  const code = form.dataset.holdingEditor;
  const quantity = Number(form.elements.quantity.value);
  const avgPriceKrw = Number(form.elements.avgPriceKrw.value);
  if (!code || !quantity || !avgPriceKrw) return;

  const existing = holdings.find((holding) => holding.code === code);
  if (existing) {
    existing.quantity = quantity;
    existing.avgPriceKrw = avgPriceKrw;
  } else {
    holdings.push({ code, quantity, avgPriceKrw });
  }
  activeHoldingEditorCode = code;
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
      holdings = holdings.filter((holding) => holding.code !== watchCode);
      if (activeHoldingEditorCode === watchCode) activeHoldingEditorCode = null;
    } else {
      watchlist.unshift(watchCode);
    }
    render();
  }

  if (holdCode) {
    openHoldingModal(holdCode);
  }
});

document.querySelectorAll("[data-days]").forEach((button) => {
  button.addEventListener("click", () => {
    forecastDays = Number(button.dataset.days);
    document.querySelectorAll("[data-days]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    render();
  });
});

elements.resetButton?.addEventListener("click", () => {
  holdings = [];
  render();
});

elements.stockSearchInput.addEventListener("input", renderSearchResults);
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
document.querySelectorAll("[data-stock-sort]").forEach((button) => {
  button.addEventListener("click", () => {
    const nextSort = button.dataset.stockSort;
    if (stockSort === nextSort && ["traded", "marketCap", "change"].includes(nextSort)) {
      stockSortDirection = stockSortDirection === "asc" ? "desc" : "asc";
    } else {
      stockSort = nextSort;
      stockSortDirection = "asc";
    }
    updateSortButtons();
    renderSearchResults();
  });
});
document.querySelectorAll("[data-stock-card]").forEach((button) => {
  button.addEventListener("click", () => openStockDetail(button.dataset.stockCard));
});
document.querySelectorAll("[data-index-group]").forEach((button) => {
  button.addEventListener("click", () => openIndexModal(button.dataset.indexGroup));
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
elements.allocationChart.addEventListener("mousemove", updateAllocationTooltip);
elements.allocationChart.addEventListener("mouseleave", hideAllocationTooltip);
window.addEventListener("resize", () => {
  allocationChartHoverIndex = null;
  hideAllocationTooltip();
  drawAllocation(holdingRows());
});
document.querySelectorAll("[data-close-stock-modal]").forEach((button) => {
  button.addEventListener("click", closeStockDetail);
});
document.querySelectorAll("[data-close-index-modal]").forEach((button) => {
  button.addEventListener("click", closeIndexModal);
});
document.querySelectorAll("[data-close-holding-modal]").forEach((button) => {
  button.addEventListener("click", closeHoldingModal);
});
populateStocks();
updateSelectedPrice();
updateSortButtons();
updateMarketTime();
setInterval(updateMarketTime, 1000);
refreshMarketData();
setInterval(refreshMarketData, 10000);
render();
