"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faKeyboard,
  faQuestionCircle,
  faInfoCircle,
  faComment,
  faMoon,
  faSun,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";

const Header = () => {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") === "enabled";
    setIsDarkMode(storedDarkMode);
    if (storedDarkMode) document.documentElement.classList.add("dark");
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "disabled");
    }
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 dark:text-white p-3 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center hover:scale-110 transition">
          <Image
            src="https://cdn.jsdelivr.net/gh/jangirankit5/cdn/learning%20era%20website/images/logo.jpg"
            alt="Learning Era Logo"
            width={40}
            height={40}
            className="rounded-full hover:animate-pulse"
          />
          <span className="text-lg font-bold ml-2 hover:text-gray-600 dark:hover:text-gray-300">
            Learning Era
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 dark:text-white"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={faBars} className="text-2xl" />
        </button>

        {/* Navigation Links */}
        <ul
          className={`absolute md:relative top-full left-0 right-0 bg-white md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent shadow-lg md:shadow-none p-4 md:p-0 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6 md:w-auto transition-all ${
            menuOpen ? "block" : "hidden md:flex"
          }`}
        >
          <NavItem href="/" icon={faHome} text="Home" activePath={pathname} />
          <NavItem
            href="/typing"
            icon={faKeyboard}
            text="Typing Tests"
            activePath={pathname}
          />
          <NavItem
            href="https://www.youtube.com/@LearningEra/community"
            icon={faQuestionCircle}
            text="Quiz"
            external
          />
          <NavItem
            href="https://telegram.me/learning_era"
            icon={faTelegram}
            text="Telegram"
            external
          />
          <NavItem href="/about" icon={faInfoCircle} text="About Us" activePath={pathname} />
          <NavItem href="/feedback" icon={faComment} text="Feedback" activePath={pathname} />

          {/* Dark Mode Toggle */}
          <li className="py-2 px-4 md:p-0">
            <button
              onClick={toggleDarkMode}
              className="rounded-full shadow-lg bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 px-3 py-1 flex items-center hover:scale-110 transition-all"
            >
              {isDarkMode ? (
                <>
                  <FontAwesomeIcon icon={faSun} className="text-yellow-400 mr-2" />
                  Light Mode
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faMoon} className="text-yellow-600 mr-2" />
                  Dark Mode
                </>
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

// ✅ Reusable Nav Item Component
const NavItem = ({
  href,
  icon,
  text,
  activePath,
  external = false,
}: {
  href: string;
  icon: any;
  text: string;
  activePath?: string;
  external?: boolean;
}) => {
  const isActive = activePath === href;

  return (
    <li className="py-2 px-4 md:p-0">
      <Link
        href={href}
        className={`rounded-full shadow-lg bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 px-3 py-1 flex items-center hover:scale-110 transition-all ${
          isActive ? "font-bold" : ""
        }`}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <FontAwesomeIcon icon={icon} className="mr-2" />
        {text}
      </Link>
    </li>
  );
};

export default Header;
