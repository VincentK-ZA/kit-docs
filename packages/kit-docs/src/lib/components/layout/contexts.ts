import { getContext, setContext, SvelteComponent } from 'svelte';
import { type Readable, derived, readable } from 'svelte/store';

import { page } from '$app/stores';
import { kebabToTitleCase, titleToKebabCase } from '$lib/utils/string.js';
import { isRegExp, isString } from '$lib/utils/unit.js';

export const NAVIGATION_CONTEXT_KEY = Symbol('');

export type NavigationConfig = {
  canUpdateHash: (hash: string) => boolean;
  cleanHash: (hash: string) => string;
};

export type NavigationContext = Readable<NavigationConfig>;

export const DEFAULT_NAVIGATION_CONFIG: NavigationConfig = {
  canUpdateHash: () => true,
  cleanHash: (hash) => hash,
};

export function getNavigationContext(): NavigationContext {
  return getContext(NAVIGATION_CONTEXT_KEY);
}

export function setNavigationContext(context: NavigationContext) {
  setContext(NAVIGATION_CONTEXT_KEY, context);
}

export const NAVBAR_CONTEXT_KEY = Symbol('');

export type NavLinkItem = {
  title: string;
  slug: string;
  match?: RegExp | null;
};

export type NavbarConfig = {
  links: NavLinkItem[];
};

export type NavbarContext = Readable<NavbarConfig>;

export function getNavbarContext(): NavbarContext {
  return getContext(NAVBAR_CONTEXT_KEY);
}

export function createNavbarContext(config: Readable<NavbarConfig>): NavbarContext {
  return config;
}

export function setNavbarContext(context: NavbarContext) {
  setContext(NAVBAR_CONTEXT_KEY, context);
}

export type SidebarLink = {
  title: string;
  slug: string;
  match?: 'deep' | RegExp;
  icon?: { before?: typeof SvelteComponent; after?: typeof SvelteComponent };
  sublinks?: SidebarLink[];
};

export type SidebarConfig = {
  baseUrl?: string;
  links: SidebarLink[];
};

export type ResolvedSidebarConfig = {
  baseUrl?: string;
  links: SidebarLink[];
};

export function normalizeSidebarConfig(config: SidebarConfig | null = null): ResolvedSidebarConfig {
  if (!config) return { links: [] };

  return config;
}

export function isActiveSidebarLink({ match, slug }: SidebarLink, currentPath: string) {
  const path = currentPath.replace(/\.html/, '');

  if (match === 'deep') {
    return path === slug || (path.startsWith(slug) && path[slug.length] === '/');
  }

  if (isRegExp(match)) {
    return match.test(slug);
  }

  return path === slug;
}

export function isSubLinkActive(link: SidebarLink, currentPath: string) {
  const path = currentPath.replace(/\.html/, '');

  console.log('path', path, link.slug, path.startsWith(link.slug));

  return !link.slug || path.startsWith(link.slug);
}

export const SIDEBAR_CONTEXT_KEY = Symbol();

export type SidebarContext = {
  config: Readable<ResolvedSidebarConfig>;
  allLinks: Readable<SidebarLink[]>;
  activeLinkIndex: Readable<number>;
  activeLink: Readable<SidebarLink | null>;
  previousLink: Readable<SidebarLink | null>;
  nextLink: Readable<SidebarLink | null>;
  activeCategory: Readable<string | null>;
};

export function createSidebarContext(
  config?: SidebarConfig | null | Readable<SidebarConfig | null>,
): SidebarContext {
  const configStore =
    config && 'subscribe' in config ? config : readable(config as SidebarConfig | null);

  // configStore.subscribe((config) => {
  //   console.log('config', config);
  // });

  const normalizedConfig = derived(configStore, ($config) => normalizeSidebarConfig($config));

  const allLinks = derived(normalizedConfig, ($config) => Object.values($config.links).flat());

  const activeLinkIndex = derived([allLinks, page], ([$allLinks, $page]) =>
    $allLinks.findIndex((link) => isActiveSidebarLink(link, $page.url.pathname)),
  );

  const activeLink = derived(
    [allLinks, activeLinkIndex],
    ([$allLinks, $activeLinkIndex]) => $allLinks[$activeLinkIndex],
  );

  const previousLink = derived(
    [allLinks, activeLinkIndex],
    ([$allLinks, $activeLinkIndex]) => $allLinks[$activeLinkIndex - 1],
  );

  const nextLink = derived(
    [allLinks, activeLinkIndex],
    ([$allLinks, $activeLinkIndex]) => $allLinks[$activeLinkIndex + 1],
  );

  const activeCategory = derived([normalizedConfig, activeLink], ([$config, $activeLink]) => {
    const category = 'temp';

    return !category ? null : category;
  });

  const context: SidebarContext = {
    config: normalizedConfig,
    allLinks,
    activeLinkIndex,
    activeLink,
    previousLink,
    nextLink,
    activeCategory,
  };

  return context;
}

export function setSidebarContext(context: SidebarContext) {
  setContext(SIDEBAR_CONTEXT_KEY, context);
}

export function getSidebarContext(): SidebarContext {
  return getContext(SIDEBAR_CONTEXT_KEY);
}

export type I18NTranslations = {
  nav: {
    next: string;
    previous: string;
    mainMenu: string;
    openSidebar: string;
    options: string;
    links: string;
  };
  toc: {
    title: string;
  };
  colorScheme: {
    title: string;
    light: string;
    dark: string;
    system: string;
    theme: string;
  };
  dialog: {
    close: string;
  };
  admonition: {
    note: string;
    info: string;
    tip: string;
    warning: string;
    danger: string;
    experimental: string;
  };
  code: {
    copy: string;
    copied: string;
  };
};

export const DEFAULT_I18N_TRANSLATIONS: I18NTranslations = {
  nav: {
    previous: 'Previous',
    next: 'Next',
    mainMenu: 'Main navigation menu',
    openSidebar: 'Open main sidebar',
    options: 'Options',
    links: 'Links',
  },
  toc: {
    title: 'On this page',
  },
  colorScheme: {
    title: 'Color Scheme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    theme: 'Theme',
  },
  dialog: {
    close: 'Close dialog',
  },
  admonition: {
    note: 'NOTE',
    info: 'INFO',
    tip: 'TIP',
    warning: 'WARNING',
    danger: 'DANGER',
    experimental: 'EXPERIMENTAL',
  },
  code: {
    copy: 'Copy code',
    copied: 'Copied!',
  },
};

export type I18NContext = Readable<I18NTranslations>;

export const I18N_CONTEXT_KEY = Symbol();

export function getI18nContext(): I18NContext {
  return getContext(I18N_CONTEXT_KEY);
}

export function setI18nContext(context: I18NContext) {
  setContext(I18N_CONTEXT_KEY, context);
}
