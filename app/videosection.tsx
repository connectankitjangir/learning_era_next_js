"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

const VideoSection = () => {
  // Video data with links
  const videoLinks = [
    'https://www.youtube.com/watch?v=oOhp4UGSzYo',
    'https://www.youtube.com/watch?v=h0Medvigy04',
    'https://www.youtube.com/watch?v=qa5rM7Wczt8'
  ];

  // Automatically extract video IDs from links
  const videos = videoLinks.map(link => {
    const id = link.split('v=')[1];
    return { id, link };
  });

  const [videoTitles, setVideoTitles] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Fetch video titles from YouTube API
    videos.forEach(video => {
      fetch(`https://noembed.com/embed?url=${video.link}`)
        .then((response) => response.json())
        .then((data) => {
          setVideoTitles((prev) => ({
            ...prev,
            [video.id]: data.title,
          }));
        })
        .catch((error) => console.error("Error fetching video title:", error));
    });
  }, []);

  return (
    <div className="m-6 py-6 bg-white text-black rounded-2xl" id="videos">
      <h3 className="text-3xl font-semibold mb-6 text-center">Our Latest Videos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => window.open(video.link, "_blank")}
          >
            <img
              src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
              alt="Video thumbnail"
              className="w-full object-cover rounded-lg mb-4"
            />
            <h4 className="text-lg font-semibold mb-4">{videoTitles[video.id] || "Loading..."}</h4>
            <button className="btn-3d py-3 px-6 text-lg cursor-pointer rounded-lg uppercase font-bold bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 inline-flex items-center animate-pulse">
              <FontAwesomeIcon icon={faYoutube} className="mr-2" />
              Watch Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoSection;
