export type LifePhoto = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  featured: boolean;
};

// The whole jobs + photos spreadsheet is published to web once (File > Share
// > Publish to web > Entire document > CSV), which gives one base URL. Each
// tab's data is then reachable by appending its own &gid=<tab-id> — Google
// assigns a stable gid per tab that survives renames, so these numbers don't
// need to change unless a tab is deleted and recreated.
const BASE_CSV_URL = process.env.NEXT_PUBLIC_LIFE_PHOTOS_SHEET_CSV_URL ?? "";

const CATEGORY_GIDS = {
  yercaud: "1966915589",
  "team-outing": "811763278",
  celebrations: "1088346536",
  cricket: "963839564",
} as const;

export type LifePhotoCategory = keyof typeof CATEGORY_GIDS;

export const isLifePhotosSheetConfigured = BASE_CSV_URL.length > 0;

// Reuses the same hand-rolled CSV parser approach as jobsSheet.ts — handles
// quoted fields with embedded commas, since captions can contain them.
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && next === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

// A Google Drive "share" link (.../file/d/FILE_ID/view) renders an HTML
// preview page, not a raw image — this rewrites it to Drive's direct-image
// endpoint so it can be used as a normal <img>/next/image src.
function toDirectImageUrl(driveLink: string): string | null {
  const match = driveLink.match(/\/file\/d\/([^/]+)/);
  if (!match) return null;
  const fileId = match[1];
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`;
}

function rowsToPhotos(rows: string[][], categoryId: string): LifePhoto[] {
  if (rows.length < 2) return [];
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const col = (...names: string[]) => {
    for (const name of names) {
      const i = header.indexOf(name.toLowerCase());
      if (i >= 0) return i;
    }
    return -1;
  };

  const urlCol = col("imageurl", "imageURL");
  const captionCol = col("caption");
  // The sheet's featured column sometimes has a blank header (just a
  // trailing comma) rather than the literal word "featured" — fall back to
  // the column right after caption when no header name matches.
  const featuredCol = col("featured") >= 0 ? col("featured") : captionCol >= 0 ? captionCol + 1 : -1;

  const photos: LifePhoto[] = [];
  let index = 0;
  for (const cells of rows.slice(1)) {
    const driveLink = urlCol >= 0 ? (cells[urlCol] ?? "").trim() : "";
    if (!driveLink) continue;

    // Video files (.mp4 etc.) sometimes end up in these tabs alongside
    // photos — skip them here since the gallery only renders images.
    if (/\.(mp4|mov|webm)(\?|$)/i.test(driveLink)) continue;

    const src = toDirectImageUrl(driveLink);
    if (!src) continue;

    index += 1;
    const caption = captionCol >= 0 ? (cells[captionCol] ?? "").trim() : "";
    const featured = featuredCol >= 0 ? (cells[featuredCol] ?? "").trim().toLowerCase() === "yes" : false;

    photos.push({
      id: `${categoryId}-${index}`,
      src,
      alt: caption || `Avenza ${categoryId} photo`,
      caption,
      featured,
    });
  }
  return photos;
}

async function fetchCategory(categoryId: LifePhotoCategory): Promise<LifePhoto[]> {
  const gid = CATEGORY_GIDS[categoryId];
  const url = `${BASE_CSV_URL}${BASE_CSV_URL.includes("?") ? "&" : "?"}output=csv&gid=${gid}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, { signal: controller.signal, cache: "no-store" });
    clearTimeout(timeout);
    if (!res.ok) return [];
    const text = await res.text();
    return rowsToPhotos(parseCsv(text), categoryId);
  } catch {
    clearTimeout(timeout);
    return [];
  }
}

export async function fetchAllLifePhotos(): Promise<Record<LifePhotoCategory, LifePhoto[]> | null> {
  if (!isLifePhotosSheetConfigured) return null;

  const categories = Object.keys(CATEGORY_GIDS) as LifePhotoCategory[];
  const results = await Promise.all(categories.map((c) => fetchCategory(c)));

  const byCategory = {} as Record<LifePhotoCategory, LifePhoto[]>;
  categories.forEach((c, i) => {
    byCategory[c] = results[i];
  });
  return byCategory;
}
