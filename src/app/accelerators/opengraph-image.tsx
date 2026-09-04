import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/ogImage";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Accelerator Lab · Our IP",
    title: "Proprietary Accelerators, Built from Real Programmes",
  });
}
