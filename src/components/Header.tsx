import React from "react";
import { LogOut, User } from "lucide-react";
import { Button } from '../components/ui/button';
import MinLogo from '/min-logo.png';
import GoiLogo from '/Government_of_India_logo.svg.png';
import MakeInIndiaLogo from '/Make_In_India.png';
import NameLogo from '/name.png';

interface HeaderProps {
  onLogout: () => void;
  userName?: string; 
}

const Header: React.FC<HeaderProps> = ({ onLogout, userName = "Admin User" }) => {
  
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
      <div className="max-w-[1600px] mx-auto px-6 py-1 flex justify-between items-center">
        <nav className="flex items-center justify-between px-10 bg-white">
    
    <div className="flex items-center gap-3">
      <div className="w-18 h-18 bg-white flex items-center justify-center">
        <img className="hover:scale-110" src={GoiLogo}/>
      </div>
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
        <img className="rounded-full hover:scale-110" src={MinLogo}/>
      </div>
      <div className="w-23 h-23 bg-white flex items-center justify-cente">
        <img className="hover:scale-110" src={NameLogo}/>
      </div>
      </div>
  </nav>

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