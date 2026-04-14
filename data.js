/* ═══════════════════════════════════════
   CricTech — data.js  (30 bats)
═══════════════════════════════════════ */

// Inline SVG fallback — always renders, no network needed
const FALLBACK = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 260"><rect width="120" height="260" rx="12" fill="#141f16"/><rect x="51" y="16" width="18" height="158" rx="5" fill="#c4a46b"/><rect x="49" y="14" width="22" height="10" rx="3" fill="#9a7840"/><rect x="47" y="168" width="26" height="66" rx="7" fill="#8B6914"/><rect x="49" y="164" width="22" height="12" rx="3" fill="#555"/><rect x="55" y="28" width="12" height="130" rx="2" fill="#d4b47b" opacity="0.35"/></svg>`)}`;

// Brand-coloured SVG bat images (unique per brand, no external fetch)
function makeBatSvg(handleColor, bladeColor, grainColor) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 260"><rect width="120" height="260" rx="12" fill="#141f16"/><rect x="51" y="16" width="18" height="158" rx="5" fill="${bladeColor}"/><rect x="49" y="14" width="22" height="10" rx="3" fill="${handleColor}"/><rect x="47" y="168" width="26" height="66" rx="7" fill="${handleColor}"/><rect x="49" y="164" width="22" height="12" rx="3" fill="#555"/><rect x="55" y="28" width="12" height="130" rx="2" fill="${grainColor}" opacity="0.3"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const BRAND_IMG = {
  MRF:           makeBatSvg("#cc0000", "#d4b47b", "#fffbe6"),
  SS:            makeBatSvg("#1565c0", "#c9ab82", "#fff8e1"),
  SG:            makeBatSvg("#2e7d32", "#d6bc90", "#f1f8e9"),
  Kookaburra:    makeBatSvg("#6d4c41", "#caa870", "#efebe9"),
  GM:            makeBatSvg("#6a1b9a", "#d2b080", "#f3e5f5"),
  BAS:           makeBatSvg("#bf360c", "#c8a468", "#fbe9e7"),
  Puma:          makeBatSvg("#212121", "#cdb07a", "#fafafa"),
  Adidas:        makeBatSvg("#0d47a1", "#caa870", "#e3f2fd"),
  Spartan:       makeBatSvg("#b71c1c", "#d0b07c", "#ffebee"),
  "Gray-Nicolls":makeBatSvg("#1b5e20", "#c8a870", "#e8f5e9"),
  Chase:         makeBatSvg("#0d47a1", "#dfc090", "#e1f5fe"),
};

const bats = [
  // ── MRF (4 bats) ──────────────────────────────────────────────
  {
    id: 1, name: "MRF Genius Grand Edition", brand: "MRF", type: "English Willow",
    img: BRAND_IMG.MRF,
    prices: {
      Amazon:   { price: 8499, url: "https://www.amazon.in/s?k=MRF+Genius+Grand+Edition+cricket+bat" },
      Flipkart: { price: 8199, url: "https://www.flipkart.com/search?q=MRF+Genius+Grand+Edition+cricket+bat" },
      "MRF.com":{ price: 8650, url: "https://www.mrfsports.com/cricket/cricket-bats/" }
    }
  },
  {
    id: 2, name: "MRF Virat Chase Master", brand: "MRF", type: "Kashmir Willow",
    img: BRAND_IMG.MRF,
    prices: {
      Amazon:   { price: 2499, url: "https://www.amazon.in/s?k=MRF+Virat+Chase+Master+cricket+bat" },
      Flipkart: { price: 2299, url: "https://www.flipkart.com/search?q=MRF+Virat+Chase+Master+cricket+bat" },
      "MRF.com":{ price: 2599, url: "https://www.mrfsports.com/cricket/cricket-bats/" }
    }
  },
  {
    id: 3, name: "MRF Ace", brand: "MRF", type: "Kashmir Willow",
    img: BRAND_IMG.MRF,
    prices: {
      Amazon:   { price: 1599, url: "https://www.amazon.in/s?k=MRF+Ace+cricket+bat" },
      Flipkart: { price: 1499, url: "https://www.flipkart.com/search?q=MRF+Ace+cricket+bat" },
      "MRF.com":{ price: 1699, url: "https://www.mrfsports.com/cricket/cricket-bats/" }
    }
  },
  {
    id: 4, name: "MRF Genius Drive", brand: "MRF", type: "English Willow",
    img: BRAND_IMG.MRF,
    prices: {
      Amazon:   { price: 5999, url: "https://www.amazon.in/s?k=MRF+Genius+Drive+cricket+bat" },
      Flipkart: { price: 5749, url: "https://www.flipkart.com/search?q=MRF+Genius+Drive+cricket+bat" },
      "MRF.com":{ price: 6200, url: "https://www.mrfsports.com/cricket/cricket-bats/" }
    }
  },
  // ── SS (4 bats) ───────────────────────────────────────────────
  {
    id: 5, name: "SS Ton Power Stroke", brand: "SS", type: "English Willow",
    img: BRAND_IMG.SS,
    prices: {
      Amazon:     { price: 6299, url: "https://www.amazon.in/s?k=SS+Ton+Power+Stroke+cricket+bat" },
      Flipkart:   { price: 5999, url: "https://www.flipkart.com/search?q=SS+Ton+Power+Stroke+cricket+bat" },
      "SS Sports":{ price: 6499, url: "https://www.sanspareils.in/cricket-bats.html" }
    }
  },
  {
    id: 6, name: "SS Ton Maximus", brand: "SS", type: "Kashmir Willow",
    img: BRAND_IMG.SS,
    prices: {
      Amazon:     { price: 1999, url: "https://www.amazon.in/s?k=SS+Ton+Maximus+cricket+bat" },
      Flipkart:   { price: 1849, url: "https://www.flipkart.com/search?q=SS+Ton+Maximus+cricket+bat" },
      "SS Sports":{ price: 2099, url: "https://www.sanspareils.in/cricket-bats.html" }
    }
  },
  {
    id: 7, name: "SS Ton Master 5000", brand: "SS", type: "English Willow",
    img: BRAND_IMG.SS,
    prices: {
      Amazon:     { price: 9499, url: "https://www.amazon.in/s?k=SS+Ton+Master+5000+cricket+bat" },
      Flipkart:   { price: 9199, url: "https://www.flipkart.com/search?q=SS+Ton+Master+5000+cricket+bat" },
      "SS Sports":{ price: 9800, url: "https://www.sanspareils.in/cricket-bats.html" }
    }
  },
  {
    id: 8, name: "SS Ton Elite", brand: "SS", type: "English Willow",
    img: BRAND_IMG.SS,
    prices: {
      Amazon:     { price: 4299, url: "https://www.amazon.in/s?k=SS+Ton+Elite+cricket+bat" },
      Flipkart:   { price: 4099, url: "https://www.flipkart.com/search?q=SS+Ton+Elite+cricket+bat" },
      "SS Sports":{ price: 4499, url: "https://www.sanspareils.in/cricket-bats.html" }
    }
  },
  // ── SG (4 bats) ───────────────────────────────────────────────
  {
    id: 9, name: "SG Century Unlimited", brand: "SG", type: "English Willow",
    img: BRAND_IMG.SG,
    prices: {
      Amazon:   { price: 4999, url: "https://www.amazon.in/s?k=SG+Century+Unlimited+cricket+bat" },
      Flipkart: { price: 4749, url: "https://www.flipkart.com/search?q=SG+Century+Unlimited+cricket+bat" },
      "SG.com": { price: 5199, url: "https://www.sg.com/product-category/cricket/bats/" }
    }
  },
  {
    id: 10, name: "SG RP-17 Rohit Edition", brand: "SG", type: "English Willow",
    img: BRAND_IMG.SG,
    prices: {
      Amazon:   { price: 7899, url: "https://www.amazon.in/s?k=SG+RP-17+Rohit+Edition+cricket+bat" },
      Flipkart: { price: 7599, url: "https://www.flipkart.com/search?q=SG+RP17+Rohit+cricket+bat" },
      "SG.com": { price: 7499, url: "https://www.sg.com/product-category/cricket/bats/" }
    }
  },
  {
    id: 11, name: "SG Sunny Tonny", brand: "SG", type: "Kashmir Willow",
    img: BRAND_IMG.SG,
    prices: {
      Amazon:   { price: 1299, url: "https://www.amazon.in/s?k=SG+Sunny+Tonny+cricket+bat" },
      Flipkart: { price: 1199, url: "https://www.flipkart.com/search?q=SG+Sunny+Tonny+cricket+bat" },
      "SG.com": { price: 1399, url: "https://www.sg.com/product-category/cricket/bats/" }
    }
  },
  {
    id: 12, name: "SG VS 319 Xtreme", brand: "SG", type: "English Willow",
    img: BRAND_IMG.SG,
    prices: {
      Amazon:   { price: 11999, url: "https://www.amazon.in/s?k=SG+VS+319+Xtreme+cricket+bat" },
      Flipkart: { price: 11499, url: "https://www.flipkart.com/search?q=SG+VS+319+Xtreme+cricket+bat" },
      "SG.com": { price: 12200, url: "https://www.sg.com/product-category/cricket/bats/" }
    }
  },
  // ── KOOKABURRA (4 bats) ───────────────────────────────────────
  {
    id: 13, name: "Kookaburra Kahuna Pro", brand: "Kookaburra", type: "English Willow",
    img: BRAND_IMG.Kookaburra,
    prices: {
      Amazon:       { price: 9800,  url: "https://www.amazon.in/s?k=Kookaburra+Kahuna+Pro+cricket+bat" },
      Flipkart:     { price: 9599,  url: "https://www.flipkart.com/search?q=Kookaburra+Kahuna+Pro+cricket+bat" },
      "Kookaburra": { price: 9350,  url: "https://www.kookaburra.biz/cricket/cricket-bats/" }
    }
  },
  {
    id: 14, name: "Kookaburra Ghost Pro 1.0", brand: "Kookaburra", type: "English Willow",
    img: BRAND_IMG.Kookaburra,
    prices: {
      Amazon:       { price: 15000, url: "https://www.amazon.in/s?k=Kookaburra+Ghost+Pro+cricket+bat" },
      Flipkart:     { price: 14599, url: "https://www.flipkart.com/search?q=Kookaburra+Ghost+Pro+cricket+bat" },
      "Kookaburra": { price: 14250, url: "https://www.kookaburra.biz/cricket/cricket-bats/" }
    }
  },
  {
    id: 15, name: "Kookaburra Rapid Pro 5.0", brand: "Kookaburra", type: "English Willow",
    img: BRAND_IMG.Kookaburra,
    prices: {
      Amazon:       { price: 7499, url: "https://www.amazon.in/s?k=Kookaburra+Rapid+Pro+5.0+cricket+bat" },
      Flipkart:     { price: 7299, url: "https://www.flipkart.com/search?q=Kookaburra+Rapid+Pro+cricket+bat" },
      "Kookaburra": { price: 7600, url: "https://www.kookaburra.biz/cricket/cricket-bats/" }
    }
  },
  {
    id: 16, name: "Kookaburra Blaze Pro 700", brand: "Kookaburra", type: "Kashmir Willow",
    img: BRAND_IMG.Kookaburra,
    prices: {
      Amazon:       { price: 2799, url: "https://www.amazon.in/s?k=Kookaburra+Blaze+Pro+700+cricket+bat" },
      Flipkart:     { price: 2599, url: "https://www.flipkart.com/search?q=Kookaburra+Blaze+Pro+cricket+bat" },
      "Kookaburra": { price: 2900, url: "https://www.kookaburra.biz/cricket/cricket-bats/" }
    }
  },
  // ── GM (3 bats) ───────────────────────────────────────────────
  {
    id: 17, name: "GM Icon DXM", brand: "GM", type: "English Willow",
    img: BRAND_IMG.GM,
    prices: {
      Amazon:      { price: 12500, url: "https://www.amazon.in/s?k=GM+Icon+DXM+cricket+bat" },
      Flipkart:    { price: 11999, url: "https://www.flipkart.com/search?q=GM+Icon+DXM+cricket+bat" },
      "GM Cricket":{ price: 11750, url: "https://www.gmcricket.com/cricket-bats/" }
    }
  },
  {
    id: 18, name: "GM Mogul 404", brand: "GM", type: "English Willow",
    img: BRAND_IMG.GM,
    prices: {
      Amazon:      { price: 8999, url: "https://www.amazon.in/s?k=GM+Mogul+404+cricket+bat" },
      Flipkart:    { price: 8699, url: "https://www.flipkart.com/search?q=GM+Mogul+404+cricket+bat" },
      "GM Cricket":{ price: 9100, url: "https://www.gmcricket.com/cricket-bats/" }
    }
  },
  {
    id: 19, name: "GM Sparq 606", brand: "GM", type: "English Willow",
    img: BRAND_IMG.GM,
    prices: {
      Amazon:      { price: 5499, url: "https://www.amazon.in/s?k=GM+Sparq+606+cricket+bat" },
      Flipkart:    { price: 5299, url: "https://www.flipkart.com/search?q=GM+Sparq+606+cricket+bat" },
      "GM Cricket":{ price: 5600, url: "https://www.gmcricket.com/cricket-bats/" }
    }
  },
  // ── BAS (2 bats) ──────────────────────────────────────────────
  {
    id: 20, name: "BAS Tiger Limited", brand: "BAS", type: "Kashmir Willow",
    img: BRAND_IMG.BAS,
    prices: {
      Amazon:       { price: 3200, url: "https://www.amazon.in/s?k=BAS+Tiger+cricket+bat" },
      Flipkart:     { price: 3099, url: "https://www.flipkart.com/search?q=BAS+Tiger+cricket+bat" },
      "BAS Cricket":{ price: 2999, url: "https://www.bascricket.com/" }
    }
  },
  {
    id: 21, name: "BAS Vampire 5 Star", brand: "BAS", type: "English Willow",
    img: BRAND_IMG.BAS,
    prices: {
      Amazon:       { price: 6799, url: "https://www.amazon.in/s?k=BAS+Vampire+5+Star+cricket+bat" },
      Flipkart:     { price: 6499, url: "https://www.flipkart.com/search?q=BAS+Vampire+5+Star+cricket+bat" },
      "BAS Cricket":{ price: 6900, url: "https://www.bascricket.com/" }
    }
  },
  // ── PUMA (2 bats) ─────────────────────────────────────────────
  {
    id: 22, name: "Puma Evospeed 1 Star", brand: "Puma", type: "English Willow",
    img: BRAND_IMG.Puma,
    prices: {
      Amazon:   { price: 4499, url: "https://www.amazon.in/s?k=Puma+Evospeed+1+Star+cricket+bat" },
      Flipkart: { price: 4299, url: "https://www.flipkart.com/search?q=Puma+Evospeed+1+Star+cricket+bat" },
      "Puma.in":{ price: 4700, url: "https://in.puma.com/in/en/cricket" }
    }
  },
  {
    id: 23, name: "Puma Evo 3", brand: "Puma", type: "Kashmir Willow",
    img: BRAND_IMG.Puma,
    prices: {
      Amazon:   { price: 1899, url: "https://www.amazon.in/s?k=Puma+Evo+3+cricket+bat" },
      Flipkart: { price: 1749, url: "https://www.flipkart.com/search?q=Puma+Evo+3+cricket+bat" },
      "Puma.in":{ price: 2000, url: "https://in.puma.com/in/en/cricket" }
    }
  },
  // ── ADIDAS (2 bats) ───────────────────────────────────────────
  {
    id: 24, name: "Adidas XT 2.0 Black", brand: "Adidas", type: "English Willow",
    img: BRAND_IMG.Adidas,
    prices: {
      Amazon:     { price: 13500, url: "https://www.amazon.in/s?k=Adidas+XT+2.0+Black+cricket+bat" },
      Flipkart:   { price: 12999, url: "https://www.flipkart.com/search?q=Adidas+XT+2.0+Black+cricket+bat" },
      "Adidas.in":{ price: 13800, url: "https://www.adidas.co.in/cricket" }
    }
  },
  {
    id: 25, name: "Adidas Pellara 5 Star", brand: "Adidas", type: "English Willow",
    img: BRAND_IMG.Adidas,
    prices: {
      Amazon:     { price: 7299, url: "https://www.amazon.in/s?k=Adidas+Pellara+5+Star+cricket+bat" },
      Flipkart:   { price: 6999, url: "https://www.flipkart.com/search?q=Adidas+Pellara+5+Star+cricket+bat" },
      "Adidas.in":{ price: 7500, url: "https://www.adidas.co.in/cricket" }
    }
  },
  // ── SPARTAN (2 bats) ──────────────────────────────────────────
  {
    id: 26, name: "Spartan MSD 7 Pro", brand: "Spartan", type: "English Willow",
    img: BRAND_IMG.Spartan,
    prices: {
      Amazon:    { price: 5999, url: "https://www.amazon.in/s?k=Spartan+MSD+7+Pro+cricket+bat" },
      Flipkart:  { price: 5749, url: "https://www.flipkart.com/search?q=Spartan+MSD+7+Pro+cricket+bat" },
      "Spartan": { price: 6100, url: "https://www.spartancricket.com/" }
    }
  },
  {
    id: 27, name: "Spartan AB de Villiers", brand: "Spartan", type: "English Willow",
    img: BRAND_IMG.Spartan,
    prices: {
      Amazon:    { price: 8299, url: "https://www.amazon.in/s?k=Spartan+AB+de+Villiers+cricket+bat" },
      Flipkart:  { price: 7999, url: "https://www.flipkart.com/search?q=Spartan+AB+de+Villiers+cricket+bat" },
      "Spartan": { price: 8400, url: "https://www.spartancricket.com/" }
    }
  },
  // ── GRAY-NICOLLS (2 bats) ─────────────────────────────────────
  {
    id: 28, name: "Gray-Nicolls Omega Strike", brand: "Gray-Nicolls", type: "English Willow",
    img: BRAND_IMG["Gray-Nicolls"],
    prices: {
      Amazon:       { price: 10499, url: "https://www.amazon.in/s?k=Gray+Nicolls+Omega+Strike+cricket+bat" },
      Flipkart:     { price: 9999,  url: "https://www.flipkart.com/search?q=Gray+Nicolls+Omega+Strike+cricket+bat" },
      "GN Cricket": { price: 10700, url: "https://www.gray-nicolls.co.uk/cricket/cricket-bats/" }
    }
  },
  {
    id: 29, name: "Gray-Nicolls Excalibur 2000", brand: "Gray-Nicolls", type: "English Willow",
    img: BRAND_IMG["Gray-Nicolls"],
    prices: {
      Amazon:       { price: 6499, url: "https://www.amazon.in/s?k=Gray+Nicolls+Excalibur+2000+cricket+bat" },
      Flipkart:     { price: 6199, url: "https://www.flipkart.com/search?q=Gray+Nicolls+Excalibur+2000+cricket+bat" },
      "GN Cricket": { price: 6700, url: "https://www.gray-nicolls.co.uk/cricket/cricket-bats/" }
    }
  },
  // ── CHASE (1 bat) ─────────────────────────────────────────────
  {
    id: 30, name: "Chase Volante 1", brand: "Chase", type: "English Willow",
    img: BRAND_IMG.Chase,
    prices: {
      Amazon:      { price: 18500, url: "https://www.amazon.in/s?k=Chase+Volante+1+cricket+bat" },
      Flipkart:    { price: 17999, url: "https://www.flipkart.com/search?q=Chase+Volante+1+cricket+bat" },
      "Chase Bats":{ price: 17500, url: "https://www.chasecricket.co.uk/" }
    }
  }
];

// Platform accent colours (for dots + logos)
const dotColors = {
  Amazon:         "#ff9900",
  Flipkart:       "#2874f0",
  "MRF.com":      "#cc0000",
  "SS Sports":    "#1565c0",
  "SG.com":       "#2e7d32",
  "Kookaburra":   "#6d4c41",
  "GM Cricket":   "#6a1b9a",
  "BAS Cricket":  "#bf360c",
  "Puma.in":      "#424242",
  "Adidas.in":    "#0d47a1",
  "Spartan":      "#c62828",
  "GN Cricket":   "#1b5e20",
  "Chase Bats":   "#0d47a1"
};

function getDotColor(plat) {
  return dotColors[plat] || "#5a7a62";
}
