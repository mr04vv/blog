import type { JSX } from "hono/jsx/jsx-runtime";

type Props = {
  onClick?: () => void;
  children: JSX.Element;
};
export default function HeaderButton(props: Props) {
  return (
    <button
      onClick={props.onClick}
      class="dark:text-white border dark:border-gray-600 h-10 w-10 flex justify-center rounded-md transition-opacity hover:opacity-70  shadow-sm items-center"
      type="button"
    >
      {props.children}
    </button>
  );
}
