type Props = {
  iconUrl: string;
};

export const TitleIcon = (props: Props) => {
  return (
    <div class={"flex justify-center"}>
      <img src={props.iconUrl} alt="article icon" width={80} />
    </div>
  );
};
