import { createRoute } from "honox/factory";
import { getPosts } from "../lib/posts";

export default createRoute((c) => {
  const posts = getPosts();
  return c.render(
    <div class={"mt-6 flex flex-col gap-12"}>
      {posts.map((post) => (
        <div
          key={post.entryName}
          class={"flex flex-col gap-1 dark:text-gray-100"}
        >
          <a href={`/entry/${post.entryName}`}>
            <h2 class={"text-2xl font-semibold hover:underline"}>
              {post.frontmatter.title}
            </h2>
          </a>
          <div class={"flex flex-col gap-0.5"}>
            <time class={"text-gray-500 dark:text-gray-400 text-sm"}>
              {new Date(post.frontmatter.date).toLocaleDateString("ja-JP")}
            </time>
            <p class={"text-gray-500 dark:text-gray-400 text-sm"}>
              {post.frontmatter.description}
            </p>
          </div>
        </div>
      ))}
    </div>,
  );
});
