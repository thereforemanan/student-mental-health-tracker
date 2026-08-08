import React, { useState } from 'react';
import { Search, Bell, Menu, ChevronDown, CheckCircle2, SlidersHorizontal, Sparkles } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenMobileSidebar: () => void;
  onToggleNotifications: () => void;
  unreadNotificationsCount?: number;
  onOpenAIModal?: () => void;
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenMobileSidebar,
  onToggleNotifications,
  unreadNotificationsCount = 2,
  onOpenAIModal,
  title = "Project Workspace",
  subtitle = "Creative Assets / Q4 Campaign"
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="h-20 flex items-center justify-between px-6 lg:px-10 border-b border-white/5 bg-white/5 backdrop-blur-md sticky top-0 z-30">
      {/* Left: Mobile Menu & Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-xl lg:text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
            {title}
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Sync
            </span>
          </h1>
          <p className="text-xs lg:text-sm text-slate-400">{subtitle}</p>
        </div>
      </div>

      {/* Right: Search, Notifications & User Avatar */}
      <div className="flex items-center gap-3 lg:gap-5">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search assets, campaign tags..."
            className="w-52 lg:w-72 bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-9 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all backdrop-blur-md"
          />
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs bg-white/10 rounded-full w-4 h-4 flex items-center justify-center"
            >
              ×
            </button>
          )}
        </div>

        {/* AI Generator Quick Trigger */}
        {onOpenAIModal && (
          <button
            onClick={onOpenAIModal}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 border border-indigo-500/30 text-xs font-semibold backdrop-blur-md transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Generate Asset</span>
          </button>
        )}

        {/* Notification Bell */}
        <button
          onClick={onToggleNotifications}
          className="relative p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/50 border border-[#0A0C14]">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 group p-1 rounded-full hover:bg-white/5 transition-all"
          >
            <div className="w-10 h-10 rounded-full border-2 border-indigo-500/40 p-0.5 shadow-md shadow-indigo-500/10 group-hover:border-indigo-400 transition-all">
              <div className="w-full h-full rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-white bg-gradient-to-br from-indigo-600 to-purple-600">
                JD
              </div>
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-semibold text-white leading-tight">John Doe</span>
              <span className="text-[10px] text-slate-400">Lead Art Director</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:block group-hover:text-white transition-colors" />
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#121524] border border-white/10 shadow-2xl p-2 z-50 backdrop-blur-2xl text-slate-200 text-xs">
              <div className="px-3 py-2 border-b border-white/10 mb-1">
                <p className="font-semibold text-white">John Doe</p>
                <p className="text-[10px] text-slate-400">john.doe@lumina.design</p>
              </div>
              <div className="space-y-1">
                <button 
                  onClick={() => setShowUserMenu(false)}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/10 flex items-center justify-between"
                >
                  <span>Active Workspace</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </button>
                <button 
                  onClick={() => setShowUserMenu(false)}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/10 flex items-center gap-2"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                  <span>Display Preferences</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
