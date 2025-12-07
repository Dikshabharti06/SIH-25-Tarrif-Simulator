import React from "react";
import { Rocket } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-sm border-b-4 border-yellow-500">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
       <div className="flex items-center gap-2">
  
  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-lg">
    <img 
      src="../src/assests/connexa logo.jpg" 
      alt="Logo" 
      className="w-8 h-8 object-contain"
    />
  </div>

  <div className="flex flex-col">
    <h1 className="text-xl px-3 font-bold tracking-tight text-green-900 drop-shadow-sm">
      Connexa
    </h1>

    <span
      className="text-s font-semibold text-black px-3 py-2 rounded-full mt-1
      bg-linear-to-r from-green-700 to-green-500 shadow-sm border border-yellow-400"
    >
      Team ID: 25271
    </span>
  </div>

</div>
        <button className="bg-green-700 hover:bg-green-800 text-black font-semibold 
          px-6 py-3 rounded-lg flex items-center gap-2 transition-transform 
          duration-200 hover:scale-105 shadow-md">
          <Rocket className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
