import image from "../assets/avatar.webp?url";
import { Avatar } from "./avatar";
import { GithubIcon, HomeIcon, NoteIcon, SizuMeIcon, XIcon } from "./icons";

const ICON_SIZE = 24;
export const Profile = () => {
  return (
    <div
      class={
        "border border-gray-300 dark:border-gray-600 rounded-3xl flex p-6 my-10 gap-6 items-center dark:text-gray-100"
      }
    >
      {import.meta.env.PROD ? (
        <Avatar src="/assets/avatar.webp" />
      ) : (
        <Avatar src={image} />
      )}
      <div class={"flex flex-col gap-3"}>
        <div class="flex gap-2">
          <span class={"font-bold"}>Takuto Mori</span>
          <span class={"text-gray-500 dark:text-gray-200"}>@_mooriii</span>
        </div>
        <p class={"text-sm"}>
          Wevoxというサービスのフロントエンジニアをしています。趣味は猫を眺めることです🐱
        </p>
        <div class={"flex gap-2 items-center"}>
          <a href="https://mooriii.com" target="_blank" rel="noreferrer">
            <HomeIcon />
          </a>
          <a href="https://x.com/_mooriii" target="_blank" rel="noreferrer">
            <XIcon />
          </a>
          <a href="https://github.com/mr04vv" target="_blank" rel="noreferrer">
            <GithubIcon />
          </a>
          <a href="https://sizu.me/mooriii" target="_blank" rel="noreferrer">
            <SizuMeIcon />
          </a>
          <a href="https://note.com/mooriii" target="_blank" rel="noreferrer">
            <NoteIcon />
          </a>
        </div>
      </div>
    </div>
  );
};
