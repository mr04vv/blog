export const AnchorLink = ({
  href,
  children,
  className,
  "data-footnote-ref": isFootnoteRef,
  ...rest
}: {
  href: string;
  children: string;
  className?: string;
  "data-footnote-ref": string;
}) => {
  const isFootNoteBackRef = className === "data-footnote-backref";
  return (
    <a
      href={href}
      {...rest}
      className={`text-blue-500 dark:text-blue-400 underline mx-1 ${
        className ? className : ""
      }`}
      target={isFootNoteBackRef || isFootnoteRef ? undefined : "_blank"}
      rel="noreferrer"
    >
      {children}
    </a>
  );
};
