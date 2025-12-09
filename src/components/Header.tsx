import React from "react";
import { LogOut } from "lucide-react";
import MinLogo from '/min-logo.png';
import GoiLogo from '/Government_of_India_logo.svg.png';
import NameLogo from '/name.png';
import Aazadi from '/aazadi1.png';

interface HeaderProps {
  onLogout: () => void;
  userName?: string;
  userEmail?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  onLogout, 
  userName = "Admin User",
  userEmail = "admin@sih.gov.in"
}) => {
  
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
        
        {/* --- LEFT SIDE: LOGOS --- */}
        <nav className="flex items-center justify-between px-10 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-18 h-18 bg-white flex items-center justify-center">
              <img className="hover:scale-110 transition-transform duration-200" src={GoiLogo} alt="GOI Logo"/>
            </div>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
              <img className="rounded-full hover:scale-110 transition-transform duration-200" src={MinLogo} alt="Ministry Logo"/>
            </div>
            <div className="w-23 h-23 bg-white flex items-center justify-center">
              <img className="hover:scale-110 transition-transform duration-200" src={NameLogo} alt="Name Logo"/>
            </div>
          </div>
        </nav>

        {/* --- RIGHT SIDE: USER PROFILE & LOGOUT --- */}
        <div className="flex items-center gap-1 pr-8">
          <img src={Aazadi} className="h-15 w-20"/>
          
          {/* User Info Section (Group for Hover Effect) */}
          <div className="relative group flex items-center gap-3 pl-6 border-l border-gray-200 cursor-pointer">
            
            {/* 1. Initials Avatar */}
            <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-green-300 transition-transform duration-200 group-hover:scale-105">
                {getInitials(userName)}
            </div>

            {/* 2. Name Display (Visible by default) */}
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-gray-600 leading-none group-hover:text-gray-800 transition-colors">
                {userName}
              </p>
            </div>

            {/* --- HOVER CARD (Credentials) --- */}
            <div className="absolute top-full mt-2 w-64 bg-white rounded-xl shadow-2xl p-4 opacity-0 border border-green-200 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 z-50">
              
              {/* Card Header: Avatar + Status */}
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-full bg-green-800 text-white flex items-center justify-center font-bold text-lg">
                  {getInitials(userName)}
                </div>
                <div className="px-2 py-1 bg-green-50 rounded-full border border-green-200 flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-[10px] font-bold text-green-700 uppercase tracking-wide">Online</span>
                </div>
              </div>

              {/* User Details */}
              <div className="space-y-1">
                <p className="text-sm font-bold text-gray-900">{userName}</p>
                <p className="text-xs text-gray-800 font-medium wrap-break-word bg-gray-200 p-1.5 rounded border border-gray-100">
                  {userEmail}
                </p>
              </div>

              {/* Role Badge (Optional extra context) */}
              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                 <span className="text-[10px] font-bold text-gray-800 uppercase">Role</span>
                 <span className="text-[10px] font-bold text-green-800 bg-green-100 px-2 py-0.5 rounded">ADMINISTRATOR</span>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button 
            onClick={onLogout}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 outline outline-gray-200 hover:outline-red-200 hover:text-red-600 hover:bg-red-50 transition-all duration-200 font-medium text-sm ml-2"
            title="Log Out"
          >
            <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden md:inline">Log Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;