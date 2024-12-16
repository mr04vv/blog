import path from "node:path";
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
import { defineConfig, normalizePath } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
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
        providerImportSource: "./app/lib/mdxComponents",
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

      // 記事内の画像を特定のディレクトリに吐き出すように
      // 参照：　https://github.com/p1ass/blog/blob/d5af3142bc4338d0a3164a9a1e28ef3812774fa7/vite.config.ts#L56-L80
      viteStaticCopy({
        targets: [
          {
            src: [
              "./app/assets/**/*.png",
              "./app/assets/**/*.jpg",
              "./app/assets/**/*.jpeg",
              "./app/assets/**/*.webp",
              "./app/assets/**/*.gif",
            ],
            dest: "assets",
            rename: (
              _fileName: string,
              _fileExtension: string,
              fullPath: string,
            ) => {
              const destPath = normalizePath(
                path.relative(__dirname, fullPath).replace(/^app\/.*\//, ""),
              );
              return destPath;
            },
            overwrite: false,
          },
          {
            src: ["./app/theme.ts"],
            dest: "static",
            rename: (
              _fileName: string,
              _fileExtension: string,
              fullPath: string,
            ) => {
              const destPath = normalizePath(
                path.relative(__dirname, fullPath).replace(/^app\//, ""),
              );
              return destPath;
            },
            overwrite: false,
          },
        ],
      }),
    ],
    build: {
      assetsDir: "static",
      emptyOutDir: false,
      ssrEmitAssets: true,
      rollupOptions: {
        input: ["./app/styles/style.css", "./app/theme.ts"],
        output: {
          entryFileNames: "static/[name].js",
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === "style.css") return "styles/style.css";
            if (assetInfo.name === "theme.ts") return "static/theme.js";
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
        "jsdom",
        "lodash",
        "motion",
      ],
    },
    server: {
      host: "0.0.0.0",
    },
  };
});
