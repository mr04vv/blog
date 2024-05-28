import type { JSX } from "hono/jsx/jsx-runtime";
import type { MDXProps } from "mdx/types";
import type { Frontmatter } from "../types";
import { getEntryNameFromPath } from "../utils";

type MDX = {
  frontmatter: Frontmatter;
  default: (props: MDXProps) => JSX.Element;
  ContentSummary?: () => JSX.Element;
};

const posts = import.meta.glob<MDX>("../articles/**/*.mdx", {
  eager: true,
});

export const getPosts = () => {
  const postsData = Object.entries(posts).map(([path, post]) => {
    const entryName = getEntryNameFromPath(path);
    const { frontmatter } = post;
    const { default: Component, ContentSummary } = post;
    return { entryName, frontmatter, Component, ContentSummary };
  });
  return postsData;
};

export const getPostByEntryName = (entryName: string) => {
  const posts = getPosts();
  const post = posts.find((post) => post.entryName === entryName);
  return post;
};
