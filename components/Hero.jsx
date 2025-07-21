import React, { useEffect, useState } from "react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const spiderTranslate = Math.min(scrollY * 0.2, 40); // Limit movement

  return (
    <section className="relative min-h-screen pt-28 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 bg-[#151414] text-white overflow-hidden">
      {/* Background Logo */}
      <img
        src="/images/BackgroundLogo.png"
        alt="Background Logo"
        className="absolute left-1/2 top-1/2 w-[400px] opacity-60 -translate-x-1/2 -translate-y-1/2 z-0"
      />

      {/* Web overlays */}
      <img
        src="/images/web2.png"
        className="fixed top-0 left-0 w-[300px] opacity-90 z-10"
        alt="web-top-left"
      />
      <img
        src="/images/web1.png"
        className="fixed top-0 right-0 w-[200px] opacity-70 z-10 pointer-events-none"
        alt="web-top-right"
      />

      {/* Left Text Content */}
      <div className="z-10 text-left max-w-xl mt-10 md:mt-0">
        <h1 className="text-[50px] md:text-[80px] leading-tight font-['Anton'] font-normal">
          <span className="block text-white">PETER'S</span>
          <span className="block text-[#a62121]">VICTORY DIARIES</span>
        </h1>
        <p className="mt-6 text-lg text-gray-300">
          A web-slinger's chronicle of battles fought and lives saved. <br />
          After the world forgot Peter Parker, this digital journal <br />
          became his only record of the hero he still is.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <div className="relative">
            <img
              src="/images/twinwebleft.png"
              className="absolute -top-4 -left-6 w-16 opacity-70"
              alt="web left"
            />
            <button className="bg-[#213A8F] text-white px-6 py-2 font-bold uppercase text-sm shadow-md hover:bg-[#1a2f70] transition">
              NEW MISSION LOG
            </button>
          </div>
          <div className="relative">
            <img
              src="/images/twinwebright.png"
              className="absolute -top-4 -right-6 w-16 opacity-70"
              alt="web right"
            />
            <button className="border border-red-600 text-white px-6 py-2 font-bold uppercase text-sm hover:bg-red-600 transition">
              VIEW ARCHIVES
            </button>
          </div>
        </div>
      </div>

      {/* Spiderman + Thread */}
      <div
        className="relative z-10 flex flex-col items-center mt-12 md:mt-0 md:absolute md:top-0 md:right-12"
        style={{ transform: `translateY(${spiderTranslate}px)` }}
      >
        <img
          src="/images/thread.jpg"
          alt="Web Thread"
          className="h-32 md:h-40 object-contain"
        />
        <img
          src="/images/Spiderman.png"
          alt="Spiderman"
          className="w-[260px] md:w-[400px] ml-[-40px] md:ml-[-25px] drop-shadow-[0_0_25px_rgba(255,0,0,0.4)]"
        />
      </div>
    </section>
  );
};

export default Hero;