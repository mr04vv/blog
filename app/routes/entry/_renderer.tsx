import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";

export default jsxRenderer(({ children, title, frontmatter, Layout }) => {
  const c = useRequestContext();
  const current = c.req.path;
  const entryName = current.split("/")[2];
  return (
    <Layout entryName={entryName}>
      <article class={"markdown"}>{children}</article>
    </Layout>
  );
});
