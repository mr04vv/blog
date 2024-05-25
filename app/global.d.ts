import {} from "hono";

type Head = {
  title?: string;
};

declare module "hono" {
  interface Env {
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    Variables: {};
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    Bindings: {};
  }
  interface ContextRenderer {
    // biome-ignore lint/style/useShorthandFunctionType: <explanation>
    (content: string | Promise<string>, head?: Head):
      | Response
      | Promise<Response>;
  }
}
