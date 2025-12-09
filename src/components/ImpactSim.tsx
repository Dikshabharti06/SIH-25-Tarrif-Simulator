import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Mic, Send, ArrowUp, Sun, Moon, 
  Calculator, DollarSign, Percent, Ship, 
  Leaf, Trash2, History, ArrowLeft 
} from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import classNames from 'classnames';
import { Button } from './ui/button';
import Header from './Header'; 

// --- CHART.JS REGISTRATION ---
ChartJS.register(ArcElement, Tooltip, Legend);

// --- TYPES ---
interface ChartData {
  cif: number;
  bcd: number;
  aidc: number;
  sws: number;
}

interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string | React.ReactNode;
  type?: 'text' | 'calculation';
  chartData?: ChartData;
  timestamp: string;
}

interface CurrencyData {
  rate: number;
  date: string;
}

interface ImpactSimProps {
  onBack: () => void;
  onLogout: () => void;
}

// --- UTILITY FUNCTIONS ---
const getLiveCurrencyRate = async (): Promise<CurrencyData> => {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    return { rate: data.rates.INR, date: data.date };
  } catch (error) {
    console.error("Currency API Error:", error);
    return { rate: 84.50, date: "Offline Estimate" };
  }
};

const extractPrice = (text: string): number | null => {
  const match = text.match(/(\d+)(\.\d+)?/);
  return match ? parseFloat(match[0]) : null;
};

// --- CHART COMPONENT ---
const DutyChart: React.FC<{ data: ChartData; isDarkMode: boolean }> = ({ data, isDarkMode }) => {
  const chartConfig = {
    labels: ['CIF Value', 'Basic Duty', 'Agri Cess', 'SWS'],
    datasets: [
      {
        data: [data.cif, data.bcd, data.aidc, data.sws],
        backgroundColor: [
          isDarkMode ? '#333333' : '#e0e0e0',
          isDarkMode ? '#FFD700' : '#d97706', // Gold/Amber
          isDarkMode ? '#39FF14' : '#15803d', // Green
          '#ef4444', 
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: isDarkMode ? '#FFFFFF' : '#1a1a1a',
          font: { size: 10 },
          boxWidth: 10,
        },
      },
    },
    cutout: '60%',
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="h-48 w-full my-4">
      <Doughnut data={chartConfig} options={options} />
    </div>
  );
};

// --- MAIN COMPONENT ---
const ImpactSim: React.FC<ImpactSimProps> = ({ onBack, onLogout }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I am connected to live forex markets. I can calculate Exact Landed Costs and simulate tariff impacts on Palm Oil. Try asking: 'Calculate impact if CPO is $1100'.",
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // 1. User Message
    const userMsg: Message = {
      id: Date.now(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setHistory((prev) => [text, ...prev].slice(0, 10));
    setIsTyping(true);

    // 2. Bot Logic
    const lowerInput = text.toLowerCase();
    const currencyData = await getLiveCurrencyRate();
    const inrRate = currencyData.rate;
    
    let botResponse: Message = {
      id: Date.now() + 1,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString(),
      text: '',
    };

    setTimeout(() => {
      // SCENARIO 1: CALCULATION
      if (lowerInput.includes('calculate') || lowerInput.includes('cpo') || extractPrice(text)) {
        let cpoPrice = extractPrice(text);
        if (!cpoPrice) cpoPrice = 1000;

        const BCD = 0.05;
        const AIDC = 0.05;
        const SWS = 0.10;

        const cifValueINR = cpoPrice * inrRate;
        const bcdAmount = cifValueINR * BCD;
        const aidcAmount = cifValueINR * AIDC;
        const swsAmount = bcdAmount * SWS;
        const totalDuty = bcdAmount + aidcAmount + swsAmount;
        const landedCost = cifValueINR + totalDuty;
        const effectiveTaxRate = (totalDuty / cifValueINR) * 100;

        botResponse.type = 'calculation';
        botResponse.chartData = {
          cif: cifValueINR,
          bcd: bcdAmount,
          aidc: aidcAmount,
          sws: swsAmount
        };
        botResponse.text = (
          <div className="space-y-2">
            <div className="font-bold text-lg">Real-Time Duty Calculator</div>
            <div className="text-xs opacity-75">
              Live USD/INR: ₹{inrRate} | CPO Base: ${cpoPrice}
            </div>
            
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-sm border-collapse border border-white/20">
                <thead>
                  <tr className="bg-black/10 dark:bg-white/10">
                    <th className="p-2 border border-black/10 dark:border-white/20 text-left">Component</th>
                    <th className="p-2 border border-black/10 dark:border-white/20 text-left">Value (INR)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-black/10 dark:border-white/20">CIF Value</td>
                    <td className="p-2 border border-black/10 dark:border-white/20">₹{cifValueINR.toFixed(0)}</td>
                  </tr>
                    <tr>
                    <td className="p-2 border border-black/10 dark:border-white/20">Basic Duty (5%)</td>
                    <td className="p-2 border border-black/10 dark:border-white/20">₹{bcdAmount.toFixed(0)}</td>
                  </tr>
                    <tr>
                    <td className="p-2 border border-black/10 dark:border-white/20">Agri Cess (5%)</td>
                    <td className="p-2 border border-black/10 dark:border-white/20">₹{aidcAmount.toFixed(0)}</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-black/10 dark:border-white/20 font-bold text-red-500">TOTAL DUTY</td>
                    <td className="p-2 border border-black/10 dark:border-white/20 font-bold text-red-500">
                      ₹{totalDuty.toFixed(0)} ({effectiveTaxRate.toFixed(1)}%)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-black/10 dark:border-white/20 font-bold text-green-600 dark:text-[#39FF14]">LANDED COST</td>
                    <td className="p-2 border border-black/10 dark:border-white/20 font-bold text-green-600 dark:text-[#39FF14]">₹{landedCost.toFixed(0)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      }
      // SCENARIO 2: CURRENCY
      else if (lowerInput.includes('rupee') || lowerInput.includes('usd') || lowerInput.includes('rate')) {
        botResponse.text = (
          <div>
            <strong>Live Forex Market Data</strong><br />
            <span className="text-4xl font-bold text-yellow-600 dark:text-[#FFD700]">₹{inrRate}</span> / USD<br />
            <span className="text-xs">Source: Open Exchange API</span><br /><br />
            Every ₹1 depreciation increases the landed cost of Palm Oil by approx ₹1,000 per Metric Tonne.
          </div>
        );
      }
      // SCENARIO 3: GENERIC
      else {
        botResponse.text = (
          <div>
             <strong>I can calculate that for you.</strong><br />
             Please provide a numeric price scenario (e.g., "CPO is $950") or ask about "Current Rupee Rate".
          </div>
        );
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Browser does not support voice input.");
      return;
    }

    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      setTimeout(() => handleSendMessage(transcript), 500);
    };
    recognition.start();
  };

  return (
    <div className={`min-h-screen bg-gray-300 flex flex-col font-sans transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* --- HEADER --- */}
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <Header onLogout={onLogout} userName="Admin User" />
      </div>

      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className={`rounded-lg transition-all duration-200 font-medium text-sm ${isDarkMode ? 'text-white hover:bg-gray-800' : 'text-gray-600 hover:bg-green-100 hover:text-gray-800'}`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          {/* Theme Toggle */}
          <button 
             onClick={() => setIsDarkMode(!isDarkMode)}
             className={`flex items-center gap-2 px-3 py-1 border-2 border-yellow-500 cursor-pointer rounded-full ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}
          >
             {isDarkMode ? <Moon size={14} /> : <Sun size={14} />}
             <span className="text-xs font-bold">{isDarkMode ? 'Dark' : 'Light'}</span>
          </button>
      </div>

      {/* --- MAIN LAYOUT --- */}
      <div className="flex flex-1 container mx-auto px-4 pb-4 overflow-hidden gap-4 h-[calc(100vh-180px)]">
        
        {/* --- SIDEBAR --- */}
        <aside 
          className={classNames(
            "fixed md:relative z-40 w-72 h-full rounded-2xl border shadow-sm transition-transform duration-300 flex flex-col",
            isDarkMode ? "bg-black border-gray-800" : "bg-white border-gray-200",
            { '-translate-x-full md:translate-x-0 hidden md:flex': !isSidebarOpen, 'translate-x-0 flex': isSidebarOpen }
          )}
        >
          <div className="p-4 flex-1 overflow-y-auto r bg-green-50 border-2 border-green-300 rounded-lg">
            {/* Quick Prompts */}
            <div className="mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className={`text-xs font-bold uppercase tracking-wide mb-4 flex items-center gap-2 ${isDarkMode ? 'text-yellow-400' : 'text-green-800'}`}>
                 <Calculator size={14} /> Live Scenarios
              </h3>
              <div className="space-y-2">
                {[
                  { icon: Calculator, text: "Duty Calc @ $1050", query: "Calculate duty if CPO is $1050" },
                  { icon: DollarSign, text: "Real-time USD/INR", query: "Check Live USD/INR Rate" },
                  { icon: Percent, text: "BCD Hike to 20%", query: "What happens if Basic Custom Duty is 20%?" },
                  { icon: Ship, text: "Export Tax Analysis", query: "Analyze Malaysia export tax impact" }
                ].map((item, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSendMessage(item.query)}
                    className={`w-full text-left p-3 rounded-lg text-sm transition-all flex items-center gap-3 group border ${isDarkMode ? 'bg-gray-900 border-gray-800 hover:border-yellow-400' : 'bg-gray-50 border-transparent hover:bg-green-50 hover:border-green-300'}`}
                  >
                    <item.icon size={16} className={isDarkMode ? 'text-green-400' : 'text-green-700'} />
                    {item.text}
                  </button>
                ))}
              </div>
            </div>

            {/* History */}
            <div>
               <h3 className={`text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${isDarkMode ? 'text-yellow-400' : 'text-green-800'}`}>
                 <History size={14} /> Recent
              </h3>
              <div className="space-y-2">
                {history.map((h, i) => (
                   <div key={i} className={`text-xs p-2 rounded cursor-pointer truncate hover:opacity-80 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`} onClick={() => handleSendMessage(h)}>
                     {h}
                   </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => { setMessages([]); setHistory([]); }}
              className={`mt-6 w-full py-2 border rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors ${isDarkMode ? 'border-yellow-600 text-yellow-400 hover:bg-yellow-900' : 'border-green-600 text-green-700 hover:bg-green-50'}`}
            >
              <Trash2 size={16} /> Clear Chat
            </button>
          </div>
        </aside>

        {/* --- CHAT AREA --- */}
        <main className={`flex-1 flex flex-col relative rounded-2xl border overflow-hidden ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {messages.length === 0 && (
              <div className={`text-center p-8 rounded-2xl border mt-10 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-green-50 border-green-100'}`}>
                <Leaf className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                <h1 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-green-900'}`}>ImpactSim AI Assistant</h1>
                <p className="opacity-70">Real-time Currency Feeds & Indian Tariff Structure Engine.</p>
              </div>
            )}

            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={classNames("flex w-full", {
                  'justify-end': msg.sender === 'user',
                  'justify-start': msg.sender === 'bot'
                })}
              >
                <div 
                  className={classNames(
                    "max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl shadow-sm text-sm sm:text-base relative",
                    {
                      'bg-yellow-500 text-black rounded-br-none font-medium': msg.sender === 'user',
                      'bg-green-700 text-white rounded-bl-none': msg.sender === 'bot' && !isDarkMode,
                      'bg-gray-800 text-white border border-gray-700': msg.sender === 'bot' && isDarkMode
                    }
                  )}
                >
                  {msg.type === 'calculation' && msg.chartData && (
                     <DutyChart data={msg.chartData} isDarkMode={isDarkMode} />
                  )}
                  <div>{msg.text}</div>
                </div>
              </div>
            ))}
             <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className={`p-4 border-t ${isDarkMode ? 'bg-black border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                  placeholder={isListening ? "Listening..." : "Enter scenario (e.g., 'CPO price $980')"}
                  className={`w-full p-4 pr-12 rounded-xl border-2 border-gray-500 outline-none transition-all ${isDarkMode ? 'bg-gray-900 border-gray-700 text-white focus:border-yellow-500' : 'bg-white border-gray-200 focus:border-green-500'}`}
                />
                <button 
                  onClick={handleVoiceInput}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:bg-gray-200'}`}
                >
                  <Mic size={20} />
                </button>
              </div>
              <button 
                onClick={() => handleSendMessage(inputValue)}
                className="w-14 h-14 bg-green-700 hover:bg-green-800 text-white rounded-xl flex items-center justify-center shadow-lg transition-transform hover:scale-105"
              >
                <Send size={24} />
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default ImpactSim;