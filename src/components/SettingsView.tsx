import React from 'react';
import { Sliders, HardDrive, ShieldCheck, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { GlassConfig } from '../types';

interface SettingsViewProps {
  glassConfig: GlassConfig;
  onUpdateConfig: (newConfig: Partial<GlassConfig>) => void;
  onResetDefaults: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  glassConfig,
  onUpdateConfig,
  onResetDefaults,
}) => {
  return (
    <div className="flex-1 p-6 lg:p-10 space-y-8 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 p-6 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/20">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Studio Engine Settings</h2>
            <p className="text-xs text-slate-400">Configure global frosted glass shaders, storage tiers, and neural processing</p>
          </div>
        </div>

        <button
          onClick={onResetDefaults}
          className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition-all flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Glass Shader Parameters */}
      <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-6 lg:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 className="font-bold text-white text-base">Global Frosted Glass Shader</h3>
            <p className="text-xs text-slate-400">Tweak real-time CSS backdrop filter and translucency variables</p>
          </div>
          <span className="text-xs font-mono text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
            GPU Accelerated
          </span>
        </div>

        <div className="space-y-5">
          {/* Blur Radius */}
          <div>
            <div className="flex justify-between items-center mb-2 text-xs font-medium text-slate-200">
              <span>Backdrop Blur Radius</span>
              <span className="font-mono text-indigo-400 font-bold">{glassConfig.blur}px</span>
            </div>
            <input
              type="range"
              min="4"
              max="64"
              value={glassConfig.blur}
              onChange={(e) => onUpdateConfig({ blur: Number(e.target.value) })}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          {/* Background Opacity */}
          <div>
            <div className="flex justify-between items-center mb-2 text-xs font-medium text-slate-200">
              <span>Background Translucency (Opacity)</span>
              <span className="font-mono text-indigo-400 font-bold">{glassConfig.bgOpacity}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              value={glassConfig.bgOpacity}
              onChange={(e) => onUpdateConfig({ bgOpacity: Number(e.target.value) })}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          {/* Border Opacity */}
          <div>
            <div className="flex justify-between items-center mb-2 text-xs font-medium text-slate-200">
              <span>Border Highlight Opacity</span>
              <span className="font-mono text-indigo-400 font-bold">{glassConfig.borderOpacity}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={glassConfig.borderOpacity}
              onChange={(e) => onUpdateConfig({ borderOpacity: Number(e.target.value) })}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Pro Storage Breakdown */}
      <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-6 lg:p-8 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HardDrive className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="font-bold text-white text-base">Pro Storage Allocation</h3>
              <p className="text-xs text-slate-400">72.4 GB used of 100 GB Cloud Allocation</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Pro Plan Active
          </span>
        </div>

        <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden p-0.5 border border-white/5">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-full w-[72.4%] shadow-[0_0_12px_rgba(129,140,248,0.5)]"></div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <p className="text-slate-400">Component Assets</p>
            <p className="text-sm font-bold text-white mt-0.5">42.1 GB</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <p className="text-slate-400">Neural Models</p>
            <p className="text-sm font-bold text-white mt-0.5">21.8 GB</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <p className="text-slate-400">Cache Logs</p>
            <p className="text-sm font-bold text-white mt-0.5">8.5 GB</p>
          </div>
        </div>
      </div>
    </div>
  );
};
