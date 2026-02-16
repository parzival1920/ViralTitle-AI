import React, { useState } from 'react';
import { Wand2, Terminal, AlertCircle } from './components/Icons';
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
        setActiveTitleIndex(0); // Auto-select first result
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
    <div className="min-h-screen w-full relative overflow-hidden bg-black text-white selection:bg-[#00f3ff]/20 selection:text-[#00f3ff]">
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 grid-bg pointer-events-none opacity-40"></div>
      
      {/* Radial Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-12">
        
        {/* Header */}
        <header className="flex flex-col items-center text-center gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f3ff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f3ff]"></span>
            </span>
            <span className="font-mono text-xs text-gray-300 tracking-wider">V1.5.0 // LIVE PREVIEW</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-mono font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
            ViralTitle_AI
          </h1>
          <p className="text-gray-400 max-w-md font-sans leading-relaxed">
            Generate high-CTR YouTube titles using advanced heuristics and AI. Optimized for viral growth.
          </p>
        </header>

        {/* Input Section */}
        <div className="glass-card rounded-2xl p-1 md:p-1.5 ring-1 ring-white/10 shadow-2xl shadow-black/50 max-w-3xl mx-auto w-full">
           <div className="bg-black/40 rounded-xl p-6 border border-white/5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="topic" className="text-sm font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    Input_Parameters
                  </label>
                  <span className="text-[10px] text-gray-600 font-mono hidden md:inline-block">CMD + ENTER TO RUN</span>
                </div>
                
                <div className="relative group">
                  <textarea
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g. iPhone 15 review, How to bake sourdough, Minecraft survival guide..."
                    className="w-full bg-white/[0.03] text-white placeholder:text-gray-600 border border-white/10 rounded-lg p-4 h-24 focus:outline-none focus:ring-1 focus:ring-[#00f3ff]/50 focus:border-[#00f3ff]/50 focus:bg-white/[0.05] transition-all font-mono text-sm resize-none"
                    spellCheck={false}
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isLoading || !topic.trim()}
                  className={`
                    w-full relative overflow-hidden group h-12 rounded-lg font-mono font-bold text-sm uppercase tracking-wider transition-all duration-300
                    ${isLoading || !topic.trim() ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5' : 'bg-white text-black hover:scale-[1.005] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]'}
                  `}
                >
                  {isLoading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent translate-x-[-100%] animate-[shimmer_1s_infinite]" />
                  )}
                  <div className="flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 transition-transform group-hover:rotate-12" />
                        <span>Generate_Titles</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
           </div>
        </div>

        {/* Error Display */}
        {error && (
            <div className="max-w-3xl mx-auto w-full p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-red-400 font-mono">System Error</h3>
                <p className="text-sm text-red-400/80 leading-relaxed">{error}</p>
              </div>
            </div>
        )}

        {/* Output & Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
           
           {/* Left Column: Results List */}
           <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                <div className={`h-1.5 w-1.5 rounded-full transition-colors ${results.length > 0 ? 'bg-[#00f3ff]' : 'bg-gray-700'}`}></div>
                <h2 className="text-sm font-mono text-gray-400 uppercase tracking-widest">
                  Output_Console ({results.length})
                </h2>
              </div>
              
              <div className="grid gap-3 min-h-[100px]">
                 {results.length === 0 && !isLoading && (
                   <div className="flex flex-col items-center justify-center h-48 border border-white/5 border-dashed rounded-lg bg-white/[0.01]">
                      <span className="text-xs font-mono text-gray-600">NO DATA GENERATED</span>
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

           {/* Right Column: Preview Card */}
           <div className="lg:col-span-2">
              <YoutubePreview 
                title={activeTitleIndex !== null ? results[activeTitleIndex].title : null} 
              />
           </div>

        </div>

        {/* Footer */}
        <footer className="text-center text-gray-600 text-xs font-mono mt-8">
          <p>SYSTEM READY // WAITING FOR INPUT</p>
        </footer>

      </main>
    </div>
  );
};

export default App;