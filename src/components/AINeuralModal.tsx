import React, { useState } from 'react';
import { X, Sparkles, Wand2, Check, Copy, RefreshCw, Layers } from 'lucide-react';

interface AINeuralModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyAsset?: (assetName: string, cssSnippet: string) => void;
}

export const AINeuralModal: React.FC<AINeuralModalProps> = ({ isOpen, onClose, onApplyAsset }) => {
  const [prompt, setPrompt] = useState('Create a frosted cyber emerald glass card with 28px blur and glowing neon border');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<{
    title: string;
    description: string;
    css: string;
    preset: 'neural' | 'neon' | 'frosted' | 'emerald';
  } | null>({
    title: 'Cyber Emerald Glass Container',
    description: 'Neural-optimized glass component with 28px blur, 8% white fill, and subtle emerald glow highlights.',
    css: 'backdrop-filter: blur(28px);\nbackground: rgba(16, 185, 129, 0.08);\nborder: 1px solid rgba(52, 211, 153, 0.25);\nbox-shadow: 0 0 25px rgba(16, 185, 129, 0.15);',
    preset: 'emerald'
  });
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const samplePrompts = [
    'Frosted dark obsidian modal with cyan edge glow',
    'Minimal white glass card with 32px backdrop blur',
    'Cyberpunk neon purple glass tab with floating aura',
    'Liquid glass button with active touch ripple effect'
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);

    // Simulate neural shader generation with preset variety
    setTimeout(() => {
      const p = prompt.toLowerCase();
      let title = 'Custom Neural Glass Shader';
      let css = 'backdrop-filter: blur(24px);\nbackground: rgba(255, 255, 255, 0.06);\nborder: 1px solid rgba(255, 255, 255, 0.15);';
      let preset: 'neural' | 'neon' | 'frosted' | 'emerald' = 'neural';

      if (p.includes('emerald') || p.includes('green')) {
        title = 'Neural Cyber Emerald Panel';
        css = 'backdrop-filter: blur(28px);\nbackground: rgba(16, 185, 129, 0.08);\nborder: 1px solid rgba(52, 211, 153, 0.3);\nbox-shadow: 0 0 30px rgba(16, 185, 129, 0.2);';
        preset = 'emerald';
      } else if (p.includes('neon') || p.includes('purple') || p.includes('cyan')) {
        title = 'Neon Obsidian Glass Shield';
        css = 'backdrop-filter: blur(32px);\nbackground: rgba(168, 85, 247, 0.08);\nborder: 1px solid rgba(192, 132, 252, 0.35);\nbox-shadow: 0 0 35px rgba(168, 85, 247, 0.25);';
        preset = 'neon';
      } else if (p.includes('white') || p.includes('minimal')) {
        title = 'Ultra Pure Frosted Lens';
        css = 'backdrop-filter: blur(36px);\nbackground: rgba(255, 255, 255, 0.12);\nborder: 1px solid rgba(255, 255, 255, 0.25);';
        preset = 'frosted';
      }

      setGeneratedResult({
        title,
        description: `Generated from prompt: "${prompt}"`,
        css,
        preset
      });
      setIsGenerating(false);
    }, 1000);
  };

  const handleCopy = () => {
    if (!generatedResult) return;
    navigator.clipboard.writeText(generatedResult.css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="bg-[#121524] border border-white/15 rounded-[2.5rem] w-full max-w-xl p-6 lg:p-8 shadow-2xl relative overflow-hidden text-slate-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">AI Neural Asset Generator</h3>
              <p className="text-xs text-slate-400">Transform natural text prompts into custom frosted glass tokens</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prompt Input Form */}
        <form onSubmit={handleGenerate} className="space-y-4 mb-6">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Prompt Instructions
          </label>
          <div className="relative">
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the frosted glass aesthetic..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 resize-none"
            />
            <button
              type="submit"
              disabled={isGenerating || !prompt.trim()}
              className="absolute right-3 bottom-3 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white text-xs font-semibold shadow-md flex items-center gap-1.5 transition-all"
            >
              {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              <span>{isGenerating ? 'Synthesizing...' : 'Generate'}</span>
            </button>
          </div>

          {/* Quick Ideas */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold mr-1">Sample prompts:</span>
            {samplePrompts.map((sp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPrompt(sp)}
                className="text-[10px] bg-white/5 hover:bg-white/10 border border-white/10 px-2 py-0.5 rounded-full text-indigo-300 transition-all"
              >
                {sp}
              </button>
            ))}
          </div>
        </form>

        {/* Generated Result Output */}
        {generatedResult && (
          <div className="space-y-4 bg-white/5 p-5 rounded-2xl border border-white/10">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-white text-sm">{generatedResult.title}</h4>
                <p className="text-xs text-slate-400">{generatedResult.description}</p>
              </div>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-indigo-200 text-xs font-mono border border-white/10 flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy CSS'}</span>
              </button>
            </div>

            <pre className="p-3.5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-indigo-200 overflow-x-auto">
              {generatedResult.css}
            </pre>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10"
          >
            Close
          </button>
          {generatedResult && onApplyAsset && (
            <button
              onClick={() => {
                onApplyAsset(generatedResult.title, generatedResult.css);
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25"
            >
              Apply to Workspace
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
