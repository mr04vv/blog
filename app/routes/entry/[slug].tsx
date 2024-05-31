import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";
import { XIcon } from "../../components/icons";
import { Profile } from "../../components/profile";
import { TitleIcon } from "../../components/titleIcon";
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
    const date = new Date(post?.frontmatter.date ?? "").toLocaleDateString(
      "ja-JP",
    );
    return c.render(
      <div class="mb-10">
        <div class={"flex flex-col mb-10"}>
          <TitleIcon iconUrl={post?.frontmatter.iconUrl ?? ""} />
          <h1
            class={
              "text-center leading-tight text-3xl mb-0 mt-6 pb-2 font-bold"
            }
          >
            {post?.frontmatter.title}
          </h1>
          <time
            class={
              "flex justify-center text-gray-600 dark:text-gray-300 text-base"
            }
          >
            {date}
          </time>
        </div>
        <article class={"markdown"}>{post?.Component({})}</article>
        <div class={"mt-10 flex items-center justify-center gap-4"}>
          <span>この記事をシェアする</span>
          <a
            href={`https://twitter.com/share?url=https://blog.mooriii.com/${
              post?.entryName
            }&text=${post?.frontmatter.title}${" - "}mooriii's blog`}
            class={"flex justify-center"}
          >
            <XIcon size={26} />
          </a>
        </div>
        <Profile />
      </div>,
      {
        title: pageTitle,
        entryName: slug,
        frontmatter: post?.frontmatter,
      },
    );
  },
);
