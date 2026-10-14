import { useEffect } from 'react';
import { HashRouter, Navigate, Route, Routes, useLocation, Link } from 'react-router-dom';
import { Announcer } from '@/components/Announcer';
import { CompareTray } from '@/components/CompareTray';
import { DemoBanner } from '@/components/DemoBanner';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { EmptyState } from '@/components/ui/primitives';
import { usePageTitle } from '@/lib/page-title';
import { AboutPage } from '@/pages/AboutPage';
import { AdminPage } from '@/pages/AdminPage';
import { BrowsePage } from '@/pages/BrowsePage';
import { ComparePage } from '@/pages/ComparePage';
import { CourseDetailPage } from '@/pages/CourseDetailPage';
import { LandingPage } from '@/pages/LandingPage';
import { SearchPage } from '@/pages/SearchPage';
import { hasSearchParams } from '@/lib/search-url';
import { ShortlistPage } from '@/pages/ShortlistPage';
import { UniversitiesPage } from '@/pages/UniversitiesPage';
import { UniversityDetailPage } from '@/pages/UniversityDetailPage';
import { AppProvider } from '@/state/AppContext';

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
  return (
    <AppProvider>
      <HashRouter>
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
          </main>
          <CompareTray />
          <Announcer />
          <Footer />
        </div>
      </HashRouter>
    </AppProvider>
  );
}
