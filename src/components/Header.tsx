import { memo } from "react";
import { Link } from "react-router";

export const Header = memo(() => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          ✨ My Todo App
        </h1>
        <p className="text-gray-600 text-center mt-2">
          Stay organized and boost your productivity
        </p>

        <div className="flex justify-center items-center gap-4 mt-6">
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Tasks
          </Link>
          <Link
            to="/blog"
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Blog
          </Link>
        </div>
      </div>
    </header>
  );
});
