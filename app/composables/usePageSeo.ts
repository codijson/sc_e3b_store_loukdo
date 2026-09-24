import { SeoBuilder, type SeoImage } from "~/core/seo/SeoBuilder";

interface UsePageSeoOptions {
  titleKey: string;
  descriptionKey: string;
  path: string;
  image?: SeoImage;
}

const LOCALE_OG_MAP: Record<string, string> = {
  en: "en_US",
  km: "km_KH",
  zh: "zh_CN",
};

/**
 * usePageSeo
 * ----------
 * Reads translated title/description strings and delegates the actual
 * meta-tag shape to SeoBuilder, so every page gets consistent Open Graph
 * and Twitter card output for social sharing previews.
 */
export function usePageSeo(options: UsePageSeoOptions) {
  const { t, locale } = useOwnI18n();

  const title = t(options.titleKey);
  const description = t(options.descriptionKey);

  const seo = SeoBuilder.from({
    title,
    description,
    path: options.path,
    image: options.image,
    locale: LOCALE_OG_MAP[locale.value] ?? "en_US",
    // Only pass ogImageType when `options.image` is a real PNG/JPG/GIF.
    // SVG has no valid og:image:type and most crawlers won't render it
    // in previews anyway, so we omit the tag rather than lie about it.
  });

  useSeoMeta(seo.build());
  useHead({ link: seo.buildLinkTags() });
}
