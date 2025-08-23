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
        <img
          src="https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-free-desktop-wallpaper-beautiful-green-fields-image_2950823.jpg"
          alt=""
        />
      </div>
    </header>
  );
});
