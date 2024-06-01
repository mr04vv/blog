export const AnchorLink = (props: { href: string; children: string }) => (
  <a
    href={props.href}
    target="_blank"
    class={"text-blue-500 dark:text-blue-400 underline mx-1"}
    rel="noreferrer"
  >
    {props.children}
  </a>
);
