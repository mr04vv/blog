import type { JSX } from "hono/jsx/jsx-runtime";
import { blogName } from "../constants";

type Props = {
  children: JSX.Element;
};
export const Header = (props: Props) => {
  return (
    <header
      class={
        "text-center border-b px-4 mx-2 max-md:px-2 dark:border-gray-500 w-full h-16 tracking-widest dark:text-gray-100 flex justify-between items-center"
      }
    >
      <a href="/" class={"flex items-center cursor-pointer"}>
        <h2 class={"font-semibold text-center text-2xl max-md:text-xl"}>
          {blogName}
        </h2>
      </a>
      <div class={"flex justify-center"}>
        <div class="mr-2">{props.children}</div>
        <a
          href="https://x.com/_mooriii"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            class="dark:text-white  h-10 w-10 flex justify-center rounded-xl transition-opacity hover:opacity-70 items-center cursor-pointer"
            type="button"
          >
            <svg
              class="dark:stroke-white dark:fill-white"
              width="24"
              viewBox="0 0 1200 1227"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>x account link</title>
              <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
            </svg>
          </button>
        </a>
        <a
          href="https://github.com/mr04vv/blog"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            class="dark:text-white h-10 w-10 flex justify-center rounded-xl transition-opacity hover:opacity-70 items-center cursor-pointer"
            type="button"
          >
            <svg
              class="dark:stroke-white dark:fill-white"
              focusable="false"
              viewBox="0 0 24 24"
              width="30"
              data-testid="GitHubIcon"
            >
              <title>github account link</title>
              <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27" />
            </svg>
          </button>
        </a>
      </div>
    </header>
  );
};
