import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/login-input';

interface AuthProps {
  onAuthSuccess: () => void;
  onBack: () => void;
}

const AuthPage: React.FC<AuthProps> = ({ onAuthSuccess, onBack }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const toggleMode = () => setIsLoginMode(!isLoginMode);

  const handleSubmit = (e: React.FormEvent) => {
    // The browser's native validation will run before this function triggers
    e.preventDefault();
    console.log("Form Submitted Successfully");
    onAuthSuccess();
  };

  return (
    <div className="min-h-screen flex bg-green-50">
      
      {/* LEFT SIDE - BRANDING */}
      <div className="hidden lg:flex w-1/2 bg-linear-to-br from-green-700 to-green-800 justify-center items-center text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/palm-leaf.svg')] bg-cover bg-center"></div>

        <div className="relative z-10 max-w-lg text-center space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight leading-snug">
            Palm Oil Impact Simulator
          </h1>
          <div className="w-full h-64 rounded-3xl overflow-hidden shadow-2xl border border-white/20 transition-transform duration-500 hover:scale-105 mx-auto">
            <img 
              src="../src/assests/palm-oil.png"
              alt="Palm Oil Graphic"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-base text-green-100 leading-relaxed">
            Analyze tariff policies affecting the palm oil ecosystem. Monitor impact on
            farmers, industries & consumers using Agent-Based Modelling.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-60 h-60 opacity-10 bg-[url('/palm-leaf.svg')] bg-no-repeat bg-cover"></div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-green-200 relative">
          
          {/* BACK BUTTON */}
          <button 
            type="button" // Important: preventing this button from submitting the form
            onClick={onBack}
            className="absolute top-5 left-5 flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7"/>
              <path d="M19 12H5"/>
            </svg>
            Back
          </button>

          <div className="text-center mb-8 mt-4">
            <h2 className="text-3xl font-bold text-green-900">
              {isLoginMode ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-green-800 mt-2">
              {isLoginMode
                ? 'Sign in to access simulation tools'
                : 'Join as evaluator or stakeholder'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLoginMode && (
              <Input 
                label="Full Name" 
                id="name" 
                type="text" 
                placeholder="John Doe" 
                required // 1. Mandatory field
                pattern="[a-zA-Z\s]+" // 2. Specific Format: Letters and spaces only
                title="Name should only contain letters and spaces"
              />
            )}

            <Input
              label="Email Address"
              id="email"
              type="email" 
              placeholder="user@sih.gov.in"
              required // 1. Mandatory field
              // Browser automatically validates email format with type="email"
            />
            
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
              required // 1. Mandatory field
              minLength={8} // 2. Specific Format: Min 8 chars
              title="Password must be at least 8 characters long"
            />

            <Button
              type="submit"
              size="lg"
              className="w-full mt-6 text-lg bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold"
            >
              {isLoginMode ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-green-800">
            <p className="flex items-center justify-center gap-2">
              {isLoginMode ? "Don't have an account?" : "Already have an account?"}

              <Button
                type="button" // Prevents form submission
                onClick={toggleMode}
                variant="link"
                className="px-0 text-green-700 font-semibold hover:underline"
              >
                {isLoginMode ? 'Create one' : 'Login'}
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;