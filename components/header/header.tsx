'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightToBracket, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import LoginSignup from './login_signup';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginMode, setLoginMode] = useState<'login' | 'signup'>('login');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openLoginModal = (mode: 'login' | 'signup') => {
    setLoginMode(mode);
    setShowLoginModal(true);
  };

  const openLearningEra = () => {
    window.open('https://www.youtube.com/@LearningEra', '_blank');
  };

  return (
    <>
      <header className="bg-gradient-to-r from-indigo-900 to-purple-900 fixed w-full top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                {/* <Image
                  src="/assets/images/logo.jpg"
                  alt="Learning Era Logo"
                  width={40}
                  height={40}
                  className="rounded-full mr-2"
                /> */}
                <span className="text-2xl font-bold text-white">
                  Learning Era
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-200 hover:text-white transition-colors duration-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-white/10">
                Home
              </Link>
              <Link href="/courses" className="text-gray-200 hover:text-white transition-colors duration-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-white/10">
                Courses
              </Link>
              <Link href="/about" className="text-gray-200 hover:text-white transition-colors duration-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-white/10">
                About
              </Link>
              <Link href="/contact" className="text-gray-200 hover:text-white transition-colors duration-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-white/10">
                Contact
              </Link>
              <button onClick={() => openLoginModal('login')} className="text-gray-200 hover:text-white transition-colors duration-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-white/10">
                <FontAwesomeIcon icon={faRightToBracket} className="mr-2" />
                Login
              </button>
              <button onClick={() => openLoginModal('signup')} className="bg-white text-indigo-900 hover:bg-opacity-90 transition-colors duration-200 px-4 py-2 rounded-full text-sm font-medium">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Sign Up
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-full text-gray-200 hover:text-white hover:bg-white/10 focus:outline-none transition-colors duration-200"
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                  <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
                ) : (
                  <FontAwesomeIcon icon={faXmark} className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-indigo-950/90 backdrop-blur-sm rounded-lg mt-2 shadow-xl">
                <Link href="/" className="text-gray-200 hover:text-white transition-colors duration-200 block px-4 py-2 rounded-full text-base font-medium hover:bg-white/10">
                  Home
                </Link>
                <Link href="/courses" className="text-gray-200 hover:text-white transition-colors duration-200 block px-4 py-2 rounded-full text-base font-medium hover:bg-white/10">
                  Courses
                </Link>
                <Link href="/about" className="text-gray-200 hover:text-white transition-colors duration-200 block px-4 py-2 rounded-full text-base font-medium hover:bg-white/10">
                  About
                </Link>
                <Link href="/contact" className="text-gray-200 hover:text-white transition-colors duration-200 block px-4 py-2 rounded-full text-base font-medium hover:bg-white/10">
                  Contact
                </Link>
                <button onClick={() => openLoginModal('login')} className="text-gray-200 hover:text-white transition-colors duration-200 w-full text-left px-4 py-2 rounded-full text-base font-medium hover:bg-white/10">
                  <FontAwesomeIcon icon={faRightToBracket} className="mr-2" />
                  Login
                </button>
                <button onClick={() => openLoginModal('signup')} className="bg-white text-indigo-900 hover:bg-opacity-90 transition-colors duration-200 w-full text-left px-4 py-2 rounded-full text-base font-medium">
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* YouTube Sticky Logo */}
      <button
        onClick={openLearningEra}
        className="fixed bottom-4 right-4 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors z-50"
      >
        <FontAwesomeIcon icon={faYoutube} className="h-6 w-6" />
      </button>

      {/* Login/Signup Modal */}
      {showLoginModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn"
          onClick={() => setShowLoginModal(false)}
        >
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />
          <div 
            className="relative z-50 animate-slideIn"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
            >
              <FontAwesomeIcon icon={faXmark} className="h-6 w-6" />
            </button>
            <LoginSignup initialMode={loginMode} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
