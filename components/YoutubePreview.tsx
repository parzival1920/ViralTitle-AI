import React, { useState } from 'react';
import { Smartphone, Monitor, Play, MoreVertical } from './Icons';

interface YoutubePreviewProps {
  title: string | null;
}

export const YoutubePreview: React.FC<YoutubePreviewProps> = ({ title }) => {
  const [mode, setMode] = useState<'mobile' | 'desktop'>('desktop');

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-700">
      
      {/* Toggle Controls */}
      <div className="flex justify-end">
        <div 
          className="flex bg-white/5 rounded-lg p-1 border border-white/10"
          style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', borderWidth: '1px' }}
        >
          <button
            onClick={() => setMode('mobile')}
            className={`p-2 rounded-md transition-all ${mode === 'mobile' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
            style={{ 
              backgroundColor: mode === 'mobile' ? 'rgba(255,255,255,0.1)' : 'transparent',
              color: mode === 'mobile' ? '#ffffff' : '#6b7280'
            }}
          >
            <Smartphone size={16} />
          </button>
          <button
            onClick={() => setMode('desktop')}
            className={`p-2 rounded-md transition-all ${mode === 'desktop' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
            style={{ 
              backgroundColor: mode === 'desktop' ? 'rgba(255,255,255,0.1)' : 'transparent',
              color: mode === 'desktop' ? '#ffffff' : '#6b7280'
            }}
          >
            <Monitor size={16} />
          </button>
        </div>
      </div>

      {/* Card Container */}
      <div 
        className={`
          bg-[#111111] border border-white/10 overflow-hidden transition-all duration-300 ease-out mx-auto
          ${mode === 'mobile' ? 'w-[375px] rounded-lg shadow-2xl' : 'w-full rounded-xl'}
        `}
        style={{ 
          backgroundColor: '#111111', 
          borderColor: 'rgba(255,255,255,0.1)', 
          borderWidth: '1px', 
          borderStyle: 'solid',
          maxWidth: mode === 'mobile' ? '375px' : '100%' 
        }}
      >
        <div className={`flex ${mode === 'mobile' ? 'flex-col' : 'flex-col sm:flex-row gap-4 p-4'}`}>
            
            {/* Thumbnail */}
            <div 
              className={`
                relative bg-gray-900 group cursor-pointer overflow-hidden
                ${mode === 'mobile' ? 'w-full aspect-video' : 'w-full sm:w-[360px] aspect-video rounded-lg'}
              `}
              style={{ backgroundColor: '#111827' }}
            >
               {/* Thumbnail Placeholder Gradient */}
               <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-50" style={{ background: 'linear-gradient(to bottom right, #1f2937, #000000)', opacity: 0.5 }}></div>
               <div className="absolute inset-0 flex items-center justify-center opacity-30 font-mono text-gray-600 text-xs">
                 THUMBNAIL_PREVIEW
               </div>
               
               {/* Duration */}
               <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-1 py-0.5 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.8)', color: '#ffffff' }}>
                 12:45
               </div>

               {/* Hover Play Button */}
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                 <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
                   <Play size={20} className="fill-white text-white ml-1" style={{ fill: '#ffffff', color: '#ffffff' }}/>
                 </div>
               </div>
            </div>

            {/* Content Info */}
            <div className={`
              flex flex-col gap-1
              ${mode === 'mobile' ? 'p-3 flex-row gap-3' : 'flex-1 py-1'}
            `}>
                {mode === 'mobile' && (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0" style={{ background: 'linear-gradient(to bottom right, #3b82f6, #9333ea)' }}></div>
                )}

                <div className="flex-1 min-w-0">
                   <h3 
                    className={`font-sans font-medium text-white leading-snug ${mode === 'mobile' ? 'text-sm line-clamp-2' : 'text-lg line-clamp-2'}`}
                    style={{ color: '#ffffff', fontFamily: 'Inter, sans-serif' }}
                   >
                     {title || "This is how your viral video title will look on YouTube"}
                   </h3>
                   
                   <div className="mt-1 flex flex-wrap items-center gap-1 text-[#aaa] text-xs" style={{ color: '#aaaaaa' }}>
                      <span>ViralChannel</span>
                      {mode === 'desktop' && (
                         <span className="w-3 h-3 bg-gray-600 rounded-full flex items-center justify-center text-[8px] text-black" style={{ backgroundColor: '#4b5563', color: '#000000' }}>✓</span>
                      )}
                      <span>•</span>
                      <span>1.2M views</span>
                      <span>•</span>
                      <span>2 days ago</span>
                   </div>

                   {mode === 'desktop' && (
                     <div className="mt-3 flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" style={{ background: 'linear-gradient(to bottom right, #3b82f6, #9333ea)' }}></div>
                        <span className="text-xs text-gray-400" style={{ color: '#9ca3af' }}>ViralChannel</span>
                     </div>
                   )}
                </div>

                {mode === 'mobile' && (
                  <MoreVertical size={16} className="text-white min-w-[16px]" style={{ color: '#ffffff' }} />
                )}
            </div>
        </div>
      </div>

      <div className="text-center">
         <p className="text-[10px] font-mono text-gray-500" style={{ color: '#6b7280' }}>
            {mode === 'mobile' ? 'PREVIEW: MOBILE FEED' : 'PREVIEW: DESKTOP SEARCH'}
         </p>
      </div>
    </div>
  );
};