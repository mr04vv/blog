type Props = {
  src: string;
  alt: string;
};

export const ArticleImage = async (props: Props) => {
  const isFullUrl = props.src.startsWith("http");
  // ここもっといい感じにしたい
  const devImagePath =
    "http://localhost:5173/@fs/Users/takutomori/Works/develop/workspace/projects/blog/app";
  const imageUrl = import.meta.env.PROD
    ? `/assets/${props.src}`
    : `${devImagePath}/assets/${props.src}`;
  return (
    <figure class="full-width justify-center flex">
      <a href={isFullUrl ? props.src : imageUrl}>
        <img
          src={isFullUrl ? props.src : imageUrl}
          alt={props.alt}
          width={"100%"}
          height={"100%"}
        />
      </a>
    </figure>
  );
};
