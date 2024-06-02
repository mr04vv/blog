import { Fragment } from "hono/jsx/jsx-runtime";
import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";
import { ArticleListItem } from "../../components/articleListItem";
import { Footer } from "../../components/footer";
import { XIcon } from "../../components/icons";
import { Profile } from "../../components/profile";
import { TitleIcon } from "../../components/titleIcon";
import { formattedDate } from "../../lib/date";
import {
  getLatestPostsWithoutTargetPost,
  getPostByEntryName,
  getPosts,
} from "../../lib/posts";

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
    const date = formattedDate(post?.frontmatter.date ?? "");

    const latestPosts = getLatestPostsWithoutTargetPost(post?.entryName ?? "");
    const hasLatestPosts = latestPosts.length > 0;
    return c.render(
      <div>
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

        <div class={"mt-10 flex items-center justify-center gap-2"}>
          <span>この記事をシェアする</span>
          <a
            href={`https://twitter.com/share?url=https://blog.mooriii.com/${
              post?.entryName
            }&text=${post?.frontmatter.title}${" - "}mooriii's blog`}
            class={"flex hover:opacity-70 transition-opacity"}
          >
            <XIcon size={26} />
          </a>
        </div>

        <Profile />
        {hasLatestPosts && (
          <div class={"flex flex-col gap-3"}>
            <p class={"font-bold"}>新着記事</p>
            <div class={"flex flex-col gap-4"}>
              {latestPosts.map((post) => (
                <Fragment key={post.entryName}>
                  <ArticleListItem
                    entryName={post.entryName}
                    date={post.frontmatter.date}
                    title={post.frontmatter.title}
                    description={post.frontmatter.description}
                    iconUrl={post.frontmatter.iconUrl}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        )}
        <Footer />
      </div>,
      {
        title: pageTitle,
        entryName: slug,
        frontmatter: post?.frontmatter,
      },
    );
  },
);
