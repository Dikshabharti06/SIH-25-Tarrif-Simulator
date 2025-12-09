"use client";

import React, { useState, useEffect } from "react";
import {
  Landmark,
  Building2,
  Leaf,
  Globe,
  Phone,
  Mail,
  MapPin,
  Twitter,
  Linkedin,
  Youtube,
  ArrowUpCircle,
} from "lucide-react";

const GreenFooter= () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) setShowScroll(true);
      else setShowScroll(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  return (
    <>
      <footer className="bg-green-900 text-gray-200 pt-16 mt-10 shadow-inner border-t border-green-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto px-6 pb-12">

          {/* CONTACT INFO */}
          <div>
            <h4 className="text-lg font-bold text-white tracking-wide mb-4 border-b border-green-700 pb-1">
              Contact Support
            </h4>
            <ul className="text-sm space-y-4">
              <li className="flex items-center gap-2">
                <MapPin className="text-green-400" size={18} />
                Ministry of Agriculture & Farmers Welfare, GoI
              </li>
              <li className="flex items-center gap-2">
                <Globe className="text-green-400" size={18} />
                <a href="https://nmeo.dac.gov.in/Default.aspx" className="hover:text-green-300">
                  nmeo.dac.gov.in
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="text-green-400" size={18} />
                <a href="https://nmeo.dac.gov.in/Default.aspx" className="hover:text-green-300">
                  support@nmeo.dac.gov.in
                </a>
              </li>
            </ul>

            {/* Socials */}
            <div className="flex gap-3 mt-5">
              {[ Twitter, Linkedin, Youtube].map((Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-green-700 hover:bg-green-600 rounded-full flex items-center justify-center cursor-pointer transition"
                >
                  <Icon size={18} className="text-white" />
                </div>
              ))}
            </div>
          </div>

          {/* GOVERNMENT LINKS */}
          <div>
            <h4 className="text-lg font-bold text-white tracking-wide mb-4 border-b border-green-700 pb-1">
              Government Links
            </h4>
            <ul className="text-sm space-y-4">
              <li className="flex gap-2 items-center hover:text-green-300 cursor-pointer">
                <Landmark size={18} className="text-green-400" /> Ministry of Commerce & Industry
              </li>
              <li className="flex gap-2 items-center hover:text-green-300 cursor-pointer">
                <Building2 size={18} className="text-green-400" />
                <a href="https://nmeo.dac.gov.in/Default.aspx" className="hover:text-green-300">
                  Ministry of Agriculture & Farmers Welfare
                </a>
              </li>
              <li className="flex gap-2 items-center hover:text-green-300 cursor-pointer">
                <Leaf size={18} className="text-green-400" /> NMEO-OP Mission Portal
              </li>
            </ul>
          </div>

          {/* RESOURCE LINKS */}
          <div>
            <h4 className="text-lg font-bold text-white tracking-wide mb-4 border-b border-green-700 pb-1">
              Contact Us
            </h4>
            <ul className="text-sm space-y-4">
              <li className="flex gap-2 items-center hover:text-green-300 cursor-pointer">
                <Leaf size={18} className="text-green-400" /> About This Project
              </li>
              <li className="flex gap-2 items-center hover:text-green-300 cursor-pointer">
                <Globe className="text-green-400" size={18} />
                <a href="https://nmeo.dac.gov.in/Default.aspx" className="hover:text-green-300">
                  Team connexa
                </a>
                </li>
              <li className="flex gap-2 items-center hover:text-green-300 cursor-pointer">
                <Mail className="text-green-400" size={18} />
                <a href="https://nmeo.dac.gov.in/Default.aspx" className="hover:text-green-300">
                  support@team.connexa.in
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="bg-green-950 py-4 text-center text-xs text-white border-t-4 border-green-800 border-t-yellow-600">
          © 2025 NMEO-OP Decision Support System | Smart India Hackathon Finalist
        </div>
      </footer>

      {/* Scroll-to-top */}
      {showScroll && (
        <button
          onClick={scrollTop}
          className="fixed bottom-6 right-6 bg-green-700 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition"
        >
          <ArrowUpCircle size={26} />
        </button>
      )}
    </>
  );
};

export default GreenFooter;
