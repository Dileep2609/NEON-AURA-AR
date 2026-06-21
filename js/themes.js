const themes = {
  Rainbow: (t, i, total) =>
    `hsl(${(t * 100 + i * (360 / total)) % 360},100%,60%)`,

  Cyberpunk: () => "#ff00ff",

  Ocean: () => "#00ccff",
};

let currentTheme = "Rainbow";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".theme-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentTheme = btn.dataset.theme;
    });
  });
});
