import { Suspense, lazy, useEffect } from 'react';
import { HashRouter, Navigate, Route, Routes, useLocation, Link } from 'react-router-dom';
import { Announcer } from '@/components/Announcer';
import { CompareTray } from '@/components/CompareTray';
import { DemoBanner } from '@/components/DemoBanner';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { EmptyState } from '@/components/ui/primitives';
import { usePageTitle } from '@/lib/page-title';
import { useApp } from '@/state/AppContext';
import { LandingPage } from '@/pages/LandingPage';
import { SearchPage } from '@/pages/SearchPage'; // the product's main screen: in the entry chunk, not behind a second round trip
import { PageLoading } from '@/components/PageLoading';
import { hasSearchParams } from '@/lib/search-url';
import { AppProvider } from '@/state/AppContext';


/*
 * Every route except the landing page is its own chunk, fetched when first needed and
 * again, quietly, once the browser is idle, so the second page a person opens is
 * already on its way before they ask for it.
 */
const routes = {
  BrowsePage: () => import('@/pages/BrowsePage'),
  UniversitiesPage: () => import('@/pages/UniversitiesPage'),
  UniversityDetailPage: () => import('@/pages/UniversityDetailPage'),
  CourseDetailPage: () => import('@/pages/CourseDetailPage'),
  ComparePage: () => import('@/pages/ComparePage'),
  ShortlistPage: () => import('@/pages/ShortlistPage'),
  AboutPage: () => import('@/pages/AboutPage'),
  AdminPage: () => import('@/pages/AdminPage'),
  TuitionFees: () => import('@/components/TuitionFees'), // not a route: prefetched with them so the first course page opens warm
};
const BrowsePage = lazy(() => routes.BrowsePage().then((m) => ({ default: m.BrowsePage })));
const UniversitiesPage = lazy(() => routes.UniversitiesPage().then((m) => ({ default: m.UniversitiesPage })));
const UniversityDetailPage = lazy(() => routes.UniversityDetailPage().then((m) => ({ default: m.UniversityDetailPage })));
const CourseDetailPage = lazy(() => routes.CourseDetailPage().then((m) => ({ default: m.CourseDetailPage })));
const ComparePage = lazy(() => routes.ComparePage().then((m) => ({ default: m.ComparePage })));
const ShortlistPage = lazy(() => routes.ShortlistPage().then((m) => ({ default: m.ShortlistPage })));
const AboutPage = lazy(() => routes.AboutPage().then((m) => ({ default: m.AboutPage })));
const AdminPage = lazy(() => routes.AdminPage().then((m) => ({ default: m.AdminPage })));

function usePrefetchRoutes() {
  useEffect(() => {
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void }).requestIdleCallback;
    const run = () => Object.entries(routes).forEach(([name, load]) => {
        if (name !== 'AdminPage') void load().catch(() => undefined); // admin is never prefetched
      });
    // Wait until the first screen has painted and settled (a second after `load`), then use idle time.
    // Starting at mount competes with the first render for the main thread, which delayed the
    // first content on a throttled CPU by several hundred milliseconds.
    const start = () => setTimeout(() => (idle ? idle(run, { timeout: 4000 }) : run()), 1200);
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
  }, []);
}

/**
 * Marks the document `is-ready` once the first screen is on its way: the catalogue has arrived and a
 * couple of frames have been painted. Entry animations are scoped to `.is-ready`, so the cold load is
 * never held back by a fade (an element at opacity 0 is not counted as painted, which delayed the
 * largest-contentful-paint by several hundred ms), while later navigation and filtering still animate.
 */
function ReadyFlag() {
  const { loading } = useApp();
  useEffect(() => {
    if (loading) return;
    let id2 = 0;
    const id1 = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => document.documentElement.classList.add('is-ready'));
    });
    return () => {
      cancelAnimationFrame(id1);
      cancelAnimationFrame(id2);
    };
  }, [loading]);
  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/**
 * `#/` is the landing page. Before v2 it was the search page, so existing links,
 * bookmarks and shared URLs look like `#/?q=…&category=…&subcategory=…&university=…`.
 * Any address that carries a search selection is sent on to `#/search` with the
 * same parameters, replacing the history entry so Back does not bounce.
 */
function HomeRoute() {
  const { search } = useLocation();
  if (hasSearchParams(search)) return <Navigate to={{ pathname: '/search', search }} replace />;
  return <LandingPage />;
}

function NotFoundPage() {
  usePageTitle('Page not found');
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <EmptyState
        title="Page not found"
        description="That page does not exist in this app."
        action={
          <Link to="/search" className="btn-primary">
            Back to search
          </Link>
        }
      />
    </div>
  );
}

export default function App() {
  usePrefetchRoutes();
  return (
    <AppProvider>
      <HashRouter>
        <ReadyFlag />
        <ScrollToTop />
        <div className="flex min-h-screen flex-col">
          {/*
            A skip link and a single <main> landmark, added in v0.8.
            Before this, only the search page had a <main> and it wrapped the
            results column rather than the page, so on six of seven routes a
            screen-reader user had no landmark to jump to and no way past the
            navigation. It is visually hidden until focused, which is why it is
            easy to leave out and easy to notice once you tab into the page.
          */}
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-ctl focus:bg-navy-900 focus:px-4 focus:py-2.5 focus:text-sm focus:text-white"
          >
            Skip to main content
          </a>
          <DemoBanner />
          <Navbar />
          <main id="content" className="flex-1">
            <Suspense fallback={<PageLoading />}>
            <Routes>
              <Route path="/" element={<HomeRoute />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/browse" element={<BrowsePage />} />
              <Route path="/universities" element={<UniversitiesPage />} />
              <Route path="/university/:slug" element={<UniversityDetailPage />} />
              <Route path="/course/:id" element={<CourseDetailPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/shortlist" element={<ShortlistPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            </Suspense>
          </main>
          <CompareTray />
          <Announcer />
          <Footer />
        </div>
      </HashRouter>
    </AppProvider>
  );
}
