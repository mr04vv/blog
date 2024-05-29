import type { MDXComponents } from "mdx/types";
import { ArticleImage } from "./Image";

export function useMDXComponents(): MDXComponents {
  const components = {
    img: ArticleImage,
  };
  return components;
}
