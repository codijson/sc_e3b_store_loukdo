import axios from "axios";
import * as xlsx from "xlsx";

// Use the proxy path for local development, or direct export link for server environments
const EXCEL_URL = "/api/sheets";
// const EXCEL_URL = 'https://docs.google.com/spreadsheets/d/1PvI0SQRZQ98P1-KycLABgriUFfjghVSxEzOQJ6-a0rs/export?format=xlsx'

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
    const response = await axios.get(EXCEL_URL, { responseType: "arraybuffer" });
    const workbook = xlsx.read(response.data, { type: "buffer" });

    // Assumes your table is on the first sheet (named "localize" or whichever is first)
    const sheetName = workbook.SheetNames[0];
    if (!sheetName) {
      throw new Error("Workbook contains no sheets");
    }

    const sheet = workbook.Sheets[sheetName];
    if (!sheet) {
      throw new Error(`Sheet "${sheetName}" not found`);
    }

    const rows = xlsx.utils.sheet_to_json<Record<string, any>>(sheet);
    const locales = createEmptyLocales();

    rows.forEach(row => {
      const key = row["Key"];
      if (!key) return;

      Object.entries(languageMap).forEach(([colName, langCode]) => {
        const translation = row[colName];

        if (translation !== undefined) {
          setNestedProperty(locales[langCode], String(key), translation);
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
