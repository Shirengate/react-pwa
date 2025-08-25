import { Header } from "@/components/Header";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      <main className=" mx-auto min-h-screen h-full px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className=" mx-auto px-4 py-6 text-center text-gray-600">
          <p>Built with ❤️ using React & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
