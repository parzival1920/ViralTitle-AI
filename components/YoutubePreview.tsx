import React, { useState } from 'react';
import { Smartphone, Monitor, Play, MoreVertical } from './Icons';

interface YoutubePreviewProps {
  title: string | null;
}

export const YoutubePreview: React.FC<YoutubePreviewProps> = ({ title }) => {
  const [mode, setMode] = useState<'mobile' | 'desktop'>('desktop');

  return (
    <div className="flex flex-col gap-4 sticky top-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
           <div className={`h-1.5 w-1.5 rounded-full ${title ? 'bg-red-500 animate-pulse' : 'bg-gray-600'}`}></div>
           <span className="text-xs font-mono text-gray-400 uppercase tracking-widest" style={{ color: '#9ca3af' }}>
             {title ? 'Live_Preview' : 'Preview_Standby'}
           </span>
        </div>
        <div className="flex bg-white/5 rounded-lg p-0.5 border border-white/10" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <button
            onClick={() => setMode('mobile')}
            className={`p-1.5 rounded transition-all ${mode === 'mobile' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
            title="Mobile View"
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMode('desktop')}
            className={`p-1.5 rounded transition-all ${mode === 'desktop' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
            title="Desktop View"
          >
            <Monitor className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Preview Container */}
      <div 
        className={`
          bg-[#111111] border border-white/10 rounded-xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] antialiased group/card
          ${mode === 'mobile' ? 'max-w-[375px] mx-auto w-full shadow-[0_10px_40px_rgba(0,0,0,0.5)]' : 'w-full shadow-2xl'}
          ${title ? 'ring-1 ring-white/5' : 'opacity-60 grayscale'}
        `}
        style={{ backgroundColor: '#111111', borderColor: 'rgba(255,255,255,0.1)', borderWidth: '1px', borderStyle: 'solid' }}
      >
        
        {/* Content Wrapper */}
        <div className={`flex ${mode === 'mobile' ? 'flex-row p-3 gap-3' : 'flex-col'}`}>
            
            {/* Thumbnail Section */}
            <div className={`
                relative overflow-hidden bg-white/5 cursor-pointer group/thumb
                ${mode === 'mobile' ? 'w-[160px] h-[90px] rounded-lg flex-shrink-0' : 'w-full aspect-video'}
            `}>
                {/* Thumbnail Background / Gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-800 to-gray-900">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"></div>
                </div>
                
                {/* Play Button Overlay */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 bg-black/20">
                   <div className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center transform scale-90 group-hover/thumb:scale-100 transition-transform duration-300">
                       <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                   </div>
                 </div>

                {/* Duration Badge */}
                <div className="absolute bottom-1.5 right-1.5 bg-black/80 px-1 py-0.5 rounded-[4px] text-[10px] font-bold text-white tracking-wide font-sans">
                    10:24
                </div>
                
                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
                     <div className="w-[40%] h-full bg-red-600"></div>
                </div>
            </div>

            {/* Info Section */}
            <div className={`
                flex 
                ${mode === 'mobile' ? 'flex-col justify-start min-w-0 flex-1 py-0.5' : 'p-3 flex-row gap-3 items-start'}
            `}>
                
                {/* Avatar (Desktop Only) */}
                {mode === 'desktop' && (
                    <div className="flex-shrink-0 mt-0.5">
                         <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border border-black/50 shadow-sm"></div>
                    </div>
                )}

                {/* Text Content */}
                <div className="flex flex-col gap-1 w-full min-w-0">
                     {/* Title */}
                     <h3 
                       className={`
                         text-white font-sans font-medium leading-snug break-words group-hover/card:text-[#3ea6ff] transition-colors duration-200
                         ${mode === 'mobile' ? 'text-sm line-clamp-2 mb-1' : 'text-base font-semibold line-clamp-2'}
                       `}
                       style={{ color: '#ffffff' }}
                     >
                       {title || "Your Viral Video Title Will Appear Here..."}
                     </h3>

                     {/* Metadata */}
                     <div className="flex flex-col">
                         {mode === 'desktop' ? (
                             <>
                                 <div className="text-[#aaa] text-sm hover:text-white transition-colors cursor-pointer flex items-center gap-1 mb-0.5">
                                     Creator Hub <div className="bg-gray-500 text-black text-[8px] p-0.5 rounded-full w-3 h-3 flex items-center justify-center" title="Verified">✓</div>
                                 </div>
                                 <div className="text-[#aaa] text-sm flex items-center gap-1">
                                     <span>1.2M views</span>
                                     <span className="text-[10px]">•</span>
                                     <span>2 hours ago</span>
                                 </div>
                             </>
                         ) : (
                             // Mobile Metadata
                             <div className="text-[#aaa] text-xs flex flex-wrap items-center gap-1 leading-tight mt-auto">
                                 <span className="hover:text-white transition-colors">Creator Hub</span>
                                 <span className="text-[8px]">•</span>
                                 <span>1.2M views</span>
                                 <span className="text-[8px]">•</span>
                                 <span>2h ago</span>
                             </div>
                         )}
                     </div>
                </div>

                {/* Menu Dots */}
                {mode === 'desktop' && (
                    <div className="flex-shrink-0 -mr-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
                         <button className="p-2 hover:bg-white/10 rounded-full active:bg-white/20 transition-colors">
                             <MoreVertical className="w-5 h-5 text-white" />
                         </button>
                    </div>
                )}
                 {mode === 'mobile' && (
                    <div className="flex-shrink-0 -mr-2 -mt-1">
                         <button className="p-2 text-white/60 hover:text-white">
                             <MoreVertical className="w-4 h-4" />
                         </button>
                    </div>
                )}
            </div>
        </div>
      </div>
      
      {/* Helper Text */}
      <div className="text-center opacity-60">
         <p className="text-[10px] font-mono text-gray-500">
           {mode === 'mobile' ? 'PREVIEW: MOBILE SEARCH RESULT' : 'PREVIEW: DESKTOP HOME FEED'}
         </p>
      </div>
    </div>
  );
};