import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";
import { getPostByEntryName, getPosts } from "../../lib/posts";

export default createRoute(
  ssgParams(() => {
    const posts = getPosts();
    return posts.map((post) => ({
      slug: post.entryName,
    }));
  }),
  async (c) => {
    const slug = c.req.param("slug");
    if (slug === ":slug") {
      c.status(404);
      return c.text("Not Found");
    }

    const post = getPostByEntryName(slug);
    const pageTitle = post?.frontmatter.title ?? "";
    return c.render(
      <article class={"markdown"}>{post?.Component({})}</article>,
      {
        title: pageTitle,
        entryName: slug,
        frontmatter: post?.frontmatter,
      },
    );
  },
);
