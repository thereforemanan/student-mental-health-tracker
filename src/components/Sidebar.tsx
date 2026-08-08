import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  MessageSquare, 
  FolderKanban, 
  Settings, 
  Zap, 
  HardDrive,
  X,
  Sparkles
} from 'lucide-react';
import { NavigationTab } from '../types';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  unreadCount?: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  onOpenAIModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  unreadCount = 3,
  isOpenMobile = false,
  onCloseMobile,
  onOpenAIModal
}) => {
  const navItems = [
    {
      id: 'dashboard' as NavigationTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'analytics' as NavigationTab,
      label: 'Analytics',
      icon: BarChart3,
    },
    {
      id: 'messages' as NavigationTab,
      label: 'Messages',
      icon: MessageSquare,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    {
      id: 'assets' as NavigationTab,
      label: 'Creative Assets',
      icon: FolderKanban,
    },
    {
      id: 'settings' as NavigationTab,
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 h-full bg-white/5 backdrop-blur-2xl border-r border-white/10 
        flex flex-col p-6 transition-transform duration-300 ease-in-out
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header & Brand */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 border border-white/20">
              <Zap className="w-5 h-5 text-white fill-white/20" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white leading-none">
                Lumina<span className="text-indigo-400 font-normal">.Studio</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-1">
                Frosted Workspace
              </span>
            </div>
          </div>
          {onCloseMobile && (
            <button 
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`
                  w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-white/10 text-white border border-white/10 shadow-lg shadow-black/20 font-semibold' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 font-medium'}
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Neural AI Button */}
        {onOpenAIModal && (
          <button
            onClick={onOpenAIModal}
            className="mb-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/30 hover:to-purple-500/30 text-indigo-200 border border-indigo-500/30 backdrop-blur-md transition-all text-xs font-semibold group shadow-md"
          >
            <Sparkles className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform" />
            <span>AI Neural Generator</span>
          </button>
        )}

        {/* Storage Widget */}
        <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent border border-white/10 backdrop-blur-md relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300">Pro Storage</p>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">72%</span>
          </div>
          
          <div className="w-full bg-white/10 h-2 rounded-full mb-2.5 overflow-hidden p-0.5 border border-white/5">
            <div 
              className="bg-gradient-to-r from-indigo-400 to-purple-400 h-full rounded-full shadow-[0_0_10px_rgba(129,140,248,0.6)] transition-all duration-500" 
              style={{ width: '72.4%' }}
            />
          </div>
          
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-slate-300 font-medium">72.4 GB of 100 GB used</span>
            <button 
              onClick={() => onSelectTab('settings')}
              className="text-indigo-400 hover:text-indigo-300 underline font-semibold transition-colors"
            >
              Manage
            </button>
          </div>

          {/* Glow effect on hover */}
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/25 transition-all pointer-events-none" />
        </div>
      </aside>
    </>
  );
};
