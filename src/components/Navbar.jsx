import React from 'react';

export default function Navbar() {
  return (
    // Outer wrapper: thinner gradient border (use p-[0.7px] for fine control)
    <div className="mt-4 p-[0.7px] bg-gradient-to-r from-[#020202] via-[#2c2c2c] to-[#686868]">
      <header className="bg-[rgba(2,2,2,0.24)] backdrop-blur-sm border border-black">
        <nav className="max-w-[1280px] mx-auto px-4 py-2 flex items-center justify-between">
          {/* Logo */}
          <a href="#" aria-label="Brand" className="flex items-center">
            <img
              src="/images/logo.png"
              alt="Spider Logo"
              className="w-10 h-10"
            />
          </a>

          {/* Navigation Links */}
          <div className="hidden sm:flex gap-10 text-white text-sm font-semibold">
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
  );
}
