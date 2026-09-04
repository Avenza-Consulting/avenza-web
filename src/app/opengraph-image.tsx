import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/ogImage";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Core Banking · Temenos · Payments · AI",
    title: "Timely Core Banking Transformations",
  });
}
