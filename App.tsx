"use client";

import React, { useState } from 'react';
import './index.css'; // Importing globals
import { Wand2, Terminal, AlertCircle, Sparkles } from './components/Icons';
import { ResultCard } from './components/ResultCard';
import { YoutubePreview } from './components/YoutubePreview';
import { generateTitles } from './services/geminiService';
import { TitleResult } from './types';

const App: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<TitleResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeTitleIndex, setActiveTitleIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsLoading(true);
    setError(null);
    setResults([]);
    setActiveTitleIndex(null);

    try {
      const generatedTitles = await generateTitles(topic);
      setResults(generatedTitles);
      if (generatedTitles.length > 0) {
        setActiveTitleIndex(0); 
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.metaKey) {
      handleGenerate();
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white selection:bg-blue-500/30 font-sans relative overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-black">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 flex flex-col gap-12 sm:gap-20">
        
        {/* Header Section */}
        <header className="flex flex-col items-center text-center gap-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm shadow-sm hover:border-white/[0.15] transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-widest">
              V1.5.0 // Stable
            </span>
          </div>
          
          <div className="space-y-6 max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
              ViralTitle<span className="text-blue-500 text-glow">_AI</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed">
              Generate high-CTR YouTube titles using advanced heuristics and AI.
              <br className="hidden md:block" />
              Optimized for maximum viral growth.
            </p>
          </div>
        </header>

        {/* Input & Interaction Layer */}
        <div className="w-full max-w-3xl mx-auto animate-slide-up">
          <div className="glass-panel rounded-2xl p-1.5 shadow-2xl shadow-black/50">
            <div className="bg-black/40 rounded-xl border border-white/[0.05] p-6 md:p-8 space-y-6 backdrop-blur-sm">
              
              <div className="flex items-center justify-between">
                <label htmlFor="topic" className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-500" />
                  Input_Parameters
                </label>
                <div className="flex items-center gap-2">
                   <span className="hidden md:inline-flex items-center gap-1.5 text-[10px] font-mono text-slate-500 border border-white/[0.08] rounded px-2 py-1 bg-white/[0.02]">
                     CMD + ENTER TO RUN
                   </span>
                </div>
              </div>

              <div className="relative group">
                <textarea
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe your video topic... (e.g. 'iPhone 15 Review' or 'How to cook steak')"
                  className="w-full bg-[#0A0A0A] text-white placeholder:text-slate-600 border border-white/[0.1] rounded-lg p-5 min-h-[140px] focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-mono text-sm resize-none leading-relaxed shadow-inner"
                  spellCheck={false}
                />
                <div className="absolute bottom-4 right-4 pointer-events-none">
                  <Sparkles className={`w-4 h-4 text-blue-500/50 transition-opacity duration-300 ${topic ? 'opacity-100' : 'opacity-0'}`} />
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isLoading || !topic.trim()}
                className={`
                  w-full relative overflow-hidden h-14 rounded-lg font-medium text-sm tracking-wide transition-all duration-300
                  ${isLoading || !topic.trim() 
                    ? 'bg-white/[0.05] text-slate-500 cursor-not-allowed border border-white/[0.05]' 
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] border border-blue-500/50 transform active:scale-[0.99]'
                  }
                `}
              >
                <div className="flex items-center justify-center gap-2.5 relative z-10">
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>PROCESSING HEURISTICS...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4" />
                      <span>GENERATE TITLES</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3 animate-fade-in">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-red-400">Generation Failed</h3>
                <p className="text-sm text-red-400/80 leading-relaxed">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 w-full animate-slide-up" style={{ animationDelay: '100ms' }}>
           
           {/* Left: Console Output */}
           <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <h2 className="text-sm font-mono text-slate-400 uppercase tracking-widest flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${results.length > 0 ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse' : 'bg-slate-700'}`}></div>
                  Output_Console (0)
                </h2>
                {results.length > 0 && (
                   <span className="text-[10px] text-slate-500 font-mono bg-white/[0.05] px-2 py-1 rounded">
                     {results.length} VARIANTS GENERATED
                   </span>
                )}
              </div>
              
              <div className="flex flex-col gap-4 min-h-[200px]">
                 {results.length === 0 && !isLoading && (
                   <div className="flex flex-col items-center justify-center py-20 border border-white/[0.05] border-dashed rounded-xl bg-white/[0.01]">
                      <Terminal className="w-10 h-10 text-slate-800 mb-4" />
                      <p className="text-sm font-mono text-slate-600">NO DATA GENERATED</p>
                   </div>
                 )}
                 
                 {results.map((result, index) => (
                   <ResultCard 
                     key={index} 
                     result={result} 
                     index={index} 
                     isActive={index === activeTitleIndex}
                     onClick={() => setActiveTitleIndex(index)}
                   />
                 ))}
              </div>
           </div>

           {/* Right: Live Preview */}
           <div className="lg:col-span-5">
              <div className="sticky top-8 space-y-4">
                 <YoutubePreview 
                   title={activeTitleIndex !== null ? results[activeTitleIndex].title : null} 
                 />
                 
                 <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                    <h3 className="text-xs font-mono text-slate-500 uppercase mb-2">System Status</h3>
                    <div className="flex items-center gap-2 text-xs text-green-500 font-mono">
                      <span>●</span>
                      <span>SYSTEM READY // WAITING FOR INPUT</span>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </main>
    </div>
  );
};

export default App;