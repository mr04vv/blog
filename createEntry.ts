import { promises } from "node:fs";
import { $ } from "bun";
import prompts from "prompts";

const result = await prompts([
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
]);

const entryTitle = result.entryTitle as string;
const entryPath = result.entryPath as string;

// YYYYmmddの形式で今日の日付を取得
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const formattedMonth = month < 10 ? `0${month}` : month;
const formattedDay = day < 10 ? `0${day}` : day;
const YYYYmm = `${year}${formattedMonth}`;
const YYYYmmdd = `${year}${formattedMonth}${formattedDay}`;

const { exitCode } = await $`ls ./app/articles/${YYYYmm}`.quiet();

// MEMO: 今日の日付のディレクトリを生成
if (exitCode !== 0) {
  await $`mkdir ./app/articles/${YYYYmm}`;
  await $`mkdir ./app/articles/${YYYYmm}/${YYYYmmdd}`;
} else {
  const { exitCode } = await $`ls ./app/articles/${YYYYmm}/${YYYYmmdd}`.quiet();
  if (exitCode !== 0) {
    await $`mkdir ./app/articles/${YYYYmm}/${YYYYmmdd}`;
  }
}

// MEMO: ファイルを生成
await $`touch ./app/articles/${YYYYmm}/${YYYYmmdd}/${entryPath}.mdx`;

const frontMatter = `---
title: ${entryTitle}
date: ${today.toISOString()}
description: 
---
`;

await promises.writeFile(
  `./app/articles/${YYYYmm}/${YYYYmmdd}/${entryPath}.mdx`,
  frontMatter,
);

await $`echo articles/${YYYYmm}/${YYYYmmdd}/${entryPath}.mdx is created.`;

await $`code ./app/articles/${YYYYmm}/${YYYYmmdd}/${entryPath}.mdx`;
