/* ═══════════════════════════════════════
   CricTech — app.js
   Navigation · Search · Voice · Filters · Render
═══════════════════════════════════════ */

/* ──────────────────────────────────────
   NAVIGATION
────────────────────────────────────── */
let navStack    = ["home"];
let currentData = [...bats];

function showPage(name) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const backBtn = document.getElementById("backBtn");
  if (name === "home") {
    document.getElementById("page-home").classList.add("active");
    document.getElementById("page-trending").classList.add("active");
    backBtn.style.display = "none";
  } else {
    document.getElementById("page-" + name).classList.add("active");
    backBtn.style.display = "flex";
    if (navStack[navStack.length - 1] !== name) navStack.push(name);
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goBack() {
  if (navStack.length > 1) {
    navStack.pop();
    const prev = navStack[navStack.length - 1];
    prev === "home" ? goHome() : showPage(prev);
  } else {
    goHome();
  }
}

function goHome() {
  navStack = ["home"];
  showPage("home");
}

function gotoResults() {
  currentData = [...bats];
  renderResults(currentData);
  renderTable(currentData);
  showPage("results");
}

/* ──────────────────────────────────────
   UTILITIES
────────────────────────────────────── */
function getLowest(prices) {
  return Object.entries(prices).reduce((a, b) => b[1].price < a[1].price ? b : a);
}
function fmt(p) { return "₹" + p.toLocaleString("en-IN"); }
function showToast(msg, dur = 2500) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), dur);
}
// img tag with guaranteed SVG fallback
function safeImg(src, cls, alt) {
  return `<img src="${src}" ${cls ? `class="${cls}"` : ""} alt="${alt}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK}'">`;
}

/* ──────────────────────────────────────
   SEARCH + AUTOCOMPLETE
────────────────────────────────────── */
const searchEl  = document.getElementById("mainSearch");
const suggestEl = document.getElementById("suggestions");

searchEl.addEventListener("input", function () {
  const q = this.value.toLowerCase().trim();
  if (!q) { suggestEl.classList.remove("active"); return; }
  const hits = bats.filter(b =>
    b.name.toLowerCase().includes(q) || b.brand.toLowerCase().includes(q)
  ).slice(0, 6);
  if (!hits.length) { suggestEl.classList.remove("active"); return; }
  suggestEl.innerHTML = hits.map(b => `
    <div class="s-item" onclick="pickSug('${b.name.replace(/'/g, "\\'")}')">
      <img src="${b.img}" alt="${b.brand}" loading="lazy"
        onerror="this.onerror=null;this.src='${FALLBACK}'"
        style="width:34px;height:34px;object-fit:contain;flex-shrink:0;border-radius:4px;background:var(--card2)">
      <div>
        <div style="font-size:13px;font-weight:600">${b.name}</div>
        <div style="font-size:11px;color:var(--muted)">${b.brand} · ${b.type}</div>
      </div>
    </div>`).join("");
  suggestEl.classList.add("active");
});

searchEl.addEventListener("keydown", e => { if (e.key === "Enter") doSearch(); });
document.addEventListener("click", e => {
  if (!e.target.closest(".search-wrap")) suggestEl.classList.remove("active");
});

function pickSug(name) {
  searchEl.value = name;
  suggestEl.classList.remove("active");
  doSearch();
}

function doSearch() {
  const q = searchEl.value.toLowerCase().trim();
  suggestEl.classList.remove("active");
  currentData = q
    ? bats.filter(b => b.name.toLowerCase().includes(q) || b.brand.toLowerCase().includes(q))
    : [...bats];
  renderResults(currentData);
  renderTable(currentData);
  showPage("results");
  showToast(currentData.length
    ? `Found ${currentData.length} bat${currentData.length > 1 ? "s" : ""} 🏏`
    : "No bats found. Try another search."
  );
}

/* ──────────────────────────────────────
   VOICE SEARCH (Web Speech API)
────────────────────────────────────── */
let recognition = null;
let isListening = false;

function initVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return false;

  recognition = new SpeechRecognition();
  recognition.lang = "en-IN";          // Indian English
  recognition.interimResults = true;   // show words as they come
  recognition.maxAlternatives = 3;
  recognition.continuous = false;

  recognition.onstart = () => {
    isListening = true;
    updateVoiceBtn(true);
    showToast("🎙️ Bol do… sun raha hoon", 8000);
  };

  recognition.onresult = (e) => {
    // Pick the best interim/final transcript
    let transcript = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
      transcript = e.results[i][0].transcript;
    }
    // NLP normalisation: strip filler words, lower-case
    transcript = normalizeVoiceQuery(transcript);
    searchEl.value = transcript;
    suggestEl.classList.remove("active");
    // Auto-show suggestions live
    searchEl.dispatchEvent(new Event("input"));
  };

  recognition.onfinalresult = () => { /* handled in onresult */ };

  recognition.onend = () => {
    isListening = false;
    updateVoiceBtn(false);
    // If something was typed, search it
    if (searchEl.value.trim()) doSearch();
  };

  recognition.onerror = (e) => {
    isListening = false;
    updateVoiceBtn(false);
    const msg = {
      "not-allowed": "Microphone permission denied",
      "no-speech":   "Kuch suna nahi — phir try karo",
      "network":     "Network error",
    }[e.error] || `Voice error: ${e.error}`;
    showToast("⚠️ " + msg);
  };

  return true;
}

/**
 * Basic NLP normalisation for cricket bat voice queries.
 * Strips filler phrases and maps spoken brand nicknames to official names.
 */
function normalizeVoiceQuery(raw) {
  let q = raw.toLowerCase().trim();

  // Strip common filler
  const fillers = [
    "search for", "search", "find me", "find", "show me", "show",
    "i want", "i need", "give me", "look for", "look up",
    "cricket bat", "bat", "price of", "price", "compare"
  ];
  fillers.forEach(f => { q = q.replace(new RegExp("\\b" + f + "\\b", "g"), ""); });

  // Common spoken aliases → canonical brand names
  const aliases = {
    "em ar ef": "MRF", "emrf": "MRF",
    "es es": "SS",
    "es ji": "SG",
    "kuka bura": "Kookaburra", "kookaburra": "Kookaburra",
    "gray nickels": "Gray-Nicolls", "gray nicols": "Gray-Nicolls",
    "adidaas": "Adidas",
  };
  Object.entries(aliases).forEach(([spoken, brand]) => {
    q = q.replace(new RegExp(spoken, "gi"), brand);
  });

  return q.replace(/\s+/g, " ").trim();
}

function updateVoiceBtn(active) {
  const btn = document.getElementById("voiceBtn");
  if (!btn) return;
  btn.classList.toggle("listening", active);
  btn.title = active ? "Listening… (click to stop)" : "Voice search";
  btn.innerHTML = active
    ? `<span class="mic-ring"></span>🎙️`
    : `🎙️`;
}

function toggleVoice() {
  if (!recognition) {
    if (!initVoice()) {
      showToast("⚠️ Voice search is not supported in this browser");
      return;
    }
  }
  if (isListening) {
    recognition.stop();
  } else {
    searchEl.value = "";
    recognition.start();
  }
}

/* ──────────────────────────────────────
   FILTERS
────────────────────────────────────── */
function updatePrice(v) {
  document.getElementById("priceDisplay").textContent = "₹" + parseInt(v).toLocaleString("en-IN");
}

function applyFilters() {
  const brand = document.getElementById("filterBrand").value;
  const type  = document.getElementById("filterType").value;
  const maxP  = parseInt(document.getElementById("priceRange").value);
  const f = bats.filter(b => {
    const minP = Math.min(...Object.values(b.prices).map(p => p.price));
    return (!brand || b.brand === brand) && (!type || b.type === type) && minP <= maxP;
  });
  renderResults(f);
  renderTable(f);
}

/* ──────────────────────────────────────
   RENDER: TRENDING CARDS
────────────────────────────────────── */
function renderTrending() {
  document.getElementById("trendingGrid").innerHTML = bats.slice(0, 8).map(bat => {
    const [, lv] = getLowest(bat.prices);
    return `
    <div class="bat-card" onclick="openBat(${bat.id})">
      <div class="bat-img-wrap">
        ${safeImg(bat.img, "", bat.name)}
        <span class="bat-type-badge ${bat.type === "English Willow" ? "badge-ew" : "badge-kw"}">
          ${bat.type === "English Willow" ? "EW" : "KW"}
        </span>
        ${lv.price < 3000 ? '<span class="best-val-tag">Best Value</span>' : ""}
      </div>
      <div class="bat-info">
        <div class="bat-brand">${bat.brand}</div>
        <div class="bat-name">${bat.name}</div>
        <div class="price-compare-mini">
          ${Object.entries(bat.prices).map(([plat, pobj]) => `
            <div class="price-row">
              <div class="plat-dot-row">
                <span class="dot" style="background:${getDotColor(plat)}"></span>${plat}
              </div>
              <span class="price-tag ${pobj.price === lv.price ? "cheapest" : "regular"}">
                ${fmt(pobj.price)}${pobj.price === lv.price ? " ✓" : ""}
              </span>
            </div>`).join("")}
        </div>
      </div>
    </div>`;
  }).join("");
}

/* ──────────────────────────────────────
   RENDER: RESULTS GRID
   FIX: Each platform row is its OWN clickable link
────────────────────────────────────── */
function renderResults(data) {
  const grid = document.getElementById("resultsGrid");
  if (!data.length) {
    grid.innerHTML = `<div class="empty-state"><div class="ei">🏏</div><p>No bats found.<br>Try different filters or search.</p></div>`;
    return;
  }
  grid.innerHTML = data.map(bat => {
    const [, lv] = getLowest(bat.prices);
    return `
    <div class="result-card">
      <div class="result-top">
        ${safeImg(bat.img, "result-bat-img", bat.name)}
        <div class="result-meta">
          <div class="result-brand">${bat.brand}</div>
          <div class="result-name">${bat.name}</div>
          <div class="result-badge-wrap">
            <span class="badge ${bat.type === "English Willow" ? "badge-ew" : "badge-kw"}">${bat.type}</span>
          </div>
        </div>
      </div>
      <div class="platforms-list">
        ${Object.entries(bat.prices).map(([plat, pobj]) => `
          <a class="plat-item ${pobj.price === lv.price ? "lowest" : ""}"
             href="${pobj.url}" target="_blank" rel="noopener noreferrer"
             title="Buy on ${plat}">
            <div class="plat-left">
              <div class="plat-logo ${plat === "Amazon" ? "logo-amazon" : plat === "Flipkart" ? "logo-flipkart" : "logo-brand"}">
                ${plat.substring(0, 2)}
              </div>
              <span class="plat-name">${plat}</span>
            </div>
            <div class="plat-right">
              ${pobj.price === lv.price ? '<span class="low-badge">Lowest</span>' : ""}
              <span class="plat-price ${pobj.price === lv.price ? "is-low" : "not-low"}">${fmt(pobj.price)}</span>
              <span class="buy-arrow">→</span>
            </div>
          </a>`).join("")}
      </div>
    </div>`;
  }).join("");
}

/* ──────────────────────────────────────
   RENDER: COMPARISON TABLE
   Columns: Amazon | Flipkart | Brand Site
────────────────────────────────────── */
function renderTable(data) {
  const tbody = document.getElementById("compBody");
  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:40px;color:var(--muted)">No results to compare</td></tr>`;
    return;
  }
  tbody.innerHTML = data.map(bat => {
    const entries   = Object.entries(bat.prices);
    const amazon    = entries.find(([k]) => k === "Amazon");
    const flipkart  = entries.find(([k]) => k === "Flipkart");
    const brandSite = entries.find(([k]) => k !== "Amazon" && k !== "Flipkart");
    const allPrices = [amazon, flipkart, brandSite].filter(Boolean).map(([, v]) => v.price);
    const lowestP   = Math.min(...allPrices);

    function cell(entry) {
      if (!entry) return `<td><span class="t-price na">N/A</span></td>`;
      const [plat, pobj] = entry;
      const isLow = pobj.price === lowestP;
      return `
        <td>
          <a href="${pobj.url}" target="_blank" rel="noopener noreferrer" class="t-price-link ${isLow ? "low" : ""}">
            ${fmt(pobj.price)}${isLow ? " 🏆" : ""}
          </a>
        </td>`;
    }

    return `
    <tr>
      <td>
        <div class="table-bat-wrap">
          ${safeImg(bat.img, "table-bat-img", bat.name)}
          <div>
            <div class="t-name">${bat.name}</div>
            <div class="t-brand">${bat.brand}</div>
          </div>
        </div>
      </td>
      <td>
        <span class="badge ${bat.type === "English Willow" ? "badge-ew" : "badge-kw"}">
          ${bat.type === "English Willow" ? "EW" : "KW"}
        </span>
      </td>
      ${cell(amazon)}
      ${cell(flipkart)}
      ${cell(brandSite)}
      <td>${brandSite ? `<a class="t-buy" href="${brandSite[1].url}" target="_blank" rel="noopener noreferrer">${brandSite[0]} →</a>` : ""}</td>
    </tr>`;
  }).join("");
}

/* ──────────────────────────────────────
   OPEN SINGLE BAT
────────────────────────────────────── */
function openBat(id) {
  const bat = bats.find(b => b.id === id);
  if (!bat) return;
  currentData = [bat];
  renderResults([bat]);
  renderTable([bat]);
  showPage("results");
}

/* ──────────────────────────────────────
   INIT
────────────────────────────────────── */
renderTrending();
renderResults(bats);
renderTable(bats);
