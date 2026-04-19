import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <main>
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
      </main>

      <Footer setActivePage={setActivePage} />
    </div>
  );
}
