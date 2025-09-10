import { jaModel, Parser } from "budoux";
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

const parser = new Parser(jaModel);

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
    const pageTitle = post?.frontmatter?.title ?? "";
    const date = formattedDate(post?.frontmatter?.date ?? "");

    const latestPosts = getLatestPostsWithoutTargetPost(post?.entryName ?? "");
    const hasLatestPosts = latestPosts.length > 0;
    const splitedTitle = parser.parse(post?.frontmatter?.title ?? "");
    const titleLen = pageTitle.length;
    return c.render(
      <div>
        <div class={"flex flex-col mb-10 items-center"}>
          <TitleIcon iconUrl={post?.frontmatter?.iconUrl ?? ""} />
          <h1
            class={`text-center leading-tight text-3xl mb-0 mt-6 pb-2 font-bold flex justify-center md:auto-phrase ${
              titleLen > 20 && "md:w-[90%]"
            }`}
          >
            {splitedTitle}
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
            href={`https://twitter.com/intent/tweet?url=https://blog.mooriii.com/entry/${
              post?.entryName
            }&text=${post?.frontmatter?.title || ""}${" - "}mooriii's blog`}
            target={"_blank"}
            referrerpolicy="no-referrer"
            class={"flex hover:opacity-70 transition-opacity"}
            rel="noreferrer"
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
                    date={post.frontmatter?.date || ""}
                    title={post.frontmatter?.title || ""}
                    description={post.frontmatter?.description || ""}
                    iconUrl={post.frontmatter?.iconUrl || ""}
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
