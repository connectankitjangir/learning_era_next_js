"use client";

import { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

const VideoSection = () => {
  // Video data with links
  const videoLinks = useMemo(() => [
    'https://www.youtube.com/watch?v=SUahDRj2BBw',
    'https://www.youtube.com/watch?v=BfGFVUwkJgo',
    'https://www.youtube.com/watch?v=v7_Y3Y-HK7o',
    'https://www.youtube.com/watch?v=Q-zPSa0PKac'
  ], []);

  // Automatically extract video IDs from links
  const videos = useMemo(() => videoLinks.map(link => {
    const id = link.split('v=')[1];
    return { id, link };
  }), [videoLinks]);

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
  }, [videos]); // Added videos as a dependency

  return (
    <div className="m-3 p-3 rounded-2xl text-black shadow-lg">
      <h3 className="text-4xl font-bold text-center mb-8">Our Latest Videos</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white p-4 rounded-lg shadow-xl hover:scale-105 transform transition-all duration-300 cursor-pointer group"
            onClick={() => window.open(video.link, "_blank")}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && window.open(video.link, "_blank")}
          >
            <div className="relative mb-4">
              <Image
                src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                alt={videoTitles[video.id] || "Video thumbnail"}
                width={640}
                height={360}
                className="w-full object-cover rounded-lg group-hover:opacity-80 transition-opacity duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/fallback-thumbnail.jpg'; // Fallback image
                }}
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FontAwesomeIcon icon={faYoutube} className="text-4xl text-red-600 animate-pulse" />
              </div>
            </div>
            <h4 className="text-xl font-semibold text-center mb-4">{videoTitles[video.id] || "Loading..."}</h4>
            <div className="flex justify-center">
              <button className="btn-3d py-2 px-6 text-lg font-bold rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 inline-flex items-center">
                <FontAwesomeIcon icon={faYoutube} className="mr-2" />
                Watch Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoSection;
