type Props = {
  src: string;
  alt: string;
};

export const ArticleImage = async (props: Props) => {
  const isFullUrl = props.src.startsWith("http");
  const imageUrl = `/assets/${props.src}`;
  return (
    <figure class="full-width justify-center flex">
      <a href={isFullUrl ? props.src : imageUrl}>
        <img
          class={"object-contain max-h-[500px] max-w-full h-auto w-auto"}
          src={isFullUrl ? props.src : imageUrl}
          loading="lazy"
          alt={props.alt}
          width={"auto"}
          height={"auto"}
        />
      </a>
    </figure>
  );
};
