"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faChartBar,
  faCalculator,
} from "@fortawesome/free-solid-svg-icons";

// Dummy data for buttons (Replace with dynamic data)
const answerKeyData = [
  { button_name: "SSC CGL" },
  { button_name: "BANK PO" },
  { button_name: "UPSC" },
];

const AnswerKeySection = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => setAnimate(true), 100);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="text-center bg-white mx-6 py-6 dark:bg-gray-900">
      {/* Title */}
      <h2 className="text-3xl font-semibold mb-6 md:text-4xl transition-all duration-300 ease-in-out">
        Submit your Answer Key
      </h2>

      {/* Animated List */}
      <ul className="mb-6 space-y-4">
        {[ 
          { icon: faChartLine, text: "To get Raw & Normalized marks" },
          { icon: faChartBar, text: "For correct & instant result analysis" },
          { icon: faCalculator, text: "For instant Normalized marks & Cut Off analysis" }
        ].map((item, index) => (
          <li
            key={index}
            className={`flex items-center justify-center opacity-0 transform transition-all duration-700 ease-in-out
              ${animate ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"}`}
            style={{ transitionDelay: `${index * 300}ms` }}
          >
            <FontAwesomeIcon icon={item.icon} className="mr-3 text-xl text-gradient" />
            <span className="text-lg">{item.text}</span>
          </li>
        ))}
      </ul>

      {/* Dynamic Buttons */}
      <div className="flex flex-wrap justify-center gap-6">
        {answerKeyData.map((key, index) => (
          <Link
            key={index}
            href={`/marks-calculator/${key.button_name.toLowerCase().replace(/\s+/g, "-")}`}
            className="relative flex items-center justify-center text-lg cursor-pointer rounded-full font-bold 
                      bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white shadow-xl 
                      transform hover:scale-110 hover:shadow-2xl transition-all duration-300 ease-in-out 
                      group px-8 py-4 overflow-hidden"
          >
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            {/* Animated Gradient Background */}
            <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white to-transparent 
                          opacity-20 transform -skew-x-12 transition-transform duration-1000
                          group-hover:translate-x-full"></div>

            <span className="relative inline-flex items-center z-10">
              <FontAwesomeIcon icon={faCalculator} className="mr-2 group-hover:animate-bounce text-lg" />
              {key.button_name.toUpperCase()}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AnswerKeySection;
