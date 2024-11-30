import { fetchOgp } from "../fetchOgp";

type Props = {
  url: string;
};
export const ExternalOgp = async (props: Props) => {
  const ogp = await fetchOgp(props.url);

  if (!ogp) return <></>;
  const host = new URL(props.url).host;
  return (
    <a
      href={props.url}
      target="_blank"
      class={"ogp-link transition-opacity hover:opacity-65"}
      rel="noreferrer"
    >
      <div
        class={
          "flex border dark:border-gray-600 rounded-lg  no-underline h-[136px] max-md:h-28 my-4"
        }
      >
        <div class="flex flex-col justify-between px-6 py-4 h-full w-full max-md:px-4">
          <span class={"font-bold text-ellipsis line-clamp-1 max-md:text-sm"}>
            {ogp.title}
          </span>
          <span
            class={
              "text-sm text-ellipsis line-clamp-2 text-gray-500 dark:text-gray-300 max-md:text-xs"
            }
          >
            {ogp.description}
          </span>
          <div class="flex gap-2 items-center">
            {ogp.favicon && (
              <img
                src={ogp.favicon}
                width={16}
                height={16}
                alt={`favicon of ${ogp.url}`}
              />
            )}

            <span class="text-xs">{host}</span>
          </div>
        </div>
        {ogp.image && (
          <div class="h-full">
            <img
              src={ogp.image}
              class={"h-full w-fit rounded-r-lg max-w-[32vw] object-cover"}
              alt={`ogp of ${ogp.image}`}
            />
          </div>
        )}
      </div>
    </a>
  );
};
