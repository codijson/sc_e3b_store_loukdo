/**
 * SeoBuilder
 * ----------
 * Fluent builder for per-page SEO + social sharing metadata. Centralising
 * this avoids repeating useSeoMeta/useHead boilerplate on every page and
 * keeps the Open Graph / Twitter card contract consistent site-wide.
 */

// Open Graph only officially supports raster formats — SVG is not a valid
// og:image:type and most crawlers (Facebook, X, LinkedIn, Slack, iMessage)
// will not render an SVG in a link preview card at all.
export type OgImageType = "image/jpeg" | "image/png" | "image/gif";

export interface SeoImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

export interface SeoPayload {
  title: string;
  description: string;
  path: string;
  image?: SeoImage;
  locale?: string;
  type?: "website" | "article";
  /**
   * Only set this if `image` is actually a PNG/JPG/GIF. Leave it undefined
   * for SVG images — the og:image:type tag will simply be omitted, since
   * there is no valid value to give it.
   */
  ogImageType?: OgImageType;
}

const SITE_NAME = "Loukdo";
const SITE_URL = "https://loukdo.com";
// NOTE: this default is an SVG, which will NOT render in most social link
// previews. Replace with a PNG/JPG (e.g. /og/1.png) before relying on
// og:image for real social sharing.
const DEFAULT_IMAGE: SeoImage = {
  url: `${SITE_URL}/og/home.png`,
  width: 1200,
  height: 630,
  alt: "Loukdo — Chat. Order. Delivered.",
};

export class SeoBuilder {
  private title = SITE_NAME;
  private description = "";
  private path = "/";
  private image: SeoImage = DEFAULT_IMAGE;
  private locale = "en_US";
  private type: "website" | "article" = "website";
  private ogImageType: OgImageType = "image/png";

  static from(payload: SeoPayload): SeoBuilder {
    return new SeoBuilder()
      .withTitle(payload.title)
      .withDescription(payload.description)
      .withPath(payload.path)
      .withImage(payload.image ?? DEFAULT_IMAGE)
      .withLocale(payload.locale ?? "en_US")
      .withType(payload.type ?? "website")
      .withOgImageType(payload.ogImageType ?? "image/png");
  }

  withTitle(title: string): this {
    this.title = title;
    return this;
  }

  withDescription(description: string): this {
    this.description = description;
    return this;
  }

  withPath(path: string): this {
    this.path = path;
    return this;
  }

  withImage(image: SeoImage): this {
    this.image = image;
    return this;
  }

  withLocale(locale: string): this {
    this.locale = locale;
    return this;
  }

  withType(type: "website" | "article"): this {
    this.type = type;
    return this;
  }

  withOgImageType(ogImageType: OgImageType = "image/png"): this {
    this.ogImageType = ogImageType;
    return this;
  }

  get canonical(): string {
    return `${SITE_URL}${this.path}`;
  }

  build() {
    return {
      title: this.title,
      description: this.description,

      ogTitle: `${this.title} · ${SITE_NAME}`,
      ogDescription: this.description,
      ogUrl: this.canonical,
      ogSiteName: SITE_NAME,
      ogType: this.type,
      ogLocale: this.locale,

      ogImage: this.image.url,
      ogImageType: this.ogImageType,
      ogImageWidth: this.image.width,
      ogImageHeight: this.image.height,
      ogImageAlt: this.image.alt ?? this.title,

      twitterCard: "summary_large_image" as const,
      twitterTitle: this.title,
      twitterDescription: this.description,
      twitterImage: this.image.url,
    };
  }

  buildLinkTags() {
    return [{ rel: "canonical", href: this.canonical }];
  }
}
