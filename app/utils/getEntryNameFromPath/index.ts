// "../../routes/entry/**/*.mdx" から **の部分を取り出す /indexもけす
export const getEntryNameFromPath = (path: string) => {
  const entryName = path.match(/entry\/(.*?)\/[^\/]*\.mdx$/)?.[1];
  if (!entryName) {
    throw new Error(`Failed to get entry name from path: ${path}`);
  }
  return entryName;
};
