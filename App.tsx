import React, { useState } from 'react';
import './index.css'; 
import { Wand2, Terminal, AlertCircle, Sparkles } from './components/Icons';
import { ResultCard } from './components/ResultCard';
import { YoutubePreview } from './components/YoutubePreview';
import { generateTitles } from './services/geminiService';
import { TitleResult } from './types';

// Metadata mimic for Vercel/Next.js compatibility recognition
export const metadata = {
  title: 'ViralTitle AI',
  description: 'High-Performance YouTube Title Generator',
};

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

  // INLINE STYLES CONSTANTS FOR FAIL-SAFE RENDERING
  const STYLES = {
    container: { backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh' },
    card: { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', borderStyle: 'solid', borderWidth: '1px' },
    input: { backgroundColor: '#000000', color: '#ffffff', borderColor: 'rgba(255,255,255,0.1)' },
    button: { backgroundColor: '#3b82f6', color: '#ffffff' },
    accentText: { color: '#3b82f6' }
  };

  return (
    <div 
      className="min-h-screen bg-black text-white p-4 md:p-8 font-sans selection:bg-blue-500/30"
      style={STYLES.container}
    >
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-20 pt-10">
        
        {/* Header */}
        <header className="flex flex-col items-center text-center gap-6">
          <div 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            style={{ border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)' }}
          >
            <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" style={{ backgroundColor: '#3b82f6' }}></span>
            </span>
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest" style={{ color: '#9ca3af' }}>v2.0 // Stable Build</span>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white" style={{ color: '#ffffff' }}>
              ViralTitle<span className="text-blue-500" style={STYLES.accentText}>_AI</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto font-light" style={{ color: '#9ca3af' }}>
              Engineered for high-CTR. Optimized for the 2026 algorithm.
            </p>
          </div>
        </header>

        {/* Main Input Area */}
        <section className="w-full max-w-3xl mx-auto">
          <div 
            className="group rounded-xl bg-white/5 border border-white/10 p-1 focus-within:border-blue-500/50 transition-all duration-300 shadow-2xl"
            style={STYLES.card}
          >
             <div className="relative bg-black rounded-lg p-6 space-y-4" style={{ backgroundColor: '#0a0a0a' }}>
                <div className="flex justify-between items-center text-xs font-mono text-gray-500 uppercase tracking-wider">
                  <span className="flex items-center gap-2" style={{ color: '#6b7280' }}>
                    <Terminal size={14} className="text-blue-500" style={{ color: '#3b82f6' }}/> 
                    Input Sequence
                  </span>
                  <span className="border border-white/10 px-2 py-1 rounded" style={{ borderColor: 'rgba(255,255,255,0.1)', borderStyle: 'solid', borderWidth: '1px' }}>
                    CMD + ENTER
                  </span>
                </div>
                
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="What is your video about? (e.g. 'Ultimate Guide to React Hooks')"
                  className="w-full bg-transparent text-white placeholder-gray-600 text-lg font-mono focus:outline-none resize-none min-h-[120px]"
                  style={{ backgroundColor: 'transparent', color: '#ffffff', outline: 'none' }}
                  spellCheck={false}
                />

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleGenerate}
                    disabled={isLoading || !topic.trim()}
                    className={`
                      flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all
                      ${isLoading || !topic.trim() 
                        ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5' 
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                      }
                    `}
                    style={{
                      backgroundColor: isLoading || !topic.trim() ? 'rgba(255,255,255,0.05)' : '#3b82f6',
                      color: isLoading || !topic.trim() ? '#6b7280' : '#ffffff',
                      cursor: isLoading || !topic.trim() ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Running Heuristics...</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Wand2 size={16} />
                        <span>Generate Titles</span>
                      </span>
                    )}
                  </button>
                </div>
             </div>
          </div>

          {error && (
            <div 
              className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400"
              style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171' }}
            >
              <AlertCircle size={20} />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}
        </section>

        {/* Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* List Results */}
          <div className="lg:col-span-7 space-y-4">
             <div className="flex items-center gap-2 pb-2 border-b border-white/10 mb-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <div 
                  className={`w-2 h-2 rounded-full ${results.length > 0 ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-gray-700'}`}
                  style={{ backgroundColor: results.length > 0 ? '#22c55e' : '#374151' }}
                ></div>
                <h3 className="text-sm font-mono text-gray-400 uppercase tracking-widest" style={{ color: '#9ca3af' }}>
                  Generated Output ({results.length})
                </h3>
             </div>

             {results.length === 0 && !isLoading && (
               <div 
                  className="h-64 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-xl bg-white/5 text-gray-600 font-mono text-sm"
                  style={{ borderColor: 'rgba(255,255,255,0.1)', borderStyle: 'dashed', backgroundColor: 'rgba(255,255,255,0.02)', color: '#4b5563' }}
                >
                 <Terminal size={32} className="mb-4 opacity-50"/>
                 <span>AWAITING INPUT STREAM...</span>
               </div>
             )}

             <div className="space-y-3">
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

          {/* Preview Panel */}
          <div className="lg:col-span-5 sticky top-8">
             <div className="flex items-center gap-2 pb-2 border-b border-white/10 mb-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <div 
                  className={`w-2 h-2 rounded-full ${activeTitleIndex !== null ? 'bg-red-500 animate-pulse' : 'bg-gray-700'}`}
                  style={{ backgroundColor: activeTitleIndex !== null ? '#ef4444' : '#374151' }}
                ></div>
                <h3 className="text-sm font-mono text-gray-400 uppercase tracking-widest" style={{ color: '#9ca3af' }}>Live Preview</h3>
             </div>
             <YoutubePreview title={activeTitleIndex !== null ? results[activeTitleIndex].title : null} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default App;