import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { Sparkles, CheckCircle2, X } from 'lucide-react';

export function WelcomeDialog() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('hasSeenWelcome', 'true');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="max-w-lg rounded-xl shadow-xl bg-white border border-gray-500 "
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 mb-2 text-lg font-bold text-green-800  border-b border-green-600">
            <Sparkles className="w-5 h-5 text-green-600" />
            Welcome to the CPO Policy Simulator
          </DialogTitle>

          <DialogDescription>
            Analyze tariff scenarios for India's NMEO-OP strategy with real-time predictions & impact analytics.
          </DialogDescription>
        </DialogHeader>

        {/* Body */}
        <div className="space-y-4 mt-2 text-sm">
          <p className="text-gray-700 leading-relaxed">
            This platform helps policymakers visualize tariff-based impacts on
            farmers, consumers & government subsidy outlay.
          </p>

          <div className="bg-green-50 p-3 rounded-lg border border-green-200 shadow-sm">
            <p className="font-medium text-green-900 mb-2">🚀 Quick Start:</p>
            <ul className="text-green-800 space-y-1">
              <li className="flex gap-2 items-start">
                <CheckCircle2 className="w-4 h-4 mt-0.5" />
                Use presets for auto-loaded examples
              </li>
              <li className="flex gap-2 items-start">
                <CheckCircle2 className="w-4 h-4 mt-0.5" />
                Adjust tariffs & volatility using sliders
              </li>
              <li className="flex gap-2 items-start">
                <CheckCircle2 className="w-4 h-4 mt-0.5" />
                View live multi-metric impact charts
              </li>
            </ul>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={handleClose} className="flex-1 bg-green-700 hover:bg-green-800">
              Get Started
            </Button>
            <Button onClick={handleClose} variant="outline" className="flex-1 hover:bg-gray-400">
              Skip Tutorial
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
