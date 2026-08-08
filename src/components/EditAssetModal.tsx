import React, { useState } from 'react';
import { X, Sliders, Check, Copy, Eye, Sparkles, Layers } from 'lucide-react';
import { GlassConfig } from '../types';

interface EditAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  glassConfig: GlassConfig;
  onUpdateConfig: (newConfig: Partial<GlassConfig>) => void;
}

export const EditAssetModal: React.FC<EditAssetModalProps> = ({
  isOpen,
  onClose,
  glassConfig,
  onUpdateConfig,
}) => {
  const [copied, setCopied] = useState(false);
  const [componentTitle, setComponentTitle] = useState('Visionary Redesign Card');

  if (!isOpen) return null;

  const cssSnippet = `/* Lumina Frosted Glass Token */\n.glass-card {\n  backdrop-filter: blur(${glassConfig.blur}px);\n  background: rgba(255, 255, 255, ${(glassConfig.bgOpacity / 100).toFixed(2)});\n  border: 1px solid rgba(255, 255, 255, ${(glassConfig.borderOpacity / 100).toFixed(2)});\n}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="bg-[#121524] border border-white/15 rounded-[2.5rem] w-full max-w-2xl p-6 lg:p-8 shadow-2xl relative overflow-hidden text-slate-100 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/20">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Edit Asset Shaders</h3>
              <p className="text-xs text-slate-400">Live parameter inspector for frosted components</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-6 overflow-y-auto flex-1 pr-1">
          {/* Asset Title Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Component Name
            </label>
            <input
              type="text"
              value={componentTitle}
              onChange={(e) => setComponentTitle(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
          </div>

          {/* Live Preview Stage */}
          <div>
            <span className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
              Live Rendered Stage
            </span>
            <div className="p-6 rounded-2xl bg-gradient-to-tr from-indigo-900/40 via-purple-900/20 to-slate-900/60 border border-white/10 relative overflow-hidden flex items-center justify-center min-h-[160px]">
              {/* Rendered Sample Glass Box */}
              <div 
                className="p-6 rounded-2xl border transition-all duration-300 shadow-2xl w-full max-w-sm text-center"
                style={{
                  backdropFilter: `blur(${glassConfig.blur}px)`,
                  WebkitBackdropFilter: `blur(${glassConfig.blur}px)`,
                  backgroundColor: `rgba(255, 255, 255, ${glassConfig.bgOpacity / 100})`,
                  borderColor: `rgba(255, 255, 255, ${glassConfig.borderOpacity / 100})`,
                }}
              >
                <h4 className="font-bold text-white text-base">{componentTitle}</h4>
                <p className="text-xs text-slate-300 mt-1">Blur: {glassConfig.blur}px • Opacity: {glassConfig.bgOpacity}%</p>
                <button className="mt-3 px-4 py-1.5 rounded-xl bg-indigo-500 text-white text-xs font-semibold shadow-md">
                  Sample CTA
                </button>
              </div>

              {/* Decorative aura */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/30 rounded-full blur-2xl pointer-events-none"></div>
            </div>
          </div>

          {/* Controls Sliders */}
          <div className="space-y-4 bg-white/5 p-5 rounded-2xl border border-white/10">
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="text-slate-300 font-medium">Backdrop Blur Radius</span>
                <span className="font-mono text-indigo-400 font-bold">{glassConfig.blur}px</span>
              </div>
              <input
                type="range"
                min="4"
                max="48"
                value={glassConfig.blur}
                onChange={(e) => onUpdateConfig({ blur: Number(e.target.value) })}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="text-slate-300 font-medium">Background Opacity</span>
                <span className="font-mono text-indigo-400 font-bold">{glassConfig.bgOpacity}%</span>
              </div>
              <input
                type="range"
                min="2"
                max="25"
                value={glassConfig.bgOpacity}
                onChange={(e) => onUpdateConfig({ bgOpacity: Number(e.target.value) })}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="text-slate-300 font-medium">Border Brightness</span>
                <span className="font-mono text-indigo-400 font-bold">{glassConfig.borderOpacity}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                value={glassConfig.borderOpacity}
                onChange={(e) => onUpdateConfig({ borderOpacity: Number(e.target.value) })}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </div>

          {/* CSS Code Snippet */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">CSS Token Code</span>
              <button
                onClick={handleCopy}
                className="text-xs text-indigo-300 hover:text-indigo-200 flex items-center gap-1 font-mono"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-indigo-200 overflow-x-auto">
              {cssSnippet}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-white/10 flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
