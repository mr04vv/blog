import {} from "hono";
import type { Frontmatter } from "./types/frontmatter";

type Head = {
  title?: string;
  frontmatter?: Frontmatter;
  entryName?: string;
};

declare module "hono" {
  interface Env {
    // biome-ignore lint/complexity/noBannedTypes: Using empty object type for Hono Variables
    Variables: {};
    // biome-ignore lint/complexity/noBannedTypes: Using empty object type for Hono Bindings
    Bindings: {};
  }
  interface ContextRenderer {
    // biome-ignore lint/style/useShorthandFunctionType: Explicit function type for clarity
    (
      content: string | Promise<string>,
      head?: Head,
    ): Response | Promise<Response>;
  }
}
