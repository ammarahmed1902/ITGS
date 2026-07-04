import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import { useBlog } from './presentation/hooks/useBlog';
import { useJobs } from './presentation/hooks/useJobs';
import { useTeam } from './presentation/hooks/useTeam';
import { ROUTES } from './config/site';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const JobDetailPage = lazy(() => import('./pages/JobDetailPage'));
const JobApplicationPage = lazy(() => import('./pages/JobApplicationPage'));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center pt-32">
    <div className="w-10 h-10 border-4 border-electric border-t-transparent rounded-full animate-spin" role="status" aria-label="Loading page" />
  </div>
);

function AppShell() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const { posts, savePost, deletePost } = useBlog();
  const {
    jobs,
    applications,
    saveJob,
    deleteJob,
    saveApplication,
    updateApplicationStatus,
    deleteApplication,
  } = useJobs();
  const { team, loading: teamLoading, saveMember, deleteMember } = useTeam();

  return (
    <div className="min-h-screen bg-starfield">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-electric focus:text-white focus:font-bold focus:rounded-lg focus:shadow-2xl"
      >
        Skip to main content
      </a>
      {!isAdmin && <Navbar />}
      <ScrollToTop />

      <main id="main-content">
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path={ROUTES.home} element={<HomePage />} />
              <Route path={ROUTES.about} element={<AboutPage />} />
              <Route path={ROUTES.services} element={<ServicesPage />} />
              <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
              <Route path={ROUTES.blog} element={<BlogPage posts={posts} />} />
              <Route path="/blog/:postId" element={<BlogDetailPage posts={posts} />} />
              <Route path={ROUTES.careers} element={<CareersPage jobs={jobs} />} />
              <Route path="/careers/:jobId" element={<JobDetailPage jobs={jobs} />} />
              <Route
                path="/careers/:jobId/apply"
                element={<JobApplicationPage jobs={jobs} onSubmit={saveApplication} />}
              />
              <Route path={ROUTES.reviews} element={<ReviewsPage />} />
              <Route path={ROUTES.team} element={<TeamPage team={team} loading={teamLoading} />} />
              <Route path={ROUTES.booking} element={<BookingPage />} />
              <Route path={ROUTES.contact} element={<ContactPage />} />
              <Route
                path={ROUTES.admin}
                element={
                  <AdminPage
                    posts={posts}
                    jobs={jobs}
                    applications={applications}
                    team={team}
                    teamLoading={teamLoading}
                    onSave={savePost}
                    onDelete={deletePost}
                    onSaveJob={saveJob}
                    onDeleteJob={deleteJob}
                    onSaveApplication={saveApplication}
                    onUpdateApplicationStatus={updateApplicationStatus}
                    onDeleteApplication={deleteApplication}
                    onSaveMember={saveMember}
                    onDeleteMember={deleteMember}
                  />
                }
              />
              <Route path={ROUTES.privacy} element={<PrivacyPage />} />
              <Route path={ROUTES.terms} element={<TermsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>

      {!isAdmin && <Footer />}
      {!isAdmin && <CookieConsent />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
