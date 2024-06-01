const theme = () => {
  const currentTheme = localStorage.getItem("theme");
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (currentTheme === null) {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  } else {
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
};
theme();
window.addEventListener("pagehide", () => theme());
window.addEventListener("pageshow", () => theme());
