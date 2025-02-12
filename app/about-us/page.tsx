import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faTelegram } from '@fortawesome/free-brands-svg-icons';

const AboutUsPage = () => {
  return (
    <div className="container mx-auto p-6 text-black">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <p className="text-lg mb-4">
        Welcome to our website! We provide detailed cut-off analysis for all SSC exams, exam analysis, rank analysis, exam guidance, typing tests, mock tests, and many more resources to support our users.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
      <p className="mb-4">
        We envision a world where everyone has access to quality education and the tools they need to succeed.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Our Team</h2>
      <p className="mb-4">
        Our team is composed of experienced professionals who are passionate about education and technology.
        We work tirelessly to ensure that our platform meets the needs of our users.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Get in Touch</h2>
      <p>
        If you have any questions or feedback, feel free to reach out to us at <a href="mailto:contact@learningera.co.in" className="text-blue-500">info@example.com</a>.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Follow Us</h2>
      <p className="flex items-center mb-4">
        <a href="https://www.youtube.com/@LearningEra" className="flex items-center mr-4 text-blue-500">
          <FontAwesomeIcon icon={faYoutube} className="mr-2" />
          YouTube Channel
        </a>
        <a href="https://telegram.me/learning_era" className="flex items-center text-blue-500">
          <FontAwesomeIcon icon={faTelegram} className="mr-2" />
          Telegram Channel
        </a>
      </p>
    </div>
  );
};

export default AboutUsPage;
