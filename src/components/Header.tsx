import { memo } from "react";

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
      </div>
    </header>
  );
});
