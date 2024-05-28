import { Style } from "hono/css";
import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import { Script } from "honox/server";
import styles from "../styles/style.css?url";

export default jsxRenderer(({ children, title, entryName }) => {
  const pageTitle = title ? `${title} - もりのブログ` : "もりのブログ";
  const c = useRequestContext();
  const current = c.req.url;
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:url" content={current} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta
          property="og:description"
          content="日常や技術に関して気まぐれに投稿する日記"
        />
        <meta property="og:site_name" content="もりのブログ" />
        <meta property="og:image" content={`/ogps/${entryName}.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@mooriii" />
        <meta name="twitter:title" content={pageTitle} />
        <meta
          name="twitter:description"
          content="日常や技術に関して気まぐれに投稿する日記"
        />
        <meta name="twitter:image" content={`/ogps/${entryName}.png`} />
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <Script src="/app/client.ts" async />
        <Style />
        {import.meta.env.PROD ? (
          <link href="/styles/style.css" rel="stylesheet" />
        ) : (
          <link href={styles} rel="stylesheet" />
        )}
      </head>
      <body class={"flex justify-center"}>
        <main class={"max-w-2xl w-screen px-4"}>{children}</main>
      </body>
    </html>
  );
});
