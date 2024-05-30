type Props = {
  src: string;
};
export const Avatar = (props: Props) => {
  return (
    <a
      href={props.src}
      class={"items-center inline-block w-28 flex-shrink-0 max-sm:w-20"}
    >
      <img class={"rounded-full w-full"} src={props.src} alt={"アイコン画像"} />
    </a>
  );
};
