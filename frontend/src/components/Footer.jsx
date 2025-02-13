import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-black text-gray-700 dark:text-gray-300 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid text-center justify-center">
          {/* Left Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              <Link to="/">
                <span className="text-black dark:text-white">Silent</span>
                <span className="text-blue-500 dark:text-blue-400">Scribe</span>
              </Link>
            </h2>
          </div>
          <p className="mt-2 text-sm">Bringing you the latest insights in web development and technology.</p>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-300 dark:border-gray-700 mt-6 pt-4 text-center text-sm">
          © {new Date().getFullYear()} Silent Scribe. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
