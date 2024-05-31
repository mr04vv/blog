import { Fragment } from "hono/jsx/jsx-runtime";
import { createRoute } from "honox/factory";
import { ArticleListItem } from "../components/articleListIte";
import { getPosts } from "../lib/posts";

export default createRoute((c) => {
  const posts = getPosts();
  return c.render(
    <div class={"mt-6 flex flex-col gap-12"}>
      {posts.map((post) => (
        <Fragment key={post.entryName}>
          <ArticleListItem
            date={post.frontmatter.date}
            title={post.frontmatter.title}
            description={post.frontmatter.description}
            iconUrl={post.frontmatter.iconUrl}
            entryName={post.entryName}
          />
        </Fragment>
      ))}
    </div>,
  );
});
