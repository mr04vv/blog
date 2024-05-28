import { blogName } from "../../constants";

export const Header = () => {
  return (
    <header class={"text-center border-b w-full pb-4 tracking-widest"}>
      <a href="/">
        <h2 class={"font-semibold text-3xl text-center text-[#4b4b4b]"}>
          {blogName}📝
        </h2>
      </a>
    </header>
  );
};
