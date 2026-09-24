import { NavigationService } from "~/core/navigation/NavigationService";

export function useNavigation() {
  const route = useRoute();

  const primaryLinks = NavigationService.getPrimaryLinks();
  const footerGroups = NavigationService.getFooterGroups();

  function isActive(path: string): boolean {
    return NavigationService.isActive(route.path, path);
  }

  return { primaryLinks, footerGroups, isActive };
}
