import React from 'react';
import { NGO } from '../types';
import { MapPin, CheckSquare, Users, Calendar, ArrowUpRight } from 'lucide-react';

interface NgoCardProps {
  ngo: NGO;
  onClick: () => void;
  key?: string;
}

export default function NgoCard({ ngo, onClick }: NgoCardProps) {
  // Counts of needs and postings
  const physicalNeedsCount = ngo.needsCount !== undefined ? ngo.needsCount : ngo.physicalNeeds.length;
  const volunteerPostingsCount = ngo.volunteerRequestsCount !== undefined ? ngo.volunteerRequestsCount : ngo.volunteerPostings.length;
  
  // Check if there are high urgency needs
  const hasHighUrgency = ngo.physicalNeeds.some(n => n.urgency === 'High');

  return (
    <div 
      onClick={onClick}
      className="group bg-white border-2 border-gray-100 hover:border-[#00C853] rounded-3xl p-6 shadow-xs hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer flex flex-col justify-between relative overflow-hidden"
    >
      {/* High Urgency Tag */}
      {hasHighUrgency && (
        <div className="absolute top-0 right-0 bg-red-50 text-red-600 px-4 py-1.5 rounded-bl-2xl border-l border-b border-red-100 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          Urgent Needs
        </div>
      )}

      <div>
        {/* NGO Header Logo and Basic Info */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl shadow-xs group-hover:scale-110 transition-transform duration-300 overflow-hidden">
            {ngo.logo && (ngo.logo.startsWith('http') || ngo.logo.startsWith('/') || ngo.logo.startsWith('data:')) ? (
              <img src={ngo.logo} alt={ngo.name} className="w-full h-full object-cover rounded-2xl" referrerPolicy="no-referrer" />
            ) : (
              ngo.logo || '🏡'
            )}
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-[#0A1120] leading-tight group-hover:text-[#00C853] transition-colors pr-10">
              {ngo.name}
            </h3>
            
            {/* Location badge */}
            <div className="flex items-center gap-1.5 mt-2">
              <span className="inline-flex items-center gap-1 bg-[#00C853]/10 text-[#00C853] px-2.5 py-0.5 rounded-full text-xs font-bold">
                <MapPin className="w-3.5 h-3.5" />
                {ngo.city}
              </span>
              <span className="text-gray-400 text-xs flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Listed In {ngo.establishedYear}
              </span>
            </div>
          </div>
        </div>

        {/* Short description */}
        <p className="text-gray-600 text-sm mt-4 line-clamp-2 leading-relaxed">
          {ngo.description}
        </p>

        {/* Quick glance indicators */}
        <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-gray-50">
          <div className="bg-[#FAF9F3] p-3 rounded-2xl flex flex-col items-start">
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 mb-1">
              <CheckSquare className="w-3.5 h-3.5 text-brand-green" />
              Item Needs
            </span>
            <span className="text-lg font-black text-[#0A1120] font-mono">
              {physicalNeedsCount} <span className="text-xs text-gray-500 font-medium">categories</span>
            </span>
          </div>

          <div className="bg-blue-50/50 p-3 rounded-2xl flex flex-col items-start">
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 mb-1">
              <Users className="w-3.5 h-3.5 text-blue-500" />
              Volunteering
            </span>
            <span className="text-lg font-black text-[#0A1120] font-mono">
              {volunteerPostingsCount} <span className="text-xs text-gray-500 font-medium font-sans">roles open</span>
            </span>
          </div>
        </div>
      </div>

      {/* Action pill button */}
      <div className="mt-6 pt-3 flex items-center justify-between">
        <span className="text-xs font-bold text-gray-400 group-hover:text-brand-dark transition-colors">
          {ngo.address.split(',')[0]}
        </span>
        <button 
          className="inline-flex items-center gap-1.5 bg-brand-dark group-hover:bg-brand-green text-white group-hover:text-white px-4 py-2 rounded-full text-xs font-extrabold shadow-xs transition-all duration-300"
        >
          View Needs & Contact
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
