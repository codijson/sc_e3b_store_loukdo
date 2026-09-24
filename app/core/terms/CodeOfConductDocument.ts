/**
 * CodeOfConductDocument
 * ----------------------
 * Structured description of the User Code of Conduct document — see the
 * doc comment on TermsDocument.ts for why this is modelled as sections of
 * subsections rather than hard-coded markup.
 */

import type { TermsSection } from "./TermsDocument";

export class CodeOfConductDocument {
  private constructor(public readonly sections: TermsSection[]) {}

  static build(): CodeOfConductDocument {
    return new CodeOfConductDocument([
      {
        id: "why-this-exists",
        titleKey: "conduct.introTitle",
        subsections: [
          {
            paragraphs: ["conduct.introBody1", "conduct.introBody2", "conduct.introBody3"],
          },
        ],
      },
      {
        id: "sell-honestly",
        titleKey: "conduct.s1Title",
        subsections: [
          {
            titleKey: "conduct.s1DoTitle",
            list: [
              "conduct.s1Do1",
              "conduct.s1Do2",
              "conduct.s1Do3",
              // "conduct.s1Do4",
              "conduct.s1Do5",
              "conduct.s1Do6",
            ],
          },
          {
            titleKey: "conduct.s1DontTitle",
            list: [
              "conduct.s1Dont1",
              "conduct.s1Dont2",
              // "conduct.s1Dont3",
              "conduct.s1Dont4",
              "conduct.s1Dont5",
              "conduct.s1Dont6",
            ],
          },
        ],
      },
      {
        id: "treat-people-with-respect",
        titleKey: "conduct.s2Title",
        subsections: [
          {
            introKey: "conduct.s2Intro",
            titleKey: "conduct.s2ListTitle",
            list: [
              "conduct.s2_1",
              "conduct.s2_2",
              "conduct.s2_3",
              "conduct.s2_4",
              "conduct.s2_5",
              "conduct.s2_6",
            ],
            outroKey: "conduct.s2Outro",
          },
        ],
      },
      {
        id: "respect-privacy",
        titleKey: "conduct.s3Title",
        subsections: [
          {
            introKey: "conduct.s3Intro",
            list: [
              "conduct.s3_1",
              "conduct.s3_2",
              "conduct.s3_3",
              "conduct.s3_4",
              "conduct.s3_5",
              "conduct.s3_6",
              "conduct.s3_7",
            ],
          },
        ],
      },
      {
        id: "message-responsibly",
        titleKey: "conduct.s4Title",
        subsections: [
          {
            list: [
              "conduct.s4_1",
              "conduct.s4_2",
              "conduct.s4_3",
              "conduct.s4_4",
              "conduct.s4_5",
            ],
          },
        ],
      },
      {
        id: "protect-the-platform",
        titleKey: "conduct.s5Title",
        subsections: [
          {
            titleKey: "conduct.s5ListTitle",
            list: [
              "conduct.s5_1",
              "conduct.s5_2",
              "conduct.s5_3",
              "conduct.s5_4",
              "conduct.s5_5",
              "conduct.s5_6",
              "conduct.s5_7",
            ],
            outroKey: "conduct.s5Outro",
          },
        ],
      },
      {
        id: "follow-the-law",
        titleKey: "conduct.s6Title",
        subsections: [
          {
            introKey: "conduct.s6Intro",
            list: [
              "conduct.s6_1",
              "conduct.s6_2",
              "conduct.s6_3",
              "conduct.s6_4",
              "conduct.s6_5",
            ],
            outroKey: "conduct.s6Outro",
          },
        ],
      },
      {
        id: "support-our-team",
        titleKey: "conduct.s7Title",
        subsections: [
          { paragraphs: ["conduct.s7_1", "conduct.s7_2"] },
        ],
      },
      {
        id: "reporting",
        titleKey: "conduct.s8Title",
        subsections: [
          {
            list: ["conduct.s8_1"],
            outroKey: "conduct.s8Outro1",
          },
          { paragraphs: ["conduct.s8Outro2"] },
        ],
      },
      {
        id: "breach-consequences",
        titleKey: "conduct.s9Title",
        subsections: [
          {
            introKey: "conduct.s9Intro",
            table: {
              headerKeys: ["conduct.tLevel", "conduct.tAction"],
              rows: [
                ["conduct.s9Level1", "conduct.s9Action1"],
                ["conduct.s9Level2", "conduct.s9Action2"],
                ["conduct.s9Level3", "conduct.s9Action3"],
                ["conduct.s9Level4", "conduct.s9Action4"],
                ["conduct.s9Level5", "conduct.s9Action5"],
              ],
            },
          },
          { paragraphs: ["conduct.s9Straight", "conduct.s9Appeals"] },
        ],
      },
      {
        id: "changes",
        titleKey: "conduct.s10Title",
        subsections: [{ paragraphs: ["conduct.s10_1", "conduct.s10_2"] }],
      },
    ]);
  }
}
