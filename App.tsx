import React, { useState } from 'react';
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
    <div 
      className="min-h-screen w-full bg-black text-white selection:bg-blue-500/30 font-sans"
      style={{ backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh', position: 'relative' }}
    >
      
      {/* Background Effects - with inline fallbacks */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ overflow: 'hidden' }}>
        <div 
          className="absolute inset-0 bg-grid-white opacity-[0.2]" 
          style={{ 
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', 
            backgroundSize: '40px 40px',
            opacity: 0.2
          }} 
        />
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-900/20 blur-[100px] rounded-full opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(0,0,0,0) 70%)',
            top: '-100px',
            left: '50%',
            transform: 'translateX(-50%)',
            position: 'absolute',
            width: '1000px',
            height: '500px',
            pointerEvents: 'none'
          }}
        />
      </div>

      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-16">
        
        {/* Header Section */}
        <header className="flex flex-col items-center text-center gap-6">
          <div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', borderStyle: 'solid', borderWidth: '1px' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" style={{ backgroundColor: '#3b82f6' }}></span>
            </span>
            <span className="font-mono text-[11px] font-medium text-gray-400 uppercase tracking-widest">
              V1.5.0 // Stable Build
            </span>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white" style={{ fontFamily: 'Inter, sans-serif', color: '#ffffff' }}>
              ViralTitle<span className="text-blue-500" style={{ color: '#3b82f6' }}>_AI</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto font-light leading-relaxed" style={{ color: '#9ca3af' }}>
              Generate high-CTR YouTube titles using advanced heuristics. 
              Optimized for maximum viral potential.
            </p>
          </div>
        </header>

        {/* Input Interface */}
        <div className="w-full max-w-3xl mx-auto">
          <div 
            className="glass-panel rounded-2xl p-2 shadow-2xl shadow-black/50"
            style={{ backgroundColor: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="bg-black/40 rounded-xl border border-white/5 p-6 md:p-8 space-y-6" style={{ backgroundColor: 'rgba(0,0,0,0.4)', borderColor: 'rgba(255,255,255,0.05)' }}>
              
              <div className="flex items-center justify-between">
                <label htmlFor="topic" className="text-xs font-mono font-medium text-gray-400 uppercase tracking-wider flex items-center gap-2" style={{ color: '#9ca3af' }}>
                  <Terminal className="w-4 h-4 text-blue-500" style={{ color: '#3b82f6' }} />
                  Prompt Parameters
                </label>
                <div className="flex items-center gap-2">
                   <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono text-gray-600 border border-white/5 rounded px-1.5 py-0.5" style={{ color: '#4b5563', borderColor: 'rgba(255,255,255,0.05)' }}>
                     ⌘ + ENTER
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
                  className="w-full bg-[#0A0A0A] text-white placeholder:text-gray-600 border border-white/10 rounded-lg p-4 min-h-[120px] focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-mono text-sm resize-none leading-relaxed"
                  style={{ 
                    backgroundColor: '#0A0A0A', 
                    color: '#ffffff', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontFamily: 'JetBrains Mono, monospace'
                  }}
                  spellCheck={false}
                />
                <div className="absolute bottom-3 right-3 pointer-events-none">
                  <Sparkles className={`w-4 h-4 text-blue-500/50 transition-opacity duration-300 ${topic ? 'opacity-100' : 'opacity-0'}`} />
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isLoading || !topic.trim()}
                className={`
                  w-full relative overflow-hidden h-12 rounded-lg font-medium text-sm transition-all duration-300
                  ${isLoading || !topic.trim() 
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5' 
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg'
                  }
                `}
                style={{
                  backgroundColor: isLoading || !topic.trim() ? 'rgba(255,255,255,0.05)' : '#3b82f6',
                  color: isLoading || !topic.trim() ? '#6b7280' : '#ffffff',
                  border: isLoading || !topic.trim() ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  cursor: isLoading || !topic.trim() ? 'not-allowed' : 'pointer'
                }}
              >
                <div className="flex items-center justify-center gap-2 relative z-10">
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Optimizing Titles...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4" />
                      <span>Generate Variations</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-red-400">Generation Failed</h3>
                <p className="text-sm text-red-400/80">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full">
           
           {/* Left: Console Output */}
           <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <h2 className="text-sm font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2" style={{ color: '#9ca3af' }}>
                  <span 
                    className={`w-2 h-2 rounded-full ${results.length > 0 ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-gray-700'}`}
                    style={{ backgroundColor: results.length > 0 ? '#22c55e' : '#374151' }}
                  ></span>
                  Output Console
                </h2>
                {results.length > 0 && (
                   <span className="text-xs text-gray-500 font-mono">{results.length} RESULTS FOUND</span>
                )}
              </div>
              
              <div className="flex flex-col gap-3 min-h-[200px]">
                 {results.length === 0 && !isLoading && (
                   <div 
                    className="flex flex-col items-center justify-center py-12 border border-white/5 border-dashed rounded-xl bg-white/[0.01]"
                    style={{ borderColor: 'rgba(255,255,255,0.05)', borderStyle: 'dashed', backgroundColor: 'rgba(255,255,255,0.01)' }}
                   >
                      <Terminal className="w-8 h-8 text-gray-700 mb-3" style={{ color: '#374151' }} />
                      <p className="text-sm font-mono text-gray-600" style={{ color: '#4b5563' }}>AWAITING INPUT STREAM...</p>
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
              <div className="sticky top-8">
                 <YoutubePreview 
                   title={activeTitleIndex !== null ? results[activeTitleIndex].title : null} 
                 />
              </div>
           </div>

        </div>
      </main>
    </div>
  );
};

export default App;