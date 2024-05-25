import {} from "hono";

type Head = {
  title?: string;
};

declare module "hono" {
  interface Env {
    Variables: object;
    Bindings: object;
  }
  type ContextRenderer = (
    content: string | Promise<string>,
    head?: Head
  ) => Response | Promise<Response>;
}
