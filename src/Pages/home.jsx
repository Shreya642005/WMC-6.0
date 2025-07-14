import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

const Home = () => {
  return (
    <div className="App bg-[#151414] text-white min-h-screen">
      <Navbar />
      <Hero />
      <footer className="bg-gray-900 text-white text-center py-4">
        © 2025 Peter's Victory Diaries. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
