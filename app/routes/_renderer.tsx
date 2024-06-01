import { Style } from "hono/css";
import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import { Script } from "honox/server";
import { Header } from "../components/header";
import { blogName } from "../constants";
import ThemeButton from "../islands/button";
import styles from "../styles/style.css?url";

export default jsxRenderer(({ children, title, entryName, frontmatter }) => {
  const pageTitle = title ? `${title} - ${blogName}` : blogName;
  const ogpPath = title ? `/ogps/${entryName}.png` : "/ogp.png";
  const c = useRequestContext();
  const currentUrl = c.req.url;
  const description =
    frontmatter?.description ?? "日常や技術に関して気まぐれに投稿する日記";

  return (
    <html lang="ja">
      <head>
        <meta http-equiv="content-language" content="ja" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={blogName} />
        <meta
          property="og:image"
          content={`https://blog.mooriii.com${ogpPath}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@mooriii" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={`https://blog.mooriii.com${ogpPath}`}
        />
        <title>{pageTitle}</title>
        {import.meta.env.PROD ? (
          <link rel="icon" href="https://blog.mooriii.com/favicon.ico" />
        ) : (
          <link rel="icon" href="/favicon.ico" />
        )}
        {import.meta.env.PROD ? (
          <script src="/static/theme.js" />
        ) : (
          <script src="/app/theme.ts" />
        )}
        <Script src="/app/client.ts" async />
        <Style />
        {import.meta.env.PROD ? (
          <link href="/styles/style.css" rel="stylesheet" />
        ) : (
          <link href={styles} rel="stylesheet" />
        )}
      </head>
      <body
        class={
          "flex flex-col items-center mb-2 bg-[#fbf9f2] dark:bg-zinc-800 mx-2"
        }
      >
        <Header>
          <ThemeButton />
        </Header>
        <main class={"max-w-[700px] w-screen px-6 mt-6"}>{children}</main>
      </body>
    </html>
  );
});
