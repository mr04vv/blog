import { createRoute } from "honox/factory";
import { getPosts } from "../lib/posts";

export default createRoute((c) => {
  const posts = getPosts();
  return c.render(
    <div class={"mt-6 flex flex-col gap-12"}>
      {posts.map((post) => (
        <div key={post.entryName} class={"flex flex-col"}>
          <a href={`/entry/${post.entryName}`}>
            <h2
              class={
                "transition text-2xl font-semibold text-[#4b4b4b] hover:underline"
              }
            >
              {post.frontmatter.title}
            </h2>
          </a>

          <div class={"gap-1 mt-2"}>
            <time class={"text-gray-500 text-sm"}>
              {new Date(post.frontmatter.date).toLocaleDateString("ja-JP")}
            </time>
            {" — "}
            <span class={"text-gray-500 text-sm"}>
              {post.frontmatter.description}
            </span>
          </div>
        </div>
      ))}
    </div>,
  );
});
