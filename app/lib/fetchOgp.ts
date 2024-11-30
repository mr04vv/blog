import { JSDOM } from "jsdom";
type OgpKey = "title" | "description" | "image" | "url";
type Ogp = {
  title: string;
  description: string;
  image: string;
  url: string;
  imageAlt?: string;
  favicon?: string;
};
export const fetchOgp = async (url: string) => {
  const ogp: Ogp = {
    title: "",
    description: "",
    image: "",
    url: "",
  };
  try {
    const dom = await JSDOM.fromURL(url);
    const host = new URL(url).host;
    ogp.favicon = `https://www.google.com/s2/favicons?domain=${host}&sz=20`;
    const metas = dom.window.document.getElementsByTagName("meta");

    // biome-ignore lint/complexity/noForEach: <explanation>
    Array.from(metas).forEach((v) => {
      const prop = v.getAttribute("property") || v.getAttribute("name");
      if (!prop) return;
      const key = prop.replace("og:", "");
      if (key === "image:alt") ogp.imageAlt = v.getAttribute("content") || "";
      if (!isOgpKey(key)) return;
      ogp[key] = v.getAttribute("content") || "";
    });

    return ogp;
  } catch (e) {
    console.error(e);
  }
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function isOgpKey(key: any): key is OgpKey {
  return (
    key === "title" ||
    key === "image" ||
    key === "description" ||
    key === "url" ||
    key === "alt"
  );
}
