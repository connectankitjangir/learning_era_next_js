"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faKeyboard,
  faQuestionCircle,
  faInfoCircle,
  faComment,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle mobile/tablet menu
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white text-black p-3 shadow-md sticky top-3 mx-3 z-50 rounded-2xl">
      <div className="container mx-auto flex justify-between items-center ">
        {/* Logo */}
        <Link href="/" className="flex items-center hover:scale-110 transition">
          <Image
            src="https://cdn.jsdelivr.net/gh/jangirankit5/cdn/learning%20era%20website/images/logo.jpg"
            alt="Learning Era Logo"
            width={40}
            height={40}
            className="rounded-full hover:animate-pulse"
          />
          <span className="text-lg font-bold ml-2 hover:text-gray-600">
            Learning Era
          </span>
        </Link>

        {/* Mobile/Tablet Menu Button */}
        <button className="lg:hidden text-gray-600" onClick={toggleMenu}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="text-2xl" />
        </button>

        {/* Navigation Links */}
        <ul
          className={`absolute lg:relative top-full left-0 right-0 bg-white shadow-lg lg:shadow-none p-4 lg:p-0 flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-6 lg:w-auto transition-all rounded-lg mt-2 overflow-hidden ${
            menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 lg:max-h-full lg:opacity-100"
          }`}
        >
          <NavItem href="/" icon={faHome} text="Home" activePath={pathname} />
          <NavItem href="/typing-tests" icon={faKeyboard} text="Typing Tests" activePath={pathname} />
          <NavItem href="https://www.youtube.com/@LearningEra/community" icon={faQuestionCircle} text="Quiz" external />
          <NavItem href="https://telegram.me/learning_era" icon={faTelegram} text="Telegram" external />
          <NavItem href="/about-us" icon={faInfoCircle} text="About Us" activePath={pathname} />
          <NavItem href="/feedback" icon={faComment} text="Feedback" activePath={pathname} />
        </ul>
      </div>
    </nav>
  );
};

// ✅ Reusable Nav Item Component
interface NavItemProps {
  href: string;
  icon: IconDefinition;
  text: string;
  activePath?: string;
  external?: boolean;
}

const NavItem = ({ href, icon, text, activePath, external = false }: NavItemProps) => {
  const isActive = activePath === href;

  return (
    <li className="py-2 px-4 lg:p-0">
      <Link
        href={href}
        className={`rounded-full shadow-lg bg-gradient-to-r from-gray-200 to-gray-300 px-3 py-2 flex items-center hover:scale-110 transition-all ${
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
