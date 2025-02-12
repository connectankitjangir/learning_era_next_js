"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useMemo } from "react";

const WelcomeSection = () => {
  // Memoizing icons to prevent unnecessary re-renders
  const icons = useMemo(
    () => ({
      graduation: <FontAwesomeIcon icon={faGraduationCap} className="mr-2 animate-bounce" />,
      youtube: <FontAwesomeIcon icon={faYoutube} className="mr-2 animate-pulse" />,
      keyboard: <FontAwesomeIcon icon={faKeyboard} className="mr-2 animate-pulse" />,
    }),
    []
  );

  return (
    <section className="bg-[#e6b4b4] py-6 animate-fadeIn  m-3 my-6 text-black rounded-2xl">
      <div className="container mx-auto text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 pb-2.5 text-[rgb(37,8,8)] font-['Protest_Guerrilla'] animate-slideInDown flex flex-col items-center">
          <div className="flex items-center justify-center text-3xl md:text-4xl lg:text-5xl">
            {icons.graduation}
            <span className="ml-2">Welcome</span>
          </div>
          <div className="text-2xl md:text-3xl">to</div>
          <div className="flex items-center justify-center text-3xl md:text-4xl lg:text-5xl font-serif text-blue-600 italic underline">
            <span>Learning Era</span>
          </div>
        </h1>


        {/* Subtitle */}
        {/* <p className="text-2xl italic mb-4 font-mono animate-slideInUp">
          Your gateway to professional education and exam success!
        </p> */}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          {/* YouTube Button */}
          <a
            href="https://www.youtube.com/@LearningEra/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d py-3 px-6 text-lg cursor-pointer rounded-lg uppercase font-bold
                      transform hover:scale-110 transition duration-300 ease-in-out
                      flex items-center bg-red-600 text-white shadow-lg hover:bg-red-700
                      border-b-4 border-red-800"
          >
            {icons.youtube}
            Watch Our Videos
          </a>

          {/* Typing Test Button */}
          <Link
            href="/typing-home"
            className="btn-3d py-3 px-6 text-lg cursor-pointer rounded-lg uppercase font-bold
                      transform hover:scale-110 transition duration-300 ease-in-out
                      flex items-center bg-blue-600 text-white shadow-lg hover:bg-blue-700
                      border-b-4 border-blue-800"
          >
            {icons.keyboard}
            Typing Tests
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
