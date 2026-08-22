import React from 'react';

const jobs = [
  {
    id: 1,
    title: 'Guidewire Business Analyst',
    workMode: 'Remote',
    experience: '10+ Years',
    tags: ['PolicyCenter', 'BillingCenter', 'ClaimCenter', 'P&C Insurance'],
    description:
      'Drive digital transformation for insurance clients by bridging business requirements with Guidewire platform capabilities across PolicyCenter, BillingCenter, and ClaimCenter.',
  },
  {
    id: 2,
    title: 'Guidewire Cloud Architect / SME',
    workMode: 'Remote',
    experience: '10+ Years',
    tags: ['GWCP', 'Workflow Sequencing', 'Solution Design'],
    description:
      'Lead cloud architecture initiatives on the Guidewire Cloud Platform, designing scalable solutions and establishing best practices for enterprise insurance modernization.',
  },
  {
    id: 3,
    title: '.NET Full Stack Developer',
    workMode: 'Remote, Fulltime',
    experience: '5+ Years',
    tags: ['.NET Core', 'React', 'REST APIs', 'Oracle (PL/SQL)'],
    description:
      'Build and maintain full-stack enterprise applications using .NET Core and React, integrating with Oracle databases and RESTful microservices.',
  },
];

const icons = {
  workMode: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  experience: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};

function JobCard({ job, onApply }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden group">
      {/* Top accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-[#008080] to-[#00c8c8]" />

      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-xl font-bold text-[#0A192F] mb-3 group-hover:text-[#008080] transition-colors duration-200">
          {job.title}
        </h3>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 mb-4">
          <span className="flex items-center gap-1.5 text-sm text-gray-500">
            {icons.workMode}
            {job.workMode}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-gray-500">
            {icons.experience}
            {job.experience}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-grow">{job.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-[#008080]/10 text-[#006666] text-xs font-medium rounded-full border border-[#008080]/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => onApply(job)}
          className="w-full py-3 bg-[#0A192F] hover:bg-[#008080] text-white font-semibold rounded-xl transition-all duration-200 text-sm tracking-wide shadow hover:shadow-[#008080]/30"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default function JobListings({ onApply }) {
  return (
    <section id="careers" className="bg-white py-14 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-10">
          <h2 className="text-2xl sm:text-[26px] font-bold text-[#17263d] mb-5">We Are Hiring</h2>
          <p className="max-w-4xl text-[13px] leading-7 text-[#4d5561]">
            Our business success starts with exceptional IT consulting resources. Since our first day, we have focused on hiring and retaining the best IT talent. Technumen's business model is designed to provide ongoing training, career development, challenging projects and relocation support. With the success based on our IT consultants, our business growth is determined by the growth of our consultant base. We are looking to add new individuals who are hardworking, intelligent, talented and determined.
          </p>
          <h2 className="text-2xl sm:text-[26px] font-bold text-[#17263d] mt-8">Current Openings</h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onApply={onApply} />
          ))}
        </div>
      </div>
    </section>
  );
}
