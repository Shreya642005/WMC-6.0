import React from "react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-between px-10 bg-[#151414] text-white overflow-hidden">

      {/* Background Logo (Red faded spider logo) */}
      <img
        src="/images/BackgroundLogo.png"
        alt="Background Logo"
        className="absolute left-1/2 top-1/2 w-[400px] opacity-10 -translate-x-1/2 -translate-y-1/2"
      />

      {/* Top Web overlays */}
      <img
        src="/images/web2.png"
        className="absolute top-0 left-0 w-[300px] opacity-80"
        alt="web-top-left"
      />
      <img
        src="/images/web1.png"
        className="absolute top-0 right-0 w-[200px] opacity-70"
        alt="web-top-right"
      />

      {/* Left Text Content */}
      <div className="max-w-xl z-10">
        <h1 className="text-[88px] font-['Anton'] font-normal leading-none">
          <span className="text-white">PETER’S</span>{" "}
          <span className="text-red-600">VICTORY DIARIES</span>
        </h1>
        <p className="mt-6 text-lg text-gray-300">
          A web-slinger's chronicle of battles fought and lives saved. <br />
          After the world forgot Peter Parker, this digital journal <br />
          became his only record of the hero he still is.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex gap-4 items-center">
          <div className="relative">
            <img
              src="/images/twinwebleft.png"
              className="absolute -top-4 -left-6 w-16 opacity-70"
              alt="web left"
            />
            <button className="bg-gradient-to-r from-blue-700 via-purple-800 to-red-600 px-5 py-2 font-semibold text-white shadow-md hover:scale-105 transition z-10 relative">
              NEW MISSION LOG
            </button>
          </div>

          <div className="relative">
            <img
              src="/images/twinwebright.png"
              className="absolute -top-4 -right-6 w-16 opacity-70"
              alt="web right"
            />
            <button className="border border-red-600 px-5 py-2 font-semibold text-white hover:bg-red-600 transition z-10 relative">
              VIEW ARCHIVES
            </button>
          </div>
        </div>
      </div>

      {/* Right Spiderman Image */}
      <div className="z-10">
        <img
          src="/images/Spiderman.png"
          alt="Spiderman"
          className="w-[400px] md:w-[500px] drop-shadow-xl"
        />
      </div>
    </section>
  );
};

export default Hero;
