// レンダリングされる前に実行しないとチラつきが発生する
const currentTheme = localStorage.getItem("theme");
const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (currentTheme === null) {
  if (isDark) {
    document.documentElement.classList.add("dark");
  }
} else {
  if (currentTheme === "dark") document.documentElement.classList.add("dark");
}
