import type { MDXComponents } from "mdx/types";
import { AnchorLink } from "./anchorLink";
import { ArticleImage } from "./articleImage";
import { ExternalOgp } from "./externalOgp";

export function useMDXComponents(): MDXComponents {
  const components = {
    img: ArticleImage,
    ExternalOgp: ExternalOgp,
    a: AnchorLink,
  };
  return components;
}
