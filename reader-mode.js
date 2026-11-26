(() => {
  const key = "site-reader-mode";
  const previous = localStorage.getItem("quarto-reader-mode");
  if (previous !== null) {
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, previous);
    }
    localStorage.removeItem("quarto-reader-mode");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const toggles = document.querySelectorAll(".quarto-reader-toggle");
    const setReaderMode = (enabled) => {
      document.body.classList.toggle("site-reader-mode", enabled);
      toggles.forEach((toggle) => {
        toggle.classList.toggle("reader", enabled);
        toggle.setAttribute("role", "button");
        toggle.setAttribute("aria-pressed", String(enabled));
        toggle.setAttribute("aria-label", enabled ? "Exit reader mode" : "Enter reader mode");
      });
    };

    setReaderMode(localStorage.getItem(key) === "true");
    toggles.forEach((toggle) => {
      toggle.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        const enabled = !document.body.classList.contains("site-reader-mode");
        localStorage.setItem(key, String(enabled));
        setReaderMode(enabled);
      }, true);
      toggle.addEventListener("keydown", (event) => {
        if (event.key === " ") {
          event.preventDefault();
          toggle.click();
        }
      });
    });
  });
})();
