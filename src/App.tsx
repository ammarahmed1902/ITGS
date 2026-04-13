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
import { useBlog } from './presentation/hooks/useBlog';

export default function App() {
  const [activePage, setActivePage] = useState('Home');
  const { posts, savePost, deletePost } = useBlog();

  const handleSetPosts = (newPosts: any) => {
    // This is a bridge for the existing AdminPage which expects setPosts
    // In a full clean architecture, AdminPage would use useBlog directly
  };

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
        {activePage === 'Careers' && <CareersPage />}
        {activePage === 'Booking' && <BookingPage />}
        {activePage === 'Admin' && (
          <AdminPage 
            posts={posts} 
            onSave={savePost} 
            onDelete={deletePost} 
          />
        )}
      </main>

      <Footer setActivePage={setActivePage} />
    </div>
  );
}
