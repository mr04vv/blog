// "../../articles/hogehoge/fugafuga/aaa.mdx" から aaaの部分を取り出す
export const getEntryNameFromPath = (path: string) => {
  const match = path.match(/([^/]+)\.mdx$/);
  if (!match) {
    throw new Error(`Invalid path: ${path}`);
  }
  return match[1];
};
