/**
 * TermsContent
 * ------------
 * Structured description of the Terms & Conditions document so the Vue
 * page only has to iterate over data, instead of hard-coding markup for
 * every one of the 16 sections. Keeping this as a class (with a static
 * factory) lets us validate/extend the document shape in one place.
 */

export interface TermsListItem {
  key: string;
}

/**
 * Generic N-column table spec. `headerKeys` are i18n keys for the column
 * headings; each entry in `rows` is one row, holding an i18n key per
 * column (same length/order as `headerKeys`). Used for anything beyond
 * the simple 2-column term/definition table (module tables, plan/support
 * tables, retention tables, etc.).
 */
export interface TermsTable {
  headerKeys: string[];
  rows: string[][];
}

export interface TermsSubsection {
  titleKey?: string;
  introKey?: string;
  paragraphs?: string[];
  list?: string[];
  outroKey?: string;
  table?: TermsTable;
}

export interface TermsSection {
  id: string;
  titleKey: string;
  subsections: TermsSubsection[];
}

export class TermsDocument {
  private constructor(public readonly sections: TermsSection[]) {}

  static build(): TermsDocument {
    return new TermsDocument([
      {
        id: "who-we-are",
        titleKey: "terms.s1Title",
        subsections: [
          {
            paragraphs: ["terms.s1Body1", "terms.s1Body2", "terms.s1Body3", "terms.s1Body4"],
          },
        ],
      },
      {
        id: "definitions",
        titleKey: "terms.s2Title",
        subsections: [
          {
            list: [
              "terms.s2Seller",
              "terms.s2SellerDef",
              "terms.s2Buyer",
              "terms.s2BuyerDef",
              "terms.s2Content",
              "terms.s2ContentDef",
              "terms.s2ThirdParty",
              "terms.s2ThirdPartyDef",
              "terms.s2Account",
              "terms.s2AccountDef",
            ],
          },
        ],
      },
      {
        id: "eligibility",
        titleKey: "terms.s3Title",
        subsections: [
          {
            introKey: "terms.s3Intro",
            list: ["terms.s3a", "terms.s3b", "terms.s3c", "terms.s3d", "terms.s3e"],
            outroKey: "terms.s3Outro",
          },
        ],
      },
      {
        id: "your-account",
        titleKey: "terms.s4Title",
        subsections: [
          {
            paragraphs: ["terms.s4_1", "terms.s4_2", "terms.s4_3", "terms.s4_4", "terms.s4_5"],
          },
        ],
      },
      {
        id: "what-loukdo-is",
        titleKey: "terms.s5Title",
        subsections: [
          {
            paragraphs: ["terms.s5_1", "terms.s5_2", "terms.s5_3", "terms.s5_4", "terms.s5_5"],
          },
        ],
      },
      {
        id: "seller-obligations",
        titleKey: "terms.s6Title",
        subsections: [
          {
            introKey: "terms.s6Intro",
            list: [
              "terms.s6a",
              "terms.s6b",
              "terms.s6c",
              "terms.s6d",
              "terms.s6e",
              "terms.s6f",
              "terms.s6g",
              "terms.s6h",
            ],
            outroKey: "terms.s6Outro",
          },
        ],
      },
      {
        id: "prohibited",
        titleKey: "terms.s7Title",
        subsections: [
          { introKey: "terms.s7Intro" },
          {
            titleKey: "terms.s7g1Title",
            list: [
              "terms.s7g1_1",
              "terms.s7g1_2",
              "terms.s7g1_3",
              "terms.s7g1_4",
              "terms.s7g1_5",
              "terms.s7g1_6",
              "terms.s7g1_7",
              "terms.s7g1_8",
            ],
          },
          {
            titleKey: "terms.s7g2Title",
            list: ["terms.s7g2_1", "terms.s7g2_2", "terms.s7g2_3", "terms.s7g2_4"],
          },
          {
            titleKey: "terms.s7g3Title",
            list: ["terms.s7g3_1", "terms.s7g3_2", "terms.s7g3_3", "terms.s7g3_4"],
          },
          {
            titleKey: "terms.s7g4Title",
            list: ["terms.s7g4_1", "terms.s7g4_2", "terms.s7g4_3", "terms.s7g4_4", "terms.s7g4_5"],
          },
          { paragraphs: ["terms.s7Outro"] },
        ],
      },
      {
        id: "intellectual-property",
        titleKey: "terms.s8Title",
        subsections: [
          {
            paragraphs: ["terms.s8_1", "terms.s8_2", "terms.s8_3", "terms.s8_4"],
          },
        ],
      },
      {
        id: "third-party",
        titleKey: "terms.s9Title",
        subsections: [{ paragraphs: ["terms.s9_1", "terms.s9_2", "terms.s9_3"] }],
      },
      {
        id: "disclaimers",
        titleKey: "terms.s10Title",
        subsections: [
          {
            introKey: "terms.s10Intro",
            paragraphs: ["terms.s10_1", "terms.s10_2", "terms.s10_3", "terms.s10_4"],
          },
        ],
      },
      {
        id: "liability",
        titleKey: "terms.s11Title",
        subsections: [
          {
            paragraphs: ["terms.s11_1", "terms.s11_2", "terms.s11_3", "terms.s11_4"],
          },
        ],
      },
      {
        id: "indemnity",
        titleKey: "terms.s12Title",
        subsections: [
          {
            introKey: "terms.s12Intro",
            list: [
              "terms.s12a",
              "terms.s12b",
              "terms.s12c",
              "terms.s12d",
              "terms.s12e",
              "terms.s12f",
            ],
          },
        ],
      },
      {
        id: "suspension",
        titleKey: "terms.s13Title",
        subsections: [
          { paragraphs: ["terms.s13_1"] },
          {
            introKey: "terms.s13_2Intro",
            list: ["terms.s13_2a", "terms.s13_2b", "terms.s13_2c", "terms.s13_2d", "terms.s13_2e"],
          },
          { paragraphs: ["terms.s13_3", "terms.s13_4"] },
        ],
      },
      {
        id: "governing-law",
        titleKey: "terms.s14Title",
        subsections: [
          {
            paragraphs: [
              "terms.s14_1",
              "terms.s14_2",
              "terms.s14_3",
              // "terms.s14_4"
            ],
          },
        ],
      },
      {
        id: "general",
        titleKey: "terms.s15Title",
        subsections: [
          {
            paragraphs: [
              "terms.s15_1",
              // "terms.s15_2",
              "terms.s15_3",
              "terms.s15_4",
              "terms.s15_5",
              "terms.s15_6",
              "terms.s15_7",
              // "terms.s15_8",
            ],
          },
        ],
      },
      {
        id: "contact",
        titleKey: "terms.s16Title",
        subsections: [{ paragraphs: ["terms.s16Body"] }],
      },
    ]);
  }
}
