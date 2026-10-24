(() => {
  const style = document.createElement("style");
  style.id = "yth-style";
  let cfg = {};

  function apply() {
    const css = YTH_DEFS.filter(d => cfg[d.key]).map(d => d.css).join("\n");
    style.textContent = css;
    if (!style.isConnected) (document.head || document.documentElement).appendChild(style);
    // sinaliza para o main.js (mundo da página) se deve forçar 144p
    document.documentElement.dataset.ythForce = cfg.force144 ? "1" : "0";
    redirectShorts();
  }

  function redirectShorts() {
    if (!cfg.hideShorts) return;
    const m = location.pathname.match(/^\/shorts\/([\w-]{5,})/);
    if (m) location.replace("/watch?v=" + m[1]);
  }

  function killAutoplay() {
    if (!cfg.hideAutoplayToggle) return;
    const b = document.querySelector('.ytp-autonav-toggle-button[aria-checked="true"]');
    if (b) b.click();
  }

  function load() {
    const defaults = {};
    YTH_DEFS.forEach(d => (defaults[d.key] = d.def));
    chrome.storage.sync.get(defaults, v => { cfg = v; apply(); });
  }

  chrome.storage.onChanged.addListener(load);
  document.addEventListener("yt-navigate-start", redirectShorts);
  document.addEventListener("yt-navigate-finish", () => { redirectShorts(); killAutoplay(); });
  setInterval(killAutoplay, 1500);
  load();
})();
