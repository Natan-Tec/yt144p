// Roda no contexto da página para acessar o player do YouTube.
(() => {
  const enabled = () => document.documentElement.dataset.ythForce !== "0";

  function enforce() {
    if (!enabled()) return;
    const p = document.getElementById("movie_player");
    if (!p || !p.setPlaybackQualityRange) return;
    try {
      // "tiny" = 144p. Trava o intervalo permitido em 144p.
      p.setPlaybackQualityRange("tiny", "tiny");
      if (p.getPlaybackQuality && p.getPlaybackQuality() !== "tiny") {
        p.setPlaybackQuality("tiny");
      }
    } catch (e) {}
  }

  // Reaplica o tempo todo: se o usuário tentar escolher outra qualidade, volta para 144p.
  setInterval(enforce, 300);
  document.addEventListener("yt-navigate-finish", enforce);
  document.addEventListener("yt-page-data-updated", enforce);
  document.addEventListener("loadstart", enforce, true);
})();
