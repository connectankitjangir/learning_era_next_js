'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const YOUTUBE_URLS = [
  'https://www.youtube.com/watch?v=uVQIJ9KsDT4',
  'https://www.youtube.com/watch?v=uSxm6KZ2jgI',
  'https://www.youtube.com/watch?v=CNGbVMj4vlc'
];

const PhotoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const getVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const slides = YOUTUBE_URLS.map(videoUrl => ({
    videoUrl,
    get thumbnail() {
      const videoId = getVideoId(this.videoUrl);
      return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
    }
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const openVideo = (url: string) => {
    window.open(url, '_blank');
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-4xl mx-auto h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-xl shadow-xl">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-500 cursor-pointer
              ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => openVideo(slide.videoUrl)}
          >
            {/* Using img tag instead of next/Image since the YouTube thumbnail domain isn't configured */}
            <img
              src={slide.thumbnail}
              alt={`Slide ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/80 rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-t-[6px] sm:border-t-[8px] md:border-t-[12px] border-t-transparent border-b-[6px] sm:border-b-[8px] md:border-b-[12px] border-b-transparent border-l-[12px] sm:border-l-[16px] md:border-l-[24px] border-indigo-900 ml-1">
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Left Arrow */}
        <button 
          onClick={goToPrevious}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300 focus:outline-none"
        >
          <div className="w-0 h-0 border-t-[6px] sm:border-t-[8px] border-t-transparent border-b-[6px] sm:border-b-[8px] border-b-transparent border-r-[10px] sm:border-r-[12px] border-indigo-900 mr-1" />
        </button>

        {/* Right Arrow */}
        <button 
          onClick={goToNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300 focus:outline-none"
        >
          <div className="w-0 h-0 border-t-[6px] sm:border-t-[8px] border-t-transparent border-b-[6px] sm:border-b-[8px] border-b-transparent border-l-[10px] sm:border-l-[12px] border-indigo-900 ml-1" />
        </button>
        
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-300
                ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoSlider;
