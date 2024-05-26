import { jsxRenderer } from "hono/jsx-renderer";

export default jsxRenderer(({ children, title, Layout }) => {
  return (
    <Layout title="hoge">
      <article class={"markdown"}>{children}</article>
    </Layout>
  );
});
