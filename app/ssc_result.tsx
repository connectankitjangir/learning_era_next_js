"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';

const RELEASE_TIME = new Date("2025-02-17T17:15:00").getTime(); // UTC time

const SSCResult = () => {
  const [timeLeft, setTimeLeft] = useState(RELEASE_TIME - Date.now());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(RELEASE_TIME - Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (ms: number) => {
    if (ms <= 0) return "Rank is Now Available!";
    
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / (1000 * 60)) % 60;
    const hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <section className="text-center bg-white my-6 mx-3 py-6 text-black rounded-lg shadow-md rounded-2xl">
      <h2 className="text-3xl font-semibold mb-6 md:text-4xl transition-all duration-300 ease-in-out">
        SSC CGL 2024 Result
      </h2>
      <p className="text-lg mb-4">
        Get accurate All India ranks for over 1.5 lakh candidates.
      </p>
      <p className="text-lg mb-4">
        This tool is helpful for self-analysis and post-preference decisions.
      </p>
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white p-2 rounded-lg shadow-xl m-6 md:mx-[30%]">
        <h3 className="text-lg md:text-xl font-semibold mb-1">Age & CPT Wise Rank will be available in:</h3>
        <p className="text-md md:text-lg">
          {isMounted && (
            <span className="font-extrabold text-xl md:text-2xl">{formatTime(timeLeft)}</span>
          )}
        </p>
      </div>
      <div className="flex justify-center">
        <Link href="/ssc-cgl-2024" className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
          Check Your Result
        </Link>
      </div>
    </section>
  );
};

export default SSCResult;
