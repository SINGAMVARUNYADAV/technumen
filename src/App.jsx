import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import JobListings from './components/JobListings';
import Footer from './components/Footer';
import ApplyModal from './components/ApplyModal';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  if (window.location.pathname === '/admin') {
    return <AdminDashboard />;
  }
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <Hero />
        <JobListings onApply={setSelectedJob} />
      </main>
      <Footer />
      {selectedJob && (
        <ApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
}
