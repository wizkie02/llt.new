import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const NotFound = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E8F4F8] via-[#FFFAF0] to-[#F0F8E8] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container px-8 py-16 mx-auto md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          {/* 404 Number */}
          <div className="relative mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold text-[var(--primary-color)]">
              404
            </h1>
          </div>
          {/* Main Message */}
          <div
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 ${
              theme === "dark" ? "text-white" : ""
            }`}
          >
            <div className="mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-[var(--primary-color)] mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2A3B4A] dark:text-white">
                Page Not Found
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                The page you're looking for might have been moved, deleted, or
                doesn't exist.
              </p>
            </div>
          </div>{" "}
          {/* Action Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-[var(--primary-color)] hover:bg-[#0077b3] text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Back to Home
            </Link>{" "}
            <Link
              to="/package-tours"
              className="inline-flex items-center px-6 py-3 bg-[var(--primary-color)] hover:bg-[#0077b3] text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Browse Tours
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
