export type Job = {
  id: string;
  title: string;
  blurb: string;
  datePosted: string;
  employmentType: string;
  workMode: string;
  category: string;
  level: string;
};

// Publish the sheet via File > Share > Publish to web > select the jobs
// tab > CSV, then paste the resulting URL here (or set
// NEXT_PUBLIC_JOBS_SHEET_CSV_URL in the environment so it can change
// without a code edit). Expected header row (case-insensitive):
// id, title, blurb, datePosted, employmentType, workMode, category, level, status
// A row is shown only when status is "open" (blank/anything else is
// treated as closed, so leaving the column empty hides a row safely).
// category and level are optional — leave either blank to skip that tag.
const SHEET_CSV_URL = process.env.NEXT_PUBLIC_JOBS_SHEET_CSV_URL ?? "";

// Lets callers avoid flashing the fallback jobs before the real sheet data
// arrives — when a sheet is configured, its data always wins, so there's no
// point rendering (and then instantly replacing) the fallback first.
export const isJobsSheetConfigured = SHEET_CSV_URL.length > 0;

// One line per CSV record, respecting quoted fields that contain commas,
// newlines or escaped quotes ("") — a hand-rolled parser is enough here
// since the sheet is simple tabular data and pulling in a CSV library for
// this alone isn't worth the dependency.
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

// Normalizes the sheet's date column to ISO (YYYY-MM-DD) so downstream code
// (the "27d ago" badge, JobPosting SEO data) can rely on new Date(...)
// parsing it unambiguously. JS's Date constructor reads a bare "DD-MM-YYYY"
// or "DD/MM/YYYY" as US-style "MM-DD-YYYY", silently producing the wrong
// date (or Invalid Date once the day exceeds 12) — exactly the bug seen
// with rows like "21-09-2026". Already-ISO values pass through untouched.
function normalizeDatePosted(raw: string): string {
  const value = raw.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  const dmy = value.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (dmy) {
    const [, day, month, year] = dmy;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  return value;
}

function rowsToJobs(rows: string[][]): Job[] {
  if (rows.length < 2) return [];
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const col = (...names: string[]) => {
    for (const name of names) {
      const i = header.indexOf(name.toLowerCase());
      if (i >= 0) return i;
    }
    return -1;
  };

  const idCol = col("id");
  const titleCol = col("title");
  const blurbCol = col("blurb");
  const dateCol = col("dateposted");
  const typeCol = col("employmenttype");
  const modeCol = col("workmode");
  // Accept the common "categoty" typo alongside the correct spelling so a
  // single misspelled header doesn't silently drop the whole column.
  const categoryCol = col("category", "categoty");
  const levelCol = col("level");
  const statusCol = col("status");

  const jobs: Job[] = [];
  for (const cells of rows.slice(1)) {
    const status = statusCol >= 0 ? (cells[statusCol] ?? "").trim().toLowerCase() : "open";
    if (status !== "open") continue;

    const title = titleCol >= 0 ? (cells[titleCol] ?? "").trim() : "";
    if (!title) continue;

    const id =
      idCol >= 0 && cells[idCol]?.trim()
        ? cells[idCol].trim()
        : title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    jobs.push({
      id,
      title,
      blurb: blurbCol >= 0 ? (cells[blurbCol] ?? "").trim() : "",
      datePosted: dateCol >= 0 ? normalizeDatePosted(cells[dateCol] ?? "") : "",
      employmentType: typeCol >= 0 ? (cells[typeCol] ?? "").trim() || "FULL_TIME" : "FULL_TIME",
      workMode: modeCol >= 0 ? (cells[modeCol] ?? "").trim() || "On-site" : "On-site",
      category: categoryCol >= 0 ? (cells[categoryCol] ?? "").trim() : "",
      level: levelCol >= 0 ? (cells[levelCol] ?? "").trim() : "",
    });
  }
  return jobs;
}

export async function fetchJobsFromSheet(): Promise<Job[] | null> {
  if (!SHEET_CSV_URL) return null;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(SHEET_CSV_URL, { signal: controller.signal, cache: "no-store" });
    clearTimeout(timeout);
    if (!res.ok) return null;

    const text = await res.text();
    const jobs = rowsToJobs(parseCsv(text));
    return jobs.length > 0 ? jobs : [];
  } catch {
    return null;
  }
}
