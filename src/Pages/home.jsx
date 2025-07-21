import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

const Home = () => {
  return (
    <div className="App bg-[#151414] text-white min-h-screen">
      <Navbar />
      <Hero />
    </div>
  );
};

export default Home;
