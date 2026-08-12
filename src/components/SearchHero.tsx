import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export default function SearchHero() {
  const [isFrench, setIsFrench] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFrench(prev => !prev);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center text-center space-y-6 pt-6 pb-10">
      
      {/* Grouping mascot and speech bubble closer together */}
      <div className="flex flex-col items-center space-y-1">
        {/* Greeting Speech Bubble styled like DoDonate screenshot with standard bounce animation */}
        <div className="relative animate-bounce">
          <div className="bg-[#0A1120] text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-wide shadow-md flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-brand-yellow animate-ping"></span>
            {isFrench ? (
              <span>Bonjour! Bienvenue Sur DoNest! 🙌🏽</span>
            ) : (
              <span>Hello! Welcome To DoNest! 👋🏽</span>
            )}
          </div>
          {/* Tail for bubble */}
          <div className="w-3 h-3 bg-[#0A1120] absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 rotate-45"></div>
        </div>

        {/* Smiling Crowned Kid/House Mascot SVG directly inspired by DoDonate screenshot */}
        <div className="relative">
        {/* Decorative background dots */}
        <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-60">
          <div className="grid grid-cols-5 gap-2.5">
            {[...Array(25)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-green/20"></div>
            ))}
          </div>
        </div>
        
        <svg 
          width="110" 
          height="110" 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto drop-shadow-md hover:scale-105 transition-transform duration-300"
        >
          {/* Main smiling circle face with bright gradient */}
          <circle cx="50" cy="55" r="32" fill="url(#face_grad)" stroke="#0A1120" strokeWidth="3" />
          
          {/* Crown */}
          <path 
            d="M32 30 L40 37 L50 25 L60 37 L68 30 L64 42 H36 L32 30 Z" 
            fill="#FFE600" 
            stroke="#0A1120" 
            strokeWidth="2.5" 
            strokeLinejoin="round" 
          />
          {/* Little crown circles */}
          <circle cx="32" cy="28" r="2.5" fill="#FFE600" stroke="#0A1120" strokeWidth="1.5" />
          <circle cx="50" cy="23" r="2.5" fill="#FFE600" stroke="#0A1120" strokeWidth="1.5" />
          <circle cx="68" cy="28" r="2.5" fill="#FFE600" stroke="#0A1120" strokeWidth="1.5" />
          
          {/* Eyes */}
          <circle cx="41" cy="53" r="3.5" fill="#0A1120" />
          <circle cx="59" cy="53" r="3.5" fill="#0A1120" />
          {/* Eye sparkles */}
          <circle cx="42" cy="51.5" r="1.2" fill="white" />
          <circle cx="60" cy="51.5" r="1.2" fill="white" />
          
          {/* Rosy cheeks */}
          <circle cx="35" cy="59" r="3" fill="#FF4D4D" fillOpacity="0.4" />
          <circle cx="65" cy="59" r="3" fill="#FF4D4D" fillOpacity="0.4" />
          
          {/* Happy wide smile */}
          <path 
            d="M42 62 Q50 69 58 62" 
            stroke="#0A1120" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
          />
          
          {/* Antenna / Lightbulb node on the right side just like the screenshot! */}
          <path d="M78 45 L86 38" stroke="#0A1120" strokeWidth="2.5" />
          <circle cx="88" cy="36" r="4.5" fill="#FFE600" stroke="#0A1120" strokeWidth="2" />
          
          <defs>
            <linearGradient id="face_grad" x1="50" y1="23" x2="50" y2="87" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFE600" />
              <stop offset="100%" stopColor="#00C853" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>

      {/* Sparkle Pill Badge with reduced height */}
      <div className="inline-flex items-center gap-1.5 bg-[#00C853]/10 border border-[#00C853]/20 px-3.5 py-1 rounded-full text-xs font-extrabold text-[#00C853] tracking-wide shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-[#00C853] animate-pulse" />
        <span>Don't Waste It, Donate It!</span>
      </div>

      {/* Hero Headline and subtitle */}
      <div className="max-w-2xl mx-auto space-y-3">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#0A1120] leading-[1.1] tracking-tight">
          Turn Your <span className="bg-[#FFE600] px-2 rounded-xl text-black">Extra Items</span> Into{' '}
          <span className="text-[#00C853] relative inline-block">
            Local Impact
            <span className="absolute bottom-1 left-0 w-full h-2 bg-[#00C853]/15 -z-10 rounded-sm"></span>
          </span>
        </h1>
        <p className="text-gray-500 font-medium text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          DoNest connects nonprofits with generous citizens, making it easy to donate essential items, volunteer your time, and support causes that strengthen communities.
        </p>
      </div>

    </div>
  );
}
