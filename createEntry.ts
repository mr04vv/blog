import { promises } from "node:fs";
import { $ } from "bun";
import prompts from "prompts";

const result = await prompts(
  [
    {
      type: "text",
      name: "entryTitle",
      message: "記事のタイトルを入力してください:",
    },
    {
      type: "text",
      name: "entryPath",
      message: "記事のuriを入力してください:",
    },
  ],
  {
    onCancel: () => {
      process.exit(0);
    },
  },
);

const entryTitle = result.entryTitle as string;
const entryPath = result.entryPath as string;

// yyyyMMddの形式で今日の日付を取得
const date = new Date();
const yyyyMM = date
  .toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
  })
  .replace("/", "");
const yyyyMMdd = date
  .toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  .replaceAll("/", "");

const { exitCode } = await $`ls ./app/articles/${yyyyMM}`.quiet();

// MEMO: 今日の日付のディレクトリを生成
if (exitCode !== 0) {
  await $`mkdir ./app/articles/${yyyyMM}`;
  await $`mkdir ./app/articles/${yyyyMM}/${yyyyMMdd}`;
} else {
  const { exitCode } = await $`ls ./app/articles/${yyyyMM}/${yyyyMMdd}`.quiet();
  if (exitCode !== 0) {
    await $`mkdir ./app/articles/${yyyyMM}/${yyyyMMdd}`;
  }
}

// MEMO: ファイルを生成
await $`touch ./app/articles/${yyyyMM}/${yyyyMMdd}/${entryPath}.mdx`;

const frontMatter = `---
title: ${entryTitle}
date: ${date.toISOString()}
description: 
iconUrl: 
---
`;

await promises.writeFile(
  `./app/articles/${yyyyMM}/${yyyyMMdd}/${entryPath}.mdx`,
  frontMatter,
);

await $`echo articles/${yyyyMM}/${yyyyMMdd}/${entryPath}.mdx is created.`;

await $`code ./app/articles/${yyyyMM}/${yyyyMMdd}/${entryPath}.mdx`;
