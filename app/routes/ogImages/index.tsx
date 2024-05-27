import { Resvg } from "@resvg/resvg-js";
import { createRoute } from "honox/factory";
import satori from "satori";

export default createRoute(
  // onlySSG(),
  async (c) => {
    const slug = c.req.param("slug");
    if (slug === ":slug") {
      c.status(404);
      return c.text("Not Found");
    }

    const notoSansBold = await loadGoogleFont({
      family: "Noto Sans JP",
      weight: 600,
    });

    const svg = await satori(
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            padding: "2rem",
            backgroundColor: "#fbcfe8",
            boxSizing: "border-box",
          },
          children: [
            {
              type: "div",
              props: {
                style: {
                  flex: 1,
                  alignSelf: "stretch",
                  background: "white",
                  borderRadius: "2rem",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  boxSizing: "border-box",
                },
                children: [
                  {
                    type: "div",
                    props: {
                      style: {
                        flex: 1,
                        color: "#222",
                        fontSize: "5.2rem",
                        paddingInline: "1rem",
                        boxSizing: "border-box",
                        justifySelf: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        fontFamily: "Noto Sans JP",
                        flexWrap: "wrap",
                        fontWeight: 600,
                        fontFeatureSettings: "palt",
                      },
                      children: [1, 2].map(() => ({
                        type: "span",
                        props: {
                          style: {
                            display: "block",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          },
                          children: "あり得ないほど長いタイトル",
                        },
                      })),
                    },
                  },
                  {
                    type: "div",
                    props: {
                      style: {
                        flexBasis: "20vh",
                        color: "#444",
                        fontSize: "2.8em",
                        boxSizing: "border-box",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: 600,
                        fontFamily: "Noto Sans JP",
                        fontFeatureSettings: "palt",
                      },
                      children: ["もりのブログ"].filter(Boolean),
                    },
                  },
                ],
              },
            },
          ],
        },
      } as any,
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

    c.header("Content-Type", "image/png");
    return c.body(body);
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
      // construct user agent to get TTF font
      "User-Agent":
        "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
    },
  }).then((res) => res.text());

  // Get the font URL from the CSS text
  const fontUrl = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  )?.[1];

  if (!fontUrl) {
    throw new Error("Could not find font URL");
  }

  const res = await fetch(fontUrl);
  return res.arrayBuffer();
}
