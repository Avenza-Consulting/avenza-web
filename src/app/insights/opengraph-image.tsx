import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/ogImage";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Insights",
    title: "Thinking from People Who Deliver Banking Programmes",
  });
}
