import { createRoute } from "honox/factory";

export default createRoute((c) => {
  const robotsTxt = `User-agent: * 
  Allow: /`;
  return c.text(robotsTxt, 200);
});
