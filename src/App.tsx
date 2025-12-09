import { useState } from 'react';
import { LoadingPage } from './components/LoadingPage';
import { PolicySimulator } from './components/PolicySimulator';
import LandingPage from './components/LandingPage';
import AuthPage from './components/Auth/auth';

// Define the possible states of the app
type AppState = 'LANDING' | 'AUTH' | 'LOADING' | 'SIMULATOR';

export default function App() {
  const [currentStep, setCurrentStep] = useState<AppState>('LANDING');

  // 1. From Landing to Login
  const handleNavigateToAuth = () => {
    setCurrentStep('AUTH');
  };

  // 2. From Auth to Loading (After successful login)
  const handleAuthSuccess = () => {
    setCurrentStep('LOADING');
  };

  // 3. From Loading to Simulator (User clicks "Start" or load finishes)
  const handleLoadingComplete = () => {
    setCurrentStep('SIMULATOR');
  };

  // 4. Back Action for AUTH Page (Goes back to Landing)
  const handleBackToLanding = () => {
    setCurrentStep('LANDING');
  };

  // 5. Back Action for SIMULATOR (Goes back to Loading/Start Screen)
  const handleBackToLoading = () => {
    setCurrentStep('LOADING');
  };

  // 6. Logout Action (Goes all the way back to Landing)
  const handleLogout = () => {
    setCurrentStep('LANDING');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-emerald-50 font-sans text-gray-900">
      
      {/* STEP 1: LANDING PAGE */}
      {currentStep === 'LANDING' && (
        <LandingPage onLoginClick={handleNavigateToAuth} />
      )}

      {/* STEP 2: AUTHENTICATION */}
      {currentStep === 'AUTH' && (
        <AuthPage 
          onAuthSuccess={handleAuthSuccess} 
          onBack={handleBackToLanding} /* Goes to Landing */
        />
      )}

      {/* STEP 3: LOADING / SPLASH SCREEN */}
      {currentStep === 'LOADING' && (
        <LoadingPage 
    onStart={handleLoadingComplete} 
    onLogout={handleLogout}
  />
)}

      {/* STEP 4: MAIN DASHBOARD */}
      {currentStep === 'SIMULATOR' && (
        <PolicySimulator 
          onBack={handleBackToLoading} /* Back Arrow -> Goes to Loading */
          onLogout={handleLogout}      /* Logout Button -> Goes to Landing */
        />
      )}

    </div>
  );
}