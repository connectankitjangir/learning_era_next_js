"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faBullseye,
  faUsers,
  faBookReader,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const ExamReviewSection = () => {
  // Dummy data for buttons
  const examReviewData = [
    { button_name: "SSC CGL" },
    { button_name: "BANK PO" },
    { button_name: "UPSC" },
  ];

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(prev => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const animateClass = animate
    ? "opacity-100 translate-x-0"
    : "opacity-0 translate-x-[-20px]";

  return (
    <section className="flex flex-col items-center justify-center  m-3 p-6 bg-white text-black rounded-2xl">
      {/* Title */}
      <h2 className="text-4xl font-semibold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
        Exam Reviews
      </h2>

      {/* Animated List */}
      <ul className="space-y-6 mb-8 text-lg text-gray-700 text-center">
        {[
          { icon: faChartBar, text: "Get personalized exam difficulty analysis based on your attempts", color: "text-purple-600" },
          { icon: faBullseye, text: "Receive accurate cutoff predictions for your category", color: "text-green-600" },
          { icon: faUsers, text: "Compare your performance with other candidates", color: "text-blue-600" },
          { icon: faBookReader, text: "Get insights on important topics and question patterns", color: "text-yellow-500" },
          { icon: faChartLine, text: "Track exam trends across different days and shifts", color: "text-red-600" }
        ].map((item, index) => (
          <li
            key={index}
            className={`flex items-center justify-center transition-all duration-700 ease-out ${animateClass}`}
            style={{ transitionDelay: `${index * 300}ms` }}
          >
            
            <span><FontAwesomeIcon icon={item.icon} className={`mr-4 text-xl ${item.color}`} />{item.text}</span>
          </li>
        ))}
      </ul>

      {/* Dynamic Buttons */}
      <div className="flex flex-wrap justify-center gap-8">
        {examReviewData.map((examReview, index) => (
          <a
            key={index}
            href={`/exam-review/${examReview.button_name.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-lg cursor-pointer rounded-full font-bold bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-500 ease-in-out relative overflow-hidden group px-10 py-6"
          >
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

            {/* Animated Gradient Background */}
            <div className="absolute -inset-full group-hover:inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 transition-transform duration-1000 group-hover:translate-x-full"></div>

            <span className="relative inline-flex items-center text-xl">
              <FontAwesomeIcon icon={faBookReader} className="mr-3 group-hover:animate-bounce" />
              {examReview.button_name.toUpperCase()}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ExamReviewSection;
