import React from 'react';

interface IllustrationProps {
  index: number;
  title?: string;
  city?: string;
  className?: string;
}

export function VolunteerCardIllustration({ index, title = '', city = '', className = '' }: IllustrationProps) {
  // Determine palette theme by index or title length
  const themeIndex = Math.abs(index) % 6;

  // Colors dictionary:
  // Green: #00C853, #10B981, #059669, #DCFCE7
  // Blue:  #2563EB, #3B82F6, #0284C7, #DBEAFE
  // Yellow:#FFE600, #FACC15, #EAB308, #FEF9C3

  return (
    <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
      {themeIndex === 0 && (
        // Theme 0: Mentorship & Education (Green, Yellow, Blue)
        <svg viewBox="0 0 400 160" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="bg0" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0FDF4" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>
            <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00C853" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE600" />
              <stop offset="100%" stopColor="#FACC15" />
            </linearGradient>
          </defs>
          
          <rect width="400" height="160" fill="url(#bg0)" />
          
          {/* Background Arch & Shapes */}
          <path d="M 20 160 C 20 70, 100 70, 100 160 Z" fill="url(#greenGrad)" opacity="0.85" />
          <circle cx="160" cy="50" r="38" fill="url(#yellowGrad)" />
          <rect x="230" y="20" width="130" height="50" rx="25" fill="#3B82F6" opacity="0.9" />

          {/* Decorative Grid Dots */}
          <g fill="#2563EB" opacity="0.2">
            <circle cx="340" cy="90" r="3" />
            <circle cx="355" cy="90" r="3" />
            <circle cx="370" cy="90" r="3" />
            <circle cx="340" cy="105" r="3" />
            <circle cx="355" cy="105" r="3" />
            <circle cx="370" cy="105" r="3" />
          </g>

          {/* Abstract Figures (Mentor + Child) */}
          {/* Mentor Figure */}
          <circle cx="200" cy="80" r="14" fill="#2563EB" />
          <path d="M 180 145 C 180 105, 220 105, 220 145 Z" fill="#2563EB" />

          {/* Child Figure */}
          <circle cx="240" cy="95" r="11" fill="#FFE600" />
          <path d="M 224 145 C 224 115, 256 115, 256 145 Z" fill="#FFE600" />

          {/* Book / Knowledge Icon Shape */}
          <path d="M 140 120 L 160 110 L 180 120 L 160 130 Z" fill="#00C853" />
          <path d="M 140 125 L 160 115 L 180 125 L 160 135 Z" fill="#FACC15" opacity="0.8" />

          {/* Sparkles */}
          <path d="M 290 115 L 293 123 L 301 126 L 293 129 L 290 137 L 287 129 L 279 126 L 287 123 Z" fill="#FFE600" />
          <circle cx="80" cy="40" r="6" fill="#00C853" opacity="0.6" />
        </svg>
      )}

      {themeIndex === 1 && (
        // Theme 1: Sports & Active Movement (Blue, Yellow, Green)
        <svg viewBox="0 0 400 160" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EFF6FF" />
              <stop offset="100%" stopColor="#FEFCE8" />
            </linearGradient>
            <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>

          <rect width="400" height="160" fill="url(#bg1)" />

          {/* Large Wave */}
          <path d="M -20 120 Q 80 40, 200 100 T 420 80 L 420 180 L -20 180 Z" fill="url(#blueGrad)" opacity="0.85" />
          
          {/* Yellow Pill Badge */}
          <rect x="25" y="25" width="110" height="42" rx="21" fill="#FFE600" />
          
          {/* Green Circle */}
          <circle cx="330" cy="45" r="32" fill="#00C853" />

          {/* Active Figures */}
          {/* Running/Jumping Figure 1 (Green) */}
          <circle cx="150" cy="45" r="12" fill="#00C853" />
          <path d="M 140 70 C 140 58, 160 58, 160 70 L 165 105 L 135 105 Z" fill="#00C853" />

          {/* Active Figure 2 (Yellow) */}
          <circle cx="250" cy="55" r="13" fill="#FFE600" />
          <path d="M 235 80 C 235 68, 265 68, 265 80 L 270 120 L 230 120 Z" fill="#FFE600" />

          {/* Ball Shape */}
          <circle cx="200" cy="40" r="14" fill="#2563EB" />
          <circle cx="200" cy="40" r="8" fill="#FFE600" />

          {/* Motion Lines */}
          <line x1="80" y1="90" x2="120" y2="90" stroke="#00C853" strokeWidth="4" strokeLinecap="round" />
          <line x1="90" y1="102" x2="115" y2="102" stroke="#FFE600" strokeWidth="4" strokeLinecap="round" />
        </svg>
      )}

      {themeIndex === 2 && (
        // Theme 2: Care, Community & Heart (Yellow, Green, Blue)
        <svg viewBox="0 0 400 160" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEFCE8" />
              <stop offset="100%" stopColor="#F0FDF4" />
            </linearGradient>
          </defs>

          <rect width="400" height="160" fill="url(#bg2)" />

          {/* Sun Arch */}
          <path d="M 280 160 C 280 60, 380 60, 380 160 Z" fill="#FFE600" opacity="0.9" />
          
          {/* Blue Dome */}
          <circle cx="70" cy="110" r="55" fill="#3B82F6" opacity="0.8" />
          
          {/* Green Floating Pill */}
          <rect x="130" y="20" width="120" height="44" rx="22" fill="#00C853" />

          {/* Two Figures with Heart between them */}
          {/* Figure 1 (Blue) */}
          <circle cx="160" cy="80" r="13" fill="#2563EB" />
          <path d="M 142 140 C 142 100, 178 100, 178 140 Z" fill="#2563EB" />

          {/* Figure 2 (Green) */}
          <circle cx="220" cy="80" r="13" fill="#00C853" />
          <path d="M 202 140 C 202 100, 238 100, 238 140 Z" fill="#00C853" />

          {/* Central Heart Shape (Yellow) */}
          <path d="M 190 70 C 190 62, 180 58, 174 65 C 168 58, 158 62, 158 70 C 158 82, 174 92, 174 92 C 174 92, 190 82, 190 70 Z" fill="#FFE600" transform="translate(16, -5) scale(0.8)" />

          {/* Floating Dots */}
          <circle cx="40" cy="35" r="8" fill="#FFE600" />
          <circle cx="280" cy="40" r="10" fill="#2563EB" opacity="0.5" />
        </svg>
      )}

      {themeIndex === 3 && (
        // Theme 3: Digital Skills & IT Training (Teal, Green, Yellow)
        <svg viewBox="0 0 400 160" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0FDF4" />
              <stop offset="100%" stopColor="#EFF6FF" />
            </linearGradient>
          </defs>

          <rect width="400" height="160" fill="url(#bg3)" />

          {/* Rounded Rectangles Card */}
          <rect x="20" y="20" width="140" height="100" rx="20" fill="#0284C7" opacity="0.85" />
          <rect x="250" y="30" width="120" height="110" rx="24" fill="#00C853" opacity="0.8" />

          {/* Yellow Starburst Badge */}
          <circle cx="200" cy="45" r="28" fill="#FFE600" />

          {/* Figure at Screen */}
          <circle cx="180" cy="85" r="14" fill="#2563EB" />
          <path d="M 160 145 C 160 110, 200 110, 200 145 Z" fill="#2563EB" />

          {/* Laptop / Screen Vector Shape */}
          <rect x="50" y="45" width="80" height="50" rx="8" fill="#FFFFFF" opacity="0.9" />
          <rect x="60" y="55" width="60" height="6" rx="3" fill="#0284C7" />
          <rect x="60" y="67" width="40" height="6" rx="3" fill="#FFE600" />
          <rect x="60" y="79" width="50" height="6" rx="3" fill="#00C853" />

          {/* Plus / Code Symbols */}
          <text x="280" y="80" fill="#FFFFFF" fontSize="24" fontWeight="bold" fontFamily="sans-serif">&lt;/&gt;</text>
          <circle cx="310" cy="110" r="8" fill="#FFE600" />
        </svg>
      )}

      {themeIndex === 4 && (
        // Theme 4: Creative Arts & Cultural Expression (Blue, Green, Yellow)
        <svg viewBox="0 0 400 160" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF9C3" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>
          </defs>

          <rect width="400" height="160" fill="url(#bg4)" />

          {/* Curved Ribbon */}
          <path d="M -10 40 C 100 140, 250 -20, 410 80 L 410 170 L -10 170 Z" fill="#3B82F6" opacity="0.8" />
          
          {/* Canary Yellow Circle */}
          <circle cx="100" cy="60" r="42" fill="#FFE600" />
          
          {/* Emerald Arch */}
          <path d="M 260 160 C 260 80, 340 80, 340 160 Z" fill="#00C853" opacity="0.9" />

          {/* Creative Figure */}
          <circle cx="210" cy="65" r="14" fill="#00C853" />
          <path d="M 190 135 C 190 95, 230 95, 230 135 Z" fill="#00C853" />

          {/* Paint Palette Circles */}
          <circle cx="65" cy="50" r="8" fill="#2563EB" />
          <circle cx="90" cy="40" r="8" fill="#00C853" />
          <circle cx="115" cy="55" r="8" fill="#FFE600" />

          {/* Musical Notes / Sparkles */}
          <path d="M 330 40 L 334 52 L 346 56 L 334 60 L 330 72 L 326 60 L 314 56 L 326 52 Z" fill="#FFE600" />
        </svg>
      )}

      {themeIndex === 5 && (
        // Theme 5: Nutrition, Meal & Care Support (Green, Blue, Yellow)
        <svg viewBox="0 0 400 160" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="bg5" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ECFDF5" />
              <stop offset="100%" stopColor="#FEFCE8" />
            </linearGradient>
          </defs>

          <rect width="400" height="160" fill="url(#bg5)" />

          {/* Emerald Green Circle Backdrop */}
          <circle cx="80" cy="80" r="50" fill="#00C853" />
          
          {/* Golden Yellow Semi-circle */}
          <path d="M 220 160 C 220 70, 320 70, 320 160 Z" fill="#FFE600" />
          
          {/* Cobalt Blue Bar */}
          <rect x="150" y="25" width="130" height="42" rx="21" fill="#2563EB" opacity="0.9" />

          {/* Two Figures around Bowl/Plate */}
          {/* Figure 1 */}
          <circle cx="170" cy="85" r="13" fill="#2563EB" />
          <path d="M 152 145 C 152 105, 188 105, 188 145 Z" fill="#2563EB" />

          {/* Figure 2 */}
          <circle cx="230" cy="85" r="13" fill="#00C853" />
          <path d="M 212 145 C 212 105, 248 105, 248 145 Z" fill="#00C853" />

          {/* Bowl/Plate Vector Shape */}
          <path d="M 180 115 C 180 130, 220 130, 220 115 Z" fill="#FFE600" />
          <circle cx="200" cy="100" r="6" fill="#00C853" />

          {/* Steam / Energy dots */}
          <circle cx="192" cy="90" r="3" fill="#2563EB" />
          <circle cx="200" cy="85" r="4" fill="#00C853" />
          <circle cx="208" cy="90" r="3" fill="#FFE600" />
        </svg>
      )}

      {/* Top Overlay Badge for Location / City */}
      {city && (
        <span className="absolute bottom-2.5 left-2.5 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
          📍 {city}
        </span>
      )}
    </div>
  );
}
