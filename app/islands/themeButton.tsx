export default function ThemeButton() {
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
  };
  return (
    <button
      onClick={toggleTheme}
      class="dark:text-white border dark:border-gray-600 h-10 w-10 flex justify-center rounded-md transition-opacity hover:opacity-70  shadow-sm items-center"
      type="button"
    >
      <LightIcon />
      <DarkIcon />
    </button>
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
