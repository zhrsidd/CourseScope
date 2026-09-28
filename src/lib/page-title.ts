/**
 * ---------------------------------------------------------------------------
 *  PAGE TITLES
 * ---------------------------------------------------------------------------
 *
 *  This is a single-page app behind a HashRouter, so every route shared the one
 *  title baked into index.html. That is a real usability problem before launch
 *  rather than a search-engine one: a student comparing courses has five tabs
 *  open and every one of them reads the same site name.
 *
 *  Deliberately small. No helmet library, no meta-tag framework, no dynamic
 *  Open Graph — the brief asks not to overbuild this, and a hash-routed SPA
 *  cannot serve per-route meta tags to a crawler anyway, so building machinery
 *  for it would be effort spent on an illusion. What it CAN do is name the tab
 *  correctly, which is the part a person actually sees.
 *
 *  Titles are specific-first: the course, then the university, then the site.
 *  Tab strips truncate from the right, so the distinguishing word has to come
 *  first or every tab reads the same again.
 */

import { useEffect } from 'react';
import { BRAND_NAME, BRAND_TITLE } from './brand';

/**
 * The bare brand is the suffix on inner pages ("Physics MPhys · Oxford ·
 * CourseScope") — short, because tab strips truncate. The home page, which has
 * no specific subject of its own, gets the full descriptive title instead.
 */
export const SITE_TITLE = BRAND_NAME;

/** Builds a tab title. Exported so the regression checks test the real rule. */
export function pageTitle(title: string | null | undefined): string {
  return title ? `${title} · ${SITE_TITLE}` : BRAND_TITLE;
}

/** Sets the document title for as long as the calling component is mounted. */
export function usePageTitle(title: string | null | undefined): void {
  useEffect(() => {
    const previous = document.title;
    document.title = pageTitle(title);
    return () => {
      document.title = previous;
    };
  }, [title]);
}
