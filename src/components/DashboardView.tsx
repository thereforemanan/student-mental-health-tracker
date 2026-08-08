import React, { useState } from 'react';
import { 
  Clock, 
  Eye, 
  Sparkles, 
  Sliders, 
  Share2, 
  Layers, 
  Activity, 
  Check, 
  ArrowUpRight, 
  Laptop, 
  Tablet, 
  Smartphone
} from 'lucide-react';
import { GlassConfig } from '../types';

interface DashboardViewProps {
  onOpenEditModal: () => void;
  onOpenShareModal: () => void;
  onOpenAIModal: () => void;
  glassConfig: GlassConfig;
  onSelectTab: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenEditModal,
  onOpenShareModal,
  onOpenAIModal,
  glassConfig,
  onSelectTab,
}) => {
  const [activeFilter, setActiveFilter] = useState<'neural' | 'neon' | 'frosted' | 'minimal'>('neural');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [interactiveCounter, setInteractiveCounter] = useState(142);
  const [isCopiedToken, setIsCopiedToken] = useState(false);

  const filterStyles = {
    neural: 'from-indigo-500/30 via-purple-500/20 to-blue-500/10 border-indigo-500/30',
    neon: 'from-cyan-500/30 via-indigo-500/20 to-pink-500/10 border-cyan-500/30',
    frosted: 'from-white/15 via-white/10 to-white/5 border-white/20',
    minimal: 'from-slate-800/40 via-slate-900/40 to-black/40 border-white/10',
  };

  const handleCopyCSS = () => {
    const cssSnippet = `backdrop-filter: blur(${glassConfig.blur}px);\nbackground: rgba(255, 255, 255, ${glassConfig.bgOpacity / 100});\nborder: 1px solid rgba(255, 255, 255, ${glassConfig.borderOpacity / 100});`;
    navigator.clipboard.writeText(cssSnippet);
    setIsCopiedToken(true);
    setTimeout(() => setIsCopiedToken(false), 2000);
  };

  return (
    <div className="flex-1 p-6 lg:p-10 grid grid-cols-12 gap-6 auto-rows-min max-w-7xl mx-auto w-full">
      {/* 1. Main Visual Card (Visionary Redesign) */}
      <div className="col-span-12 xl:col-span-8 row-span-4 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-6 lg:p-8 flex flex-col relative overflow-hidden group shadow-2xl">
        {/* Top Right Live Badge */}
        <div className="absolute top-6 right-6 lg:top-8 lg:right-8 z-10 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-medium backdrop-blur-md flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Live Preview
          </span>
        </div>

        {/* Header Text */}
        <div className="mb-6 z-10">
          <h2 className="text-3xl lg:text-4xl font-light mb-2 text-white">
            Visionary <span className="font-bold text-indigo-400">Redesign</span>
          </h2>
          <p className="text-slate-400 max-w-md text-xs lg:text-sm leading-relaxed">
            Applying neural-based aesthetic filters to the primary component library for the next major release.
          </p>
        </div>

        {/* Interactive Neural Filter Sandbox Preview Area */}
        <div className="my-auto z-10 p-5 rounded-2xl bg-black/20 border border-white/10 backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10">
              {(['neural', 'neon', 'frosted', 'minimal'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                    activeFilter === filter
                      ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Device Frame View Switches */}
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${previewDevice === 'desktop' ? 'bg-white/20 text-white' : 'text-slate-400'}`}
                title="Desktop View"
              >
                <Laptop className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setPreviewDevice('tablet')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${previewDevice === 'tablet' ? 'bg-white/20 text-white' : 'text-slate-400'}`}
                title="Tablet View"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${previewDevice === 'mobile' ? 'bg-white/20 text-white' : 'text-slate-400'}`}
                title="Mobile View"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Card Stage */}
          <div className={`
            p-5 rounded-xl bg-gradient-to-br ${filterStyles[activeFilter]} border backdrop-blur-2xl transition-all duration-300
            ${previewDevice === 'mobile' ? 'max-w-xs mx-auto' : previewDevice === 'tablet' ? 'max-w-md mx-auto' : 'w-full'}
          `}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></div>
                <span className="text-[10px] text-slate-300 font-mono ml-2">UI_Component_Glass_v2.4</span>
              </div>
              <button
                onClick={handleCopyCSS}
                className="text-[10px] font-mono text-indigo-300 hover:text-indigo-200 bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded border border-white/10 flex items-center gap-1"
              >
                {isCopiedToken ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Layers className="w-3 h-3" />
                    <span>Copy CSS</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white">Neural Translucency Engine</h4>
                  <p className="text-[11px] text-slate-300">Glass opacity: {glassConfig.bgOpacity}% • Blur: {glassConfig.blur}px</p>
                </div>
                <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg text-xs font-mono text-white">
                  <Activity className="w-3 h-3 text-emerald-400" />
                  <span>{interactiveCounter} fps</span>
                </div>
              </div>

              {/* Interactive Sandbox Button */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setInteractiveCounter((c) => c + 1)}
                  className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-medium border border-white/20 transition-all active:scale-95 shadow-sm"
                >
                  Test Click (+1 FPS)
                </button>
                <span className="text-[10px] text-slate-300">
                  Interactive glass test element
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-4 z-10">
          <button
            onClick={onOpenEditModal}
            className="px-6 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/25 transition-all duration-200 active:scale-98 flex items-center gap-2"
          >
            <Sliders className="w-4 h-4" />
            <span>Edit Assets</span>
          </button>
          
          <button
            onClick={onOpenShareModal}
            className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold border border-white/10 backdrop-blur-md transition-all duration-200 active:scale-98 flex items-center gap-2"
          >
            <Share2 className="w-4 h-4 text-slate-300" />
            <span>Share Library</span>
          </button>

          <button
            onClick={onOpenAIModal}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 text-purple-200 font-semibold border border-purple-500/30 backdrop-blur-md transition-all duration-200 active:scale-98 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>AI Transform</span>
          </button>
        </div>

        {/* Decorative Radial Glow Element */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-indigo-500/30 transition-all duration-500" />
      </div>

      {/* 2. Stats Widget 1 (Active Sessions) */}
      <div 
        onClick={() => onSelectTab('analytics')}
        className="col-span-12 sm:col-span-6 xl:col-span-4 row-span-2 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-6 flex flex-col justify-between hover:bg-white/10 transition-all cursor-pointer group shadow-xl"
      >
        <div className="flex justify-between items-start">
          <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/10 shadow-lg shadow-purple-500/10">
            <Clock className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <span>UP 12%</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-3xl lg:text-4xl font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
            24.8k
          </p>
          <div className="flex items-center justify-between mt-1">
            <p className="text-sm text-slate-400">Active Sessions</p>
            <span className="text-[10px] text-slate-500">Realtime telemetry</span>
          </div>
          
          {/* Micro Sparkline visual */}
          <div className="mt-3 flex items-end gap-1 h-6">
            {[40, 65, 50, 80, 75, 90, 85, 100].map((h, i) => (
              <div 
                key={i} 
                className="flex-1 bg-purple-500/30 rounded-t group-hover:bg-purple-400/50 transition-all" 
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 3. Stats Widget 2 (Latency Avg) */}
      <div 
        onClick={() => onSelectTab('analytics')}
        className="col-span-12 sm:col-span-6 xl:col-span-4 row-span-2 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-6 flex flex-col justify-between hover:bg-white/10 transition-all cursor-pointer group shadow-xl"
      >
        <div className="flex justify-between items-start">
          <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/10 shadow-lg shadow-blue-500/10">
            <Eye className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-300 font-medium bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
            <span>STABLE</span>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-3xl lg:text-4xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
            1.2ms
          </p>
          <div className="flex items-center justify-between mt-1">
            <p className="text-sm text-slate-400">Latency Avg</p>
            <span className="text-[10px] text-slate-500">Cloud Run edge network</span>
          </div>

          {/* Latency pulse bars */}
          <div className="mt-3 flex items-center justify-between gap-2 text-[10px] font-mono text-slate-400">
            <span className="text-emerald-400">US-West: 0.9ms</span>
            <span className="text-blue-400">EU-Central: 1.4ms</span>
          </div>
        </div>
      </div>

      {/* 4. Activity Feed / Team Presence */}
      <div className="col-span-12 row-span-2 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Avatar Stack */}
          <div className="flex -space-x-3.5 overflow-hidden p-1">
            <div className="w-12 h-12 rounded-full border-2 border-[#0A0C14] bg-indigo-500 flex items-center justify-center font-bold text-sm text-white shadow-md shadow-indigo-500/30">
              AM
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-[#0A0C14] bg-purple-500 flex items-center justify-center font-bold text-sm text-white shadow-md shadow-purple-500/30">
              SK
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-[#0A0C14] bg-emerald-500 flex items-center justify-center font-bold text-sm text-white shadow-md shadow-emerald-500/30">
              TL
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-[#0A0C14] bg-slate-700 flex items-center justify-center text-sm font-semibold text-slate-200 shadow-md">
              +4
            </div>
          </div>

          <div>
            <p className="font-semibold text-white text-base flex items-center gap-2">
              Team Presence
              <span className="text-xs font-normal text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Active Huddle
              </span>
            </p>
            <p className="text-xs lg:text-sm text-slate-400">7 designers active on this workspace</p>
          </div>
        </div>

        <div className="flex items-center gap-4 self-end sm:self-center">
          <button
            onClick={() => onSelectTab('messages')}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 backdrop-blur-md transition-all flex items-center gap-2"
          >
            <span>Open Chat Thread</span>
          </button>

          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-pulse"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500/30"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500/30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
