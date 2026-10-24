const defaults = {};
YTH_DEFS.forEach(d => (defaults[d.key] = d.def));

chrome.storage.sync.get(defaults, cfg => {
  const list = document.getElementById("list");
  YTH_DEFS.forEach(d => {
    const label = document.createElement("label");
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = !!cfg[d.key];
    cb.addEventListener("change", () => chrome.storage.sync.set({ [d.key]: cb.checked }));
    label.append(cb, document.createTextNode(d.label));
    list.appendChild(label);
  });
});
