import React from 'react';
import { Button } from '../components/ui/button';
import MinLogo from '/min-logo.png';
import DashOne from '/dashboard1.png';
import DashTwo from '/dashboard2.png';
import DashThree from '/dashboard3.png';
import GoiLogo from '/Government_of_India_logo.svg.png';
import MakeInIndiaLogo from '/Make_In_India.png';
import NameLogo from '/name.png';
import GreenFooter from './footer/Footer';

interface NavbarProps {
  onLoginClick: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => (
  <nav className="flex items-center justify-between px-10 bg-white shadow border-b-4 border-yellow-500">
    
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
    <div className="hidden md:flex items-center gap-6">
      <div className="hidden md:flex items-center gap-6"> <a href="#features" className="text-gray-600 hover:text-green-700 font-medium text-sm">Features</a>
      <Button
        size="sm"
        className="rounded-full text-green-700 border border-green-700 hover:bg-green-700 hover:text-white transition"
        onClick={onLoginClick}
      >
        Portal Login
      </Button>
    </div>
    <div>
      <img 
        src={MakeInIndiaLogo} 
        className="h-8 hover:scale-110 transition"
      />
      </div>
      </div>
  </nav>
);

interface LandingProps {
  onLoginClick: () => void;
}

const LandingPage: React.FC<LandingProps> = ({ onLoginClick }) => {
  return (
    <>
    <div className="min-h-screen bg-linear-to-br from-green-700 to-green-800 font-sans text-white">
      <Navbar onLoginClick={onLoginClick} />
      {/* HERO + DASHBOARD BG SECTION */}
<section className="relative w-full h-full flex flex-col border-b-2 border-b-yellow-500 rounded-xl">

  {/* Full Background Cover (Header → Hero → Preview) */}
  <div
    className="absolute inset-0 w-full h-full bg-cover bg-center rounded-xl opacity-60"
    style={{ backgroundImage: "url('/bg-coverpalm.webp')" }}
  />

  {/* Gradient Overlay for Visibility */}
  <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/30" />

  {/* Foreground Content */}
  <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-6 py-24">

    {/* Tag */}
    <span className="py-1 px-4 rounded-full bg-green-600 text-white text-sm md:text-lg uppercase tracking-wider font-semibold shadow-lg">
      AI Simulator
    </span>

    {/* Title */}
    <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-4 leading-tight drop-shadow">
      Predict Policy Impact on <br />
      <span className="text-yellow-300">Palm Oil Ecosystem</span>
    </h1>

    {/* Subtitle */}
    <p className="text-lg md:text-xl text-white max-w-2xl mt-4 mb-8 drop-shadow">
      Boosting NMEO-OP with simulation tools that forecast the effects
      of tariff changes on farmers, industries, consumers & sustainability.
    </p>

    {/* CTA Button */}
    <Button
      size="lg"
      className="bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold text-lg h-12 px-8 rounded-xl shadow-xl transition"
      onClick={onLoginClick}
    >
      Launch Simulator
    </Button>

  </div>

  {/* 👇 Put your Dashboard Preview component here — Same background continues */}
  <div className="relative z-10 w-full pb-20">
    {/* Dashboard Preview Section Here */}
  </div>

</section>

        {/* Dashboard Preview (Auto Slider) */}
<div className="mt-5 max-w-5xl mx-auto p-10">
  <h3 className="text-3xl font-extrabold text-center text-white tracking-wide mb-6 transition-transform duration-300 hover:translate-y-1">
  Dashboard <span className="text-yellow-400">Preview</span>
</h3>
  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-green-200 bg-white">

    {/* Slider wrapper */}
    <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth">
      
      {/* Slide 1 */}
      <div className="min-w-full h-72 md:h-96 flex items-center justify-center snap-center bg-linear-to-br from-green-700 to-green-800">
        <img src={DashOne}
          className="w-full h-full rounded-xl" alt="Dashboard Preview 1" />
      </div>

      {/* Slide 2 */}
      <div className="min-w-full h-72 md:h-96 flex items-center justify-center snap-center bg-green-600/50">
        <img src={DashTwo}
          className="w-full h-full rounded-xl" alt="Dashboard Preview 2" />
      </div>

      {/* Slide 3 */}
      <div className="min-w-full h-72 md:h-96 flex items-center justify-center snap-center bg-green-500/40">
        <img src={DashThree}
          className="w-full h-full rounded-xl" alt="Dashboard Preview 3" />
      </div>
    </div>

    {/* Navigation Dots */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      <button className="w-3 h-3 rounded-full bg-gray-500 hover:bg-yellow-400"></button>
      <button className="w-3 h-3 rounded-full bg-gray-500 hover:bg-yellow-400"></button>
      <button className="w-3 h-3 rounded-full bg-gray-500 hover:bg-yellow-400"></button>
    </div>
  </div>
</div>
<section id="features" className="py-10 bg-linear-to-b from-gray-50 to-white text-gray-900 px-10 rounded-t-3xl">
  <div className="max-w-7xl mx-auto">
    
    <h2 className="text-4xl font-extrabold text-center text-green-800 mb-20 tracking-wide">
      Key Modules
    </h2>
    {/* Feature Cards */}
    <div className="grid md:grid-cols-4 gap-10">

      <FeatureCard
        title="Yield & Price Forecasting"
        desc="LSTM + Prophet models predicting market volatility and future palm oil prices."
        icon={
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        }
        className="bg-white shadow-lg border-l-4 border-green-600 hover:shadow-2xl hover:-translate-y-1 transition"
      />

      <FeatureCard
        title="Trade-off Dashboard"
        desc="Analyze policy impact across farmers, consumers & sustainability indicators."
        icon={
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        }
        className="bg-white shadow-lg border-l-4 border-emerald-600 hover:shadow-2xl hover:-translate-y-1 transition"
      />

      <FeatureCard
        title="Live Market Feed"
        desc="Instant price-change simulation powered by real-time WebSocket streams."
        icon={
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        }
        className="bg-white shadow-lg border-l-4 border-teal-600 hover:shadow-2xl hover:-translate-y-1 transition"
      />
      <FeatureCard
  title="Foreign Exchange Impact"
  desc="Analyze how currency fluctuations influence import bills and domestic market stability."
  icon={
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 2a10 10 0 100 20 10 10 0 000-20zm-8 10h16m-8-9c2.5 2 4 5 4 9s-1.5 7-4 9m0-18c-2.5 2-4 5-4 9s1.5 7 4 9"
    />
  }
  className="bg-white shadow-lg border-l-4 border-teal-600 hover:shadow-2xl hover:-translate-y-1 transition"
/>
    </div>
  </div>
</section>

    </div>
    <GreenFooter/>
    </>
  );
};

const FeatureCard = ({ title, desc, icon }: any) => (
  <div className="p-6 bg-green-50 rounded-xl border border-green-100 hover:shadow-lg transition-shadow">
    <div className="w-12 h-12 bg-green-200 text-green-700 rounded-lg flex items-center justify-center mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {icon}
      </svg>
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-700">{desc}</p>
  </div>
);

export default LandingPage;
