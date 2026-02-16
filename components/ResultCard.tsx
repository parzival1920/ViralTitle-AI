import React, { useState } from 'react';
import { TitleResult } from '../types';
import { Copy, Check } from './Icons';

interface ResultCardProps {
  result: TitleResult;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, index, isActive, onClick }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering selection when copying
    try {
      navigator.clipboard.writeText(result.title);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`group relative flex items-center justify-between p-4 rounded-lg border transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-bottom-4
        ${isActive 
          ? 'bg-[#00f3ff]/5 border-[#00f3ff]/40 shadow-[0_0_15px_rgba(0,243,255,0.1)]' 
          : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/20'
        }
      `}
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
    >
      <div className="flex flex-col gap-2 flex-1 pr-4">
        <div className="flex items-center gap-3 mb-1">
          <span className={`font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border transition-colors ${isActive ? 'text-[#00f3ff] border-[#00f3ff]/30' : 'text-gray-500 border-white/10'}`}>
            Option {index + 1}
          </span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-mono font-medium text-green-400">
              {result.ctrScore}% CTR
            </span>
          </div>
        </div>
        <h3 className={`font-medium font-sans text-lg leading-snug tracking-tight transition-colors ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
          {result.title}
        </h3>
      </div>

      <button
        onClick={handleCopy}
        className="relative flex items-center justify-center w-10 h-10 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95 group-hover:border-white/20"
        aria-label="Copy title"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
        )}
      </button>
    </div>
  );
};