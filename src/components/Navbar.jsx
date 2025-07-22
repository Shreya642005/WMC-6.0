import React, { useState } from 'react';

export default function Navbar({ currentPage, setCurrentPage }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'mission-log', label: 'Mission Log' },
    { id: 'all-missions', label: 'All Missions' },
    { id: 'map-view', label: 'Map View' },
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    // Fixed top navbar
    <div className="fixed top-0 left-0 w-full z-50 px-4">
      {/* Gradient border wrapper */}
      <div className="p-[1.3px] bg-gradient-to-r from-red-600 via-[#4d0000] to-black rounded-md shadow-md max-w-[1100px] mx-auto mt-4">
        
        {/* Navbar with gradient background */}
        <header className="bg-gradient-to-r from-red-950 via-black to-black rounded-md opacity-95">
          <nav className="px-6 py-3 flex items-center justify-between">
            
            {/* Logo */}
            <button 
              onClick={() => handleNavClick('home')} 
              aria-label="Brand" 
              className="flex items-center hover:scale-105 transition-transform"
            >
              <img
                src="/images/logo.png"
                alt="Spider Logo"
                className="w-10 h-10"
              />
            </button>

            {/* Navigation Links */}
            <div className="hidden sm:flex gap-10 text-white text-sm font-light font-['Anton'] tracking-wider opacity-90 transform scale-x-95">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`hover:text-red-500 transition-colors duration-300 ${
                    currentPage === item.id ? 'text-red-500' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile menu icon */}
            <div className="sm:hidden">
              <button 
                type="button" 
                className="text-white hover:text-red-500 transition-colors"
                aria-label="Toggle navigation"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

          </nav>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="sm:hidden bg-black/90 border-t border-red-600/30">
              <div className="px-6 py-4 space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left font-['Anton'] tracking-wider hover:text-red-500 transition-colors duration-300 ${
                      currentPage === item.id ? 'text-red-500' : 'text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>
      </div>
    </div>
  );
}
