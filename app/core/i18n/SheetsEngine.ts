// Google Sheets published as CSV (first sheet). No external libraries needed.
const CSV_URL =
  "https://docs.google.com/spreadsheets/d/1PvI0SQRZQ98P1-KycLABgriUFfjghVSxEzOQJ6-a0rs/export?format=csv";
// Proxy path for local development (avoids CORS in the browser)
// const CSV_URL = "/api/sheets";

type LangCode = "en" | "km" | "zh";
type Locales = Record<LangCode, Record<string, any>>;

const languageMap: Record<string, LangCode> = {
  English: "en",
  Khmer: "km",
  Chinese: "zh",
};

let cachedTranslations: Locales | null = null;
let lastFetched = 0;
const CACHE_TTL = 60 * 1000; // Cache for 1 minute

function createEmptyLocales(): Locales {
  return { en: {}, km: {}, zh: {} };
}

export async function fetchRemoteTranslations(): Promise<Locales> {
  const now = Date.now();
  if (cachedTranslations && now - lastFetched < CACHE_TTL) {
    return cachedTranslations;
  }

  try {
    const response = await fetch(CSV_URL);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const text = (await response.text()).replace(/^\uFEFF/, ""); // strip BOM
    const rows = parseCSV(text);

    const header = rows[0];
    if (!header) {
      throw new Error("Sheet is empty");
    }

    const columns = header.map(h => h.trim());
    const keyIndex = columns.indexOf("Key");
    if (keyIndex === -1) {
      throw new Error('Column "Key" not found in sheet header');
    }

    // Map each language column to its index
    const langColumns: { index: number; langCode: LangCode }[] = [];
    Object.entries(languageMap).forEach(([colName, langCode]) => {
      const index = columns.indexOf(colName);
      if (index !== -1) langColumns.push({ index, langCode });
    });

    const locales = createEmptyLocales();

    rows.slice(1).forEach(row => {
      const key = row[keyIndex]?.trim();
      if (!key) return;

      langColumns.forEach(({ index, langCode }) => {
        const translation = row[index];
        if (translation) {
          setNestedProperty(locales[langCode], key, translation);
        }
      });
    });

    cachedTranslations = locales;
    lastFetched = now;
    return locales;
  } catch (error) {
    console.error("Error fetching real-time translations from Google Sheets:", error);
    return cachedTranslations ?? createEmptyLocales();
  }
}

// Minimal CSV parser: handles quoted fields, escaped quotes (""), commas and
// newlines inside quotes, and both \n and \r\n line endings.
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);

    if (inQuotes) {
      if (char === '"') {
        if (text.charAt(i + 1) === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text.charAt(i + 1) === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  // Last row without a trailing newline
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function setNestedProperty(obj: Record<string, any>, path: string, value: any) {
  const parts = path.split(".");
  let curr = obj;
  parts.forEach((part, idx) => {
    if (idx === parts.length - 1) {
      curr[part] = value;
    } else {
      curr[part] = curr[part] || {};
      curr = curr[part];
    }
  });
}
