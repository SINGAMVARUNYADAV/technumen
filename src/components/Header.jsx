import React, { useState } from 'react';

const navLinks = ['Home', 'About Us', 'Services', 'Careers', 'Resources', 'Contact Us'];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 shadow-sm">
      <div className="bg-black text-white text-[11px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-7 flex items-center justify-between">
          <a href="mailto:info@technumen.com" className="hover:text-[#00a0a0] transition-colors">
            <span className="mr-2">✉</span>info@technumen.com
          </a>
          <div className="flex items-center gap-4 text-[10px] font-bold">
            <a href="#" aria-label="Facebook" className="hover:text-[#00a0a0]">f</a>
            <a href="#" aria-label="Twitter" className="hover:text-[#00a0a0]">t</a>
            <a href="#" aria-label="LinkedIn" className="hover:text-[#00a0a0]">in</a>
          </div>
        </div>
      </div>
      <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[76px]">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-1 rounded-full border-[5px] border-[#008080] border-r-transparent rotate-45" />
              <div className="absolute top-0 left-1/2 w-1.5 h-1.5 rounded-full bg-[#008080]" />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 rounded-full bg-[#00a0a0]" />
            </div>
            <span className="text-[#17263d] font-bold text-[21px] tracking-[0.12em] lowercase">technumen</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link}
                href={link === 'Careers' ? '#careers' : '#'}
                className={`px-4 py-2 text-[13px] font-medium transition-colors duration-150 border-b-2 ${
                  link === 'Careers'
                    ? 'text-[#008080] font-semibold border-[#008080]'
                    : 'text-[#27344a] hover:text-[#008080] border-transparent'
                }`}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#17263d] hover:text-[#008080] p-2 rounded-md"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-2">
            {navLinks.map((link) => (
              <a
                key={link}
                href={link === 'Careers' ? '#careers' : '#'}
                className="block px-4 py-2 text-sm font-medium text-[#27344a] hover:text-[#008080] rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
          </div>
        )}
      </div>
      </div>
    </header>
  );
}
