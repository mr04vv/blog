import type { MDXComponents } from "mdx/types";
import { ArticleImage } from "./articleImage";
import { ExternalOgp } from "./externalOgp";
import { TitleIcon } from "./titleIcon";

export function useMDXComponents(): MDXComponents {
  const components = {
    img: ArticleImage,
    ExternalOgp: ExternalOgp,
    TitleIcon: TitleIcon,
  };
  return components;
}
