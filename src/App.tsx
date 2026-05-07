import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import BlogPage from './pages/BlogPage';
import CareersPage from './pages/CareersPage';
import BookingPage from './pages/BookingPage';
import AdminPage from './pages/AdminPage';
import ReviewsPage from './pages/ReviewsPage';
import TeamPage from './pages/TeamPage';
import JobDetailPage from './pages/JobDetailPage';
import JobApplicationPage from './pages/JobApplicationPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';
import { useBlog } from './presentation/hooks/useBlog';
import { useJobs } from './presentation/hooks/useJobs';

export default function App() {
  const [activePage, setActivePage] = useState('Home');
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  return (
    <div className="min-h-screen bg-starfield">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-electric focus:text-white focus:font-bold focus:rounded-lg focus:shadow-2xl"
      >
        Skip to main content
      </a>
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <main id="main-content">
        {activePage === 'Home' && <HomePage setActivePage={setActivePage} />}
        {activePage === 'About' && <AboutPage />}
        {activePage === 'Services' && <ServicesPage setActivePage={setActivePage} />}
        {activePage.startsWith('Service:') && (
          <ServiceDetailPage 
            serviceId={activePage.split(':')[1]} 
            setActivePage={setActivePage} 
          />
        )}
        {activePage === 'Reviews' && <ReviewsPage />}
        {activePage === 'Team' && <TeamPage />}
        {activePage === 'Blog' && <BlogPage posts={posts} />}
        {activePage === 'Careers' && <CareersPage jobs={jobs} setActivePage={setActivePage} />}
        {activePage.startsWith('Job:') && (
          <JobDetailPage jobId={activePage.split(':')[1]} jobs={jobs} setActivePage={setActivePage} />
        )}
        {activePage.startsWith('Apply:') && (
          <JobApplicationPage jobId={activePage.split(':')[1]} jobs={jobs} setActivePage={setActivePage} onSubmit={saveApplication} />
        )}
        {activePage === 'Booking' && <BookingPage />}
        {activePage === 'Contact' && <ContactPage />}
        {activePage === 'Admin' && (
          <AdminPage 
            posts={posts} 
            jobs={jobs}
            applications={applications}
            onSave={savePost} 
            onDelete={deletePost}
            onSaveJob={saveJob}
            onDeleteJob={deleteJob}
            onSaveApplication={saveApplication}
            onUpdateApplicationStatus={updateApplicationStatus}
            onDeleteApplication={deleteApplication}
          />
        )}
        {![
          'Home', 'About', 'Services', 'Reviews', 'Team', 'Blog', 'Careers', 'Booking', 'Contact', 'Admin'
        ].includes(activePage) && 
         !activePage.startsWith('Service:') && 
         !activePage.startsWith('Job:') && 
         !activePage.startsWith('Apply:') && 
         <NotFound setActivePage={setActivePage} />
        }
      </main>

      <Footer setActivePage={setActivePage} />
      <CookieConsent />
    </div>
  );
}
