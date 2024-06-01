import { useLayoutEffect, useState } from "hono/jsx";
import HeaderButton from "./headerButton";

export default function ThemeButton() {
  const [currentTheme, setCurrentTheme] = useState<string | null>(null);

  useLayoutEffect(() => {
    initTheme();
    // androidのブラウザバックのback forward cache対策
    window.addEventListener("pagehide", initTheme);
    window.addEventListener("pageshow", initTheme);
    return () => {
      window.removeEventListener("pagehide", initTheme);
      window.removeEventListener("pageshow", initTheme);
    };
  }, []);

  const initTheme = () => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentTheme = localStorage.getItem("theme");
    const theme = () => {
      if (currentTheme) return currentTheme;
      if (isDark) return "dark";
      return "light";
    };
    setCurrentTheme(theme());
  };

  const toggleTheme = () => {
    if (currentTheme === "light") {
      setCurrentTheme("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      setCurrentTheme("light");
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };
  return (
    <HeaderButton onClick={toggleTheme}>
      <LightIcon />
      <DarkIcon />
    </HeaderButton>
  );
}

const DarkIcon = () => (
  <svg
    class="h-6 w-6 hidden dark:block"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>dark theme icon</title>
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

const LightIcon = () => (
  <svg
    class="h-6 w-6 block dark:hidden stroke-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    stroke-width="2"
  >
    <title>light theme icon</title>
    <path
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
