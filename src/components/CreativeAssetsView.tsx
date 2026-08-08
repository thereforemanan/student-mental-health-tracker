import React, { useState } from 'react';
import { Search, Filter, FolderKanban, Download, Share2, Eye, Plus, Sparkles, Check, Copy } from 'lucide-react';
import { AssetItem } from '../types';

interface CreativeAssetsViewProps {
  searchQuery: string;
  onOpenEditModal: () => void;
  onOpenAIModal: () => void;
  onOpenShareModal: () => void;
}

export const CreativeAssetsView: React.FC<CreativeAssetsViewProps> = ({
  searchQuery,
  onOpenEditModal,
  onOpenAIModal,
  onOpenShareModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const initialAssets: AssetItem[] = [
    {
      id: 'ast-1',
      title: 'Visionary Glass Component Library',
      category: 'UI Kit',
      updatedAt: '2 hours ago',
      author: 'John Doe',
      size: '24.2 MB',
      tags: ['Glassmorphism', 'Neural', 'React', 'Tailwind'],
      gradient: 'from-indigo-500/30 via-purple-500/20 to-blue-500/10',
      blurLevel: '24px Blur',
      downloads: 1420
    },
    {
      id: 'ast-2',
      title: 'Neon Obsidian Dark Mode Theme',
      category: 'Neural Filter',
      updatedAt: 'Yesterday',
      author: 'Anna M.',
      size: '8.1 MB',
      tags: ['Dark Theme', 'Obsidian', 'High Contrast'],
      gradient: 'from-cyan-500/30 via-indigo-500/20 to-pink-500/10',
      blurLevel: '32px Blur',
      downloads: 980
    },
    {
      id: 'ast-3',
      title: '3D Frosted Crystal Vector Icons',
      category: 'Vector',
      updatedAt: '3 days ago',
      author: 'Tina L.',
      size: '42.0 MB',
      tags: ['3D Vector', 'Icons', 'Figma'],
      gradient: 'from-emerald-500/30 via-teal-500/20 to-indigo-500/10',
      blurLevel: '16px Blur',
      downloads: 2310
    },
    {
      id: 'ast-4',
      title: 'Cyber Aurora Modal Container',
      category: 'Component',
      updatedAt: '4 days ago',
      author: 'Sam K.',
      size: '3.4 MB',
      tags: ['Modal', 'Dialog', 'Blur Panel'],
      gradient: 'from-pink-500/30 via-purple-500/20 to-indigo-500/10',
      blurLevel: '20px Blur',
      downloads: 650
    },
    {
      id: 'ast-5',
      title: 'Frosted Glass Telemetry Dashboard',
      category: 'UI Kit',
      updatedAt: '5 days ago',
      author: 'John Doe',
      size: '18.9 MB',
      tags: ['Dashboard', 'Analytics', 'Recharts'],
      gradient: 'from-blue-500/30 via-indigo-500/20 to-purple-500/10',
      blurLevel: '28px Blur',
      downloads: 1890
    },
    {
      id: 'ast-6',
      title: 'Neural Sphere 3D Scene Render',
      category: '3D Render',
      updatedAt: '1 week ago',
      author: 'Tina L.',
      size: '64.5 MB',
      tags: ['3D Scene', 'Blender', 'HDRI'],
      gradient: 'from-purple-500/30 via-indigo-500/20 to-pink-500/10',
      blurLevel: '40px Blur',
      downloads: 870
    }
  ];

  const categories = ['All', 'UI Kit', 'Neural Filter', 'Component', 'Vector', '3D Render'];

  const filteredAssets = initialAssets.filter((asset) => {
    const matchesCategory = selectedCategory === 'All' || asset.category === selectedCategory;
    const matchesSearch = asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopyCSS = (asset: AssetItem) => {
    const css = `/* ${asset.title} Glass Token */\nbackdrop-filter: blur(${asset.blurLevel});\nbackground: rgba(255, 255, 255, 0.05);\nborder: 1px solid rgba(255, 255, 255, 0.1);`;
    navigator.clipboard.writeText(css);
    setCopiedId(asset.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 p-6 lg:p-10 space-y-6 max-w-7xl mx-auto w-full">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 p-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/20">
            <FolderKanban className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Q4 Campaign Asset Repository</h2>
            <p className="text-xs text-slate-400">Design tokens, frosted component kits, and neural style variations</p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          <button
            onClick={onOpenAIModal}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 hover:from-purple-500/30 hover:to-indigo-500/30 text-purple-200 text-xs font-semibold border border-purple-500/30 backdrop-blur-md transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Generate Asset</span>
          </button>

          <button
            onClick={onOpenEditModal}
            className="px-4 py-2.5 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Glass Component</span>
          </button>
        </div>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
              selectedCategory === cat
                ? 'bg-indigo-500 text-white border-indigo-400 shadow-lg shadow-indigo-500/25'
                : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Asset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 p-6 flex flex-col justify-between hover:bg-white/10 transition-all group shadow-xl relative overflow-hidden"
          >
            {/* Asset Preview Frame */}
            <div>
              <div className={`w-full h-36 rounded-2xl bg-gradient-to-br ${asset.gradient} border border-white/15 backdrop-blur-2xl p-4 flex flex-col justify-between mb-4 relative overflow-hidden shadow-inner`}>
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-md text-[10px] font-mono text-indigo-300 border border-white/10">
                    {asset.blurLevel}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-300 bg-white/10 px-2 py-0.5 rounded border border-white/10">
                    {asset.category}
                  </span>
                </div>

                <div className="mt-auto flex items-center justify-between text-[11px] text-slate-200">
                  <span className="font-mono">{asset.size}</span>
                  <span className="text-emerald-400 font-semibold">{asset.downloads} downloads</span>
                </div>
              </div>

              {/* Title & Info */}
              <h3 className="font-bold text-white text-base mb-1 group-hover:text-indigo-300 transition-colors">
                {asset.title}
              </h3>
              <p className="text-xs text-slate-400 mb-3">Updated {asset.updatedAt} by {asset.author}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {asset.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-slate-300">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => handleCopyCSS(asset)}
                className="text-xs text-indigo-300 hover:text-indigo-200 font-mono flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                {copiedId === asset.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied CSS</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Token</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenShareModal}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all"
                  title="Share Asset"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onOpenEditModal}
                  className="p-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 transition-all"
                  title="Inspect / Edit"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
