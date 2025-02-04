'use client';

const Footer = () => {
  return (
    <footer className="bg-white m-6 py-6 text-gray-900 rounded-2xl">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              We help students prepare for competitive exams by providing answer key analysis, 
              exam reviews, and detailed insights into their performance.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-gray-700 transition-colors">
                  Answer Key Submission
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-gray-700 transition-colors">
                  Exam Reviews
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-gray-700 transition-colors">
                  Video Tutorials
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Youtube: <a className="text-blue-500 hover:text-blue-700" href="https://www.youtube.com/@learningera" target="_blank" rel="noopener noreferrer">Learning Era</a></li>
              <li>Email: <a className="text-blue-500 hover:text-blue-700" href="mailto:contact@learningera.co.in">contact@learningera.co.in</a></li>

              <li>Telegram: <a className="text-blue-500 hover:text-blue-700" href="https://telegram.me/learning_era" target="_blank" rel="noopener noreferrer">Learning Era</a></li>
              


              <li>Address: India</li>
            </ul>


          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} <strong>Learning Era</strong>. All rights reserved.</p>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
