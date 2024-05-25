import pages from "@hono/vite-cloudflare-pages";
import adapter from "@hono/vite-dev-server/cloudflare";
import honox from "honox/vite";
import client from "honox/vite/client";
import { defineConfig } from "vite";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import remarkParse from "remark-parse";
import theme from "./assets/theme.json";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      plugins: [client()],
    };
  }
  return {
    plugins: [
      honox({
        devServer: {
          adapter,
        },
      }),
      pages(),
      mdx({
        jsxImportSource: "hono/jsx",
        remarkPlugins: [
          remarkFrontmatter,
          remarkMdxFrontmatter,
          remarkParse,
          remarkRehype,
        ],
        rehypePlugins: [rehypeStringify, () => rehypePrettyCode({ theme })],
      }),
    ],
    build: {
      assetsDir: "static",
      ssrEmitAssets: true,
    },
  };
});
