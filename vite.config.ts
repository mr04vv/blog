import ssg from "@hono/vite-ssg";
import mdx from "@mdx-js/rollup";
import honox from "honox/vite";
import client from "honox/vite/client";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
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

  const entry = "./app/server.ts";

  return {
    plugins: [
      ssg({ entry }),
      honox({}),
      mdx({
        jsxImportSource: "hono/jsx",
        remarkPlugins: [
          remarkFrontmatter,
          remarkMdxFrontmatter,
          [
            remarkRehype,
            {
              footnoteBackContent: "↩︎",
              footnoteLabel: " ",
              footnoteLabelTagName: "hr",
              footnoteBackLabel: "Back to reference 1",
            },
          ],
          remarkGfm,
          remarkParse,
        ],
        rehypePlugins: [rehypeStringify, [rehypePrettyCode, { theme: theme }]],
      }),
    ],
    build: {
      assetsDir: "static",
      emptyOutDir: false,
      ssrEmitAssets: true,
      rollupOptions: {
        input: ["./app/styles/style.css"],
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === "style.css") return "styles/style.css";
            return assetInfo.name ?? "";
          },
        },
      },
    },

    ssr: {
      target: "node",
      external: [
        "unified",
        "@mdx-js/mdx",
        "satori",
        "@resvg/resvg-js",
        "feed",
        "budoux",
      ],
    },
  };
});
