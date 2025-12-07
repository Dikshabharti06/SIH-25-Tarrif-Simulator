import React from "react";
import { LogOut, User } from "lucide-react";

interface HeaderProps {
  onLogout: () => void;
  userName?: string; // Optional: Pass dynamic name if needed
}

const Header: React.FC<HeaderProps> = ({ onLogout, userName = "Admin User" }) => {
  
  // Helper to get initials (e.g., "Admin User" -> "AU")
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <header className="w-full bg-white shadow-sm border-b-4 border-yellow-500 sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* --- LEFT SIDE: LOGOS --- */}
        <div className="flex items-center gap-4">
          {/* Project Logo */}
          <div className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg bg-white border border-gray-100">
            <img 
              src="../src/assets/min-logo.png" 
              alt="Logo" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* Title Badge */}
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-white px-4 py-1.5 rounded-full bg-linear-to-r from-green-600 to-green-700 shadow-sm hover:scale-105 transition-transform uppercase tracking-wider cursor-default">
              NMEO-OP
            </h1>
          </div>
        </div>

        {/* --- RIGHT SIDE: USER PROFILE & LOGOUT --- */}
        <div className="flex items-center gap-6">
          
          {/* User Info Section */}
          <div className="flex flex-col items-center gap-2 pl-6 border-l border-gray-200">
            {/* Initials Avatar */}
            <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-indigo-100">
              {getInitials(userName)}
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-600 leading-none">{userName}</p>
            </div>
          </div>

          {/* Logout Button */}
          <button 
            onClick={onLogout}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 outline-1 hover:text-red-600 hover:bg-red-50 transition-all duration-200 font-medium text-sm"
            title="Log Out"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden md:inline">Log Out</span>
          </button>

        </div>
      </div>
    </header>
  );
};

export default Header;