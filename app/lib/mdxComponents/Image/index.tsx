type Props = {
  src: string;
  alt: string;
};

export const ArticleImage = async (props: Props) => {
  // ここもっといい感じにしたい
  const devImagePath =
    "http://localhost:5173/@fs/Users/takutomori/Works/develop/workspace/projects/blog/app";
  const imageUrl = import.meta.env.PROD
    ? `/assets/${props.src}`
    : `${devImagePath}/assets/${props.src}`;
  return (
    <figure class="full-width">
      <a href={imageUrl}>
        <img src={imageUrl} alt={props.alt} />
      </a>
      <figcaption class="text-center mt-2">{props.alt}</figcaption>
    </figure>
  );
};
