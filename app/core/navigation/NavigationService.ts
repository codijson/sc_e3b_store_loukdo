/**
 * NavigationService
 * ------------------
 * Single source of truth for the site's primary navigation and footer
 * link groups. Keeping this as a class (rather than inline arrays in the
 * header/footer components) means both consume the exact same model and
 * translation keys stay centralised.
 */

export interface NavLink {
  key: string;
  to: string;
  labelKey: string;
}

export interface FooterLinkGroup {
  titleKey: string;
  links: NavLink[];
}

export class NavigationService {
  private static readonly PRIMARY: NavLink[] = [
    { key: "home", to: "/", labelKey: "nav.home" },
    { key: "features", to: "/features", labelKey: "nav.features" },
    { key: "about", to: "/about", labelKey: "nav.about" },
    { key: "contact", to: "/contact", labelKey: "nav.contact" },
  ];

  private static readonly FOOTER_GROUPS: FooterLinkGroup[] = [
    {
      titleKey: "footer.menu",
      links: NavigationService.PRIMARY,
    },
    {
      titleKey: "footer.legal",
      links: [
        { key: "terms-conditions", to: "/terms-conditions", labelKey: "footer.termsConditions" },
        {
          key: "terms-of-service",
          to: "/terms-of-service",
          labelKey: "footer.termsOfService",
        },
        {
          key: "user-code-of-conduct",
          to: "/user-code-of-conduct",
          labelKey: "footer.userConduct",
        },
        {
          key: "privacy-policy",
          to: "/privacy-policy",
          labelKey: "footer.privacy",
        },
      ],
    },
  ];

  static getPrimaryLinks(): NavLink[] {
    return this.PRIMARY;
  }

  static getFooterGroups(): FooterLinkGroup[] {
    return this.FOOTER_GROUPS;
  }

  static isActive(currentPath: string, linkPath: string): boolean {
    if (linkPath === "/") return currentPath === "/";
    return currentPath.startsWith(linkPath);
  }
}
