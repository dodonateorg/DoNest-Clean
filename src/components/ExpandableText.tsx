import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandableTextProps {
  text: string;
  limit?: number;
  className?: string;
}

export function ExpandableText({ text, limit = 50, className = "" }: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;

  if (text.length <= limit) {
    return <p className={className}>{text}</p>;
  }

  const truncatedText = text.slice(0, limit).trim() + '...';

  return (
    <div className="space-y-1">
      <p className={className}>
        {isExpanded ? text : truncatedText}
      </p>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
        className="inline-flex items-center gap-1 text-[11px] font-black text-[#00C853] hover:text-[#009624] hover:underline cursor-pointer focus:outline-none pt-0.5 select-none"
      >
        <span>{isExpanded ? 'See Less' : 'See More'}</span>
        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>
    </div>
  );
}
