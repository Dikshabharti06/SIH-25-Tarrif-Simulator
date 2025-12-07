import React from 'react';
import { Button } from '../components/ui/button';

interface NavbarProps {
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => (
  <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
    <div className="flex items-center gap-3">
  <div className="w-10 h-10 rounded-full bg-linear-to-br from-green-600 to-green-800 flex items-center justify-center shadow-md">
    <img className="rounded-full hover:scale-110" src='../src/assets/min-logo.png'/>
  </div>

  <div className="leading-tight">
    <span className="text-sm font-bold text-gray-800 block uppercase">
      Ministry of Agriculture and Farmers Welfare
    </span>
    <span className="text-sm font-medium text-green-700 tracking-wide uppercase">
      NMEO-OP
    </span>
  </div>
</div>

    <div className="hidden md:flex items-center gap-6">
      <a href="#features" className="text-gray-600 hover:text-green-700 font-medium text-sm">Features</a>

      <Button
  size="sm"
  className="rounded-full text-green-700 border border-green-700 hover:bg-green-700 hover:text-white transition"
  onClick={onLoginClick}
>
  Portal Login
</Button>
</div>
  </nav>
);

interface LandingProps {
  onLoginClick: () => void;
}

const LandingPage: React.FC<LandingProps> = ({ onLoginClick }) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-700 to-green-800 font-sans text-white">
      <Navbar onLoginClick={onLoginClick} />

      {/* HERO SECTION */}
      <main className="px-8 py-20 md:py-32 max-w-7xl mx-auto text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-white text-xs font-bold mb-4 uppercase tracking-wider">
          Palm Oil Impact • AI Simulator
        </span>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
          Predict Policy Impact on <br className="hidden md:block" />
          <span className="text-yellow-300">Palm Oil Ecosystem</span>
        </h1>

        <p className="text-xl text-gray-100 max-w-3xl mx-auto mb-10">
          Boosting NMEO-OP with simulation tools that forecast the effects
          of tariff changes on farmers, industries, consumers & sustainability.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            size="lg"
            className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold text-lg h-12 px-8"
            onClick={onLoginClick}
          >
            Launch Simulator
          </Button>
        </div>

        {/* Dashboard Preview (Auto Slider) */}
<div className="mt-20 max-w-5xl mx-auto">
  <h3 className="text-2xl font-extrabold text-center text-white tracking-wide mb-6 transition-transform duration-300 hover:translate-y-1">
  Dashboard <span className="text-yellow-400">Preview</span>
</h3>
  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-green-200 bg-white">

    {/* Slider wrapper */}
    <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth">
      
      {/* Slide 1 */}
      <div className="min-w-full h-72 md:h-96 flex items-center justify-center snap-center bg-linear-to-br from-green-700 to-green-800">
        <img src="../src/assets/dashboard1.png"
          className="w-full h-full rounded-xl" alt="Dashboard Preview 1" />
      </div>

      {/* Slide 2 */}
      <div className="min-w-full h-72 md:h-96 flex items-center justify-center snap-center bg-green-600/50">
        <img src="../src/assets/dashboard2.png"
          className="w-full h-full rounded-xl" alt="Dashboard Preview 2" />
      </div>

      {/* Slide 3 */}
      <div className="min-w-full h-72 md:h-96 flex items-center justify-center snap-center bg-green-500/40">
        <img src="../src/assets/dashboard3.png"
          className="w-full h-full rounded-xl" alt="Dashboard Preview 3" />
      </div>

    </div>

    {/* Navigation Dots */}
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
      <button className="w-3 h-3 rounded-full bg-white/70 hover:bg-yellow-400"></button>
      <button className="w-3 h-3 rounded-full bg-white/70 hover:bg-yellow-400"></button>
      <button className="w-3 h-3 rounded-full bg-white/70 hover:bg-yellow-400"></button>
    </div>

  </div>
</div>

      </main>

      {/* FEATURES */}
      <section id="features" className="py-20 bg-white text-gray-900 px-8 rounded-t-3xl">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Key Modules</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard 
              title="Yield & Price Forecasting"
              desc="LSTM + Prophet models predicting palm oil futures & market volatility."
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
            />
            <FeatureCard 
              title="Trade-off Dashboard"
              desc="Analyze policy impact across farmers, consumers & sustainability metrics."
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
            />
            <FeatureCard 
              title="Live Market Feed"
              desc="Real-time WebSocket updates for instant price-change simulations."
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
            />
          </div>
        </div>
      </section>
    </div>
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
