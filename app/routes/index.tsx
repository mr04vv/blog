import { css } from "hono/css";
import { createRoute } from "honox/factory";
import { blogName } from "../constants";

const className = css`
  font-family: sans-serif;
`;

export default createRoute((c) => {
  return c.render(
    <div class={className}>
      <h1>{blogName}</h1>
    </div>,
  );
});
