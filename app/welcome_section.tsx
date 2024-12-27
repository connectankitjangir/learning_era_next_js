'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const WelcomeSection = () => {
  return (
    <section className="min-h-[60vh] flex items-center justify-center relative overflow-hidden pt-16">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/90 to-purple-900/90" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
          Welcome to Learning Era
        </h1>
        <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Empowering minds through innovative online education. Start your learning journey today.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-white text-indigo-900 hover:bg-opacity-90 transition-colors duration-200 px-8 py-3 rounded-full text-lg font-medium">
            Get Started
          </button>
          <button className="border-2 border-white text-white hover:bg-white/10 transition-colors duration-200 px-8 py-3 rounded-full text-lg font-medium">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
