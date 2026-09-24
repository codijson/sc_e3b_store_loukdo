/**
 * TermsOfServiceDocument
 * -----------------------
 * Structured description of the Terms of Service document — see the doc
 * comment on TermsDocument.ts for why this is modelled as sections of
 * subsections rather than hard-coded markup.
 */

import type { TermsSection } from "./TermsDocument";

export class TermsOfServiceDocument {
  private constructor(public readonly sections: TermsSection[]) {}

  static build(): TermsOfServiceDocument {
    return new TermsOfServiceDocument([
      {
        id: "the-service",
        titleKey: "tos.s1Title",
        subsections: [
          { paragraphs: ["tos.s1Intro"] },
          {
            table: {
              headerKeys: ["tos.tModule", "tos.tWhatItDoes"],
              rows: [
                ["tos.s1RowInboxName", "tos.s1RowInboxDesc"],
                ["tos.s1RowOrdersName", "tos.s1RowOrdersDesc"],
                ["tos.s1RowCatalogName", "tos.s1RowCatalogDesc"],
                ["tos.s1RowReportingName", "tos.s1RowReportingDesc"],
                ["tos.s1RowApiName", "tos.s1RowApiDesc"],
              ],
            },
          },
        ],
      },
      {
        id: "usage-limits",
        titleKey: "tos.s2Title",
        subsections: [
          {
            paragraphs: ["tos.s2_1", "tos.s2_2", "tos.s2_3", "tos.s2_4"],
          },
        ],
      },
      {
        id: "availability-support",
        titleKey: "tos.s3Title",
        subsections: [
          {
            paragraphs: [
              "tos.s3_1",
              "tos.s3_2",
              // "tos.s3_3",
              "tos.s3_4Intro",
            ],
          },
          {
            table: {
              headerKeys: ["tos.tPlan", "tos.tChannels", "tos.tTargetResponse"],
              rows: [
                ["tos.s3RowBusinessName", "tos.s3RowBusinessChannels", "tos.s3RowBusinessTarget"],
              ],
            },
          },
          {
            paragraphs: [
              "tos.s3_5",
              // "tos.s3_6"
            ],
          },
        ],
      },
      {
        id: "your-data",
        titleKey: "tos.s4Title",
        subsections: [
          {
            paragraphs: [
              "tos.s4_1",
              "tos.s4_2",
              "tos.s4_3",
              "tos.s4_4",
              "tos.s4_5",
              // "tos.s4_6",
              "tos.s4_7",
            ],
          },
        ],
      },
      {
        id: "security",
        titleKey: "tos.s5Title",
        subsections: [
          {
            paragraphs: ["tos.s5_1", "tos.s5_2", "tos.s5_3", "tos.s5_4"],
          },
        ],
      },
      {
        id: "integrations",
        titleKey: "tos.s6Title",
        subsections: [
          {
            paragraphs: ["tos.s6_1", "tos.s6_2", "tos.s6_3"],
          },
        ],
      },
      {
        id: "changes",
        titleKey: "tos.s7Title",
        subsections: [
          {
            paragraphs: ["tos.s7_1", "tos.s7_2", "tos.s7_3"],
          },
        ],
      },
    ]);
  }
}
