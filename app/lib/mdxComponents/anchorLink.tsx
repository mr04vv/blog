export const AnchorLink = ({
  href,
  children,
  className,
  ...rest
}: { href: string; children: string; className?: string }) => {
  return (
    <a
      href={href}
      {...rest}
      className={`text-blue-500 dark:text-blue-400 underline mx-1 ${
        className ? className : ""
      }`}
    >
      {children}
    </a>
  );
};
