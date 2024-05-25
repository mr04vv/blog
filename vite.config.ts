import pages from "@hono/vite-cloudflare-pages";
import adapter from "@hono/vite-dev-server/cloudflare";
import mdx from "@mdx-js/rollup";
import honox from "honox/vite";
import client from "honox/vite/client";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { defineConfig } from "vite";
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
        rehypePlugins: [
          rehypeStringify,
          // @ts-ignore
          () => rehypePrettyCode({ theme: theme }),
        ],
      }),
    ],
    build: {
      assetsDir: "static",
      ssrEmitAssets: true,
    },
  };
});
