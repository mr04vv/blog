import { Resvg } from "@resvg/resvg-js";
import { model as jaModel } from "budoux/dist/data/models/ja";
import { Parser } from "budoux/dist/parser";
import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";
import satori from "satori";
import { blogName } from "../../constants";
import { getPostByEntryName, getPosts } from "../../lib/posts";

const parser = new Parser(jaModel);

export default createRoute(
  ssgParams(() => {
    const posts = getPosts();
    return posts.map((post) => ({
      slug: post.entryName,
      title: "aaa",
    }));
  }),
  async (c) => {
    const slug = c.req.param("slug");
    if (slug === ":slug") {
      c.status(404);
      return c.text("Not Found");
    }

    const post = getPostByEntryName(slug);

    const titleLen = post?.frontmatter.title.length ?? 0;

    const isBlamePost =
      post?.frontmatter.title === "他責は過去に、自責は未来に";
    const splitedTitle = isBlamePost
      ? ["他責は過去に", "自責は未来に"]
      : parser.parse(post?.frontmatter.title ?? "");

    const notoSansBold = await loadGoogleFont({
      family: "Noto Sans JP",
      weight: 600,
    });

    const svg = await satori(
      <div tw={"bg-[#FFCB67] w-full h-full flex p-9"}>
        <div
          tw={
            "bg-[#FFFBEC] rounded-3xl border-solid w-full flex flex-col justify-end"
          }
        >
          <div tw={"flex w-full flex-1 items-center mt-10 px-34"}>
            <div
              tw={`flex justify-center  text-[${
                // 要調整
                titleLen > 20 ? 4 : 4.8
              }rem] flex-wrap`}
            >
              {splitedTitle.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
          <div
            tw={
              "flex px-18 mb-10 items-center justify-between w-full text-[#444444]"
            }
          >
            <div tw="text-4xl flex items-center">
              <img
                alt="avatar"
                tw="rounded-full mr-4 w-18 h-18"
                src="https://avatars.githubusercontent.com/u/24749358?v=4&s=100"
              />
              {blogName}
            </div>
            <h1
              style={{
                fontWeight: 600,
                fontFamily: "Noto Sans JP",
              }}
            >
              blog.mooriii.com
            </h1>
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "NotoSansJP",
            data: notoSansBold,
            weight: 600,
            style: "normal",
          },
        ],
      },
    );

    const body = new Resvg(svg).render().asPng();
    const bodyArray = new Uint8Array(body);
    c.header("Content-Type", "image/png");
    return c.body(bodyArray.buffer);
  },
);

function buildGoogleFontUrl({
  family,
  weight,
  text,
  display,
}: {
  family: string;
  weight?: number;
  text?: string;
  display?: string;
}) {
  const params: Record<string, string> = {
    family: `${encodeURIComponent(family)}${weight ? `:wght@${weight}` : ""}`,
  };

  if (text) {
    params.text = text;
  } else {
    params.subset = "latin";
  }

  if (display) {
    params.display = display;
  }

  return `https://fonts.googleapis.com/css2?${Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&")}`;
}

async function loadGoogleFont({
  family,
  weight,
  text,
}: {
  family: string;
  weight?: number;
  text?: string;
}) {
  const url = buildGoogleFontUrl({ family, weight, text });

  const css = await fetch(`${url}`, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
    },
  }).then((res) => res.text());

  const fontUrl = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  )?.[1];

  if (!fontUrl) {
    throw new Error("Could not find font URL");
  }

  const res = await fetch(fontUrl);
  const buffer = await res.arrayBuffer();

  if (buffer instanceof ArrayBuffer) {
    return buffer;
  }
  const arrayBuffer = new ArrayBuffer(buffer.byteLength);
  const arrayView = new Uint8Array(arrayBuffer);
  return arrayView.buffer.slice(0);
}
