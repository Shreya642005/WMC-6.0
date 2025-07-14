import React from 'react';

export default function Navbar() {
  return (
    // Outer wrapper with gradient border effect and centered layout
    <div className="mt-10 px-4">
      <div className="p-[0.7px] bg-gradient-to-r from-[#020202] via-[#2c2c2c] to-[#686868] rounded-md shadow-md max-w-[1100px] mx-auto">
        <header className="bg-[rgba(2,2,2,0.24)] backdrop-blur-sm border border-black rounded-md">
          <nav className="px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <a href="#" aria-label="Brand" className="flex items-center">
              <img
                src="/images/logo.png"
                alt="Spider Logo"
                className="w-10 h-10"
              />
            </a>

            {/* Navigation Links */}
            <div className="hidden sm:flex gap-10 text-white text-xs font-['Anton'] tracking-wider opacity-90 transform scale-x-95">
              <a href="#" className="hover:text-red-500 transition-colors duration-300">Home</a>
              <a href="#" className="hover:text-red-500 transition-colors duration-300">Mission Log</a>
              <a href="#" className="hover:text-red-500 transition-colors duration-300">Map View</a>
              <a href="#" className="hover:text-red-500 transition-colors duration-300">About</a>
            </div>

            {/* Mobile menu icon */}
            <div className="sm:hidden">
              <button type="button" className="text-white" aria-label="Toggle navigation">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
}
