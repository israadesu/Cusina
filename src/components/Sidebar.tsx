import { Heart, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;

const DesktopSidebar = () => {

  const location = useLocation();

  const isHomeRoute = location.pathname === "/home";
  const isFavoritesRoute = location.pathname === "/favorites";

  return (
    <div className="p-3 md:p-5 border-r border-gray-800 min-h-screen w-24 md:w-64 hidden sm:block ">
      <div className="flex flex-col gap-20 sticky top-10 left-0 ">
        <div className="w-full">
          <img src="/main.png" alt="logo" className="hidden md:block h-auto " />
          <img src="/mobile-logo.svg" alt="logo" color="white" className="block md:hidden" />
        </div>
        <ul className="flex flex-col items-center md:items-start gap-8 ">
          <Link to={"/home"} className="flex gap-1 hover:opacity-80 transition-all" >
            <li></li>
            
            <Home size={24} className={isHomeRoute ? "text-blue-500" : ""} />
            <span className="font-bold hidden md:block">Home</span>
          </Link>
          <Link to={"/favorites"} className="flex gap-1 hover:opacity-80 transition-all" >
            <li></li>
            <Heart size={24} className={isFavoritesRoute ? "text-blue-500" : ""} />
            <span className="font-bold hidden md:block">Favorites</span>
          </Link>
        </ul>
      </div>
    </div>
  );
};


const MobileSidebar = () => {

  const location = useLocation();
  const isHomeRoute = location.pathname === "/home";
  const isFavoritesRoute = location.pathname === "/favorites";

  return (
    <div className="flex justify-center gap-10 border-gray-800 fixed w-72 bg-inherit
    bottom-2 left-1/2 transform -translate-x-1/2 bg-white z-10 p-3 sm:hidden rounded-full shadow-lg">
      <Link to="/home" className="flex flex-col items-center">
        <Home size={26} className={`cursor-pointer flex items-center ${isHomeRoute ? "text-blue-500" : ""}`} />
        
      </Link>

      <Link to="/favorites" className="flex flex-col items-center">
        <Heart size={26} className={`cursor-pointer flex items-center ${isFavoritesRoute ? "text-red-500" : ""}`} />
      </Link>
    </div>
  )
}