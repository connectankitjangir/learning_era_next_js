import React from 'react';
import Link from 'next/link';
const SSCResult = () => {
  return (
    <section className="text-center bg-white mx-6 py-6 text-black rounded-lg shadow-md rounded-2xl">
      <h2 className="text-3xl font-semibold mb-6 md:text-4xl transition-all duration-300 ease-in-out">
        SSC CGL 2024 Result
      </h2>
      <p className="text-lg mb-4">
        Get accurate All India ranks for over 1.5 lakh candidates.
      </p>
      <p className="text-lg mb-4">
        This tool is helpful for self-analysis and post-preference decisions.
      </p>
      <div className="flex justify-center">
        <Link href="/ssc-cgl-2024" className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
          Check Your Result
        </Link>
      </div>

    </section>
  );
};

export default SSCResult;
