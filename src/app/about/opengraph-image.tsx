import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/ogImage";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "About Avenza",
    title: "One Ecosystem, One Delivery Engine, One Accountable Partner",
  });
}
