import type { MDXComponents } from "mdx/types";
import { ArticleImage } from "./articleImage";
import { ExternalOgp } from "./externalOgp";

export function useMDXComponents(): MDXComponents {
  const components = {
    img: ArticleImage,
    ExternalOgp: ExternalOgp,
  };
  return components;
}
