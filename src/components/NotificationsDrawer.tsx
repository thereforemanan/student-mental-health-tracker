import React from 'react';
import { X, Check, Bell, Sparkles, FolderKanban, MessageSquare, ShieldCheck } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead
}) => {
  if (!isOpen) return null;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'edit':
        return <FolderKanban className="w-4 h-4 text-indigo-400" />;
      case 'comment':
        return <MessageSquare className="w-4 h-4 text-purple-400" />;
      case 'share':
        return <Sparkles className="w-4 h-4 text-emerald-400" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over Panel */}
      <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-[#121524] border-l border-white/10 shadow-2xl p-6 flex flex-col backdrop-blur-2xl text-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-lg">Activity Stream</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllRead}
              className="text-xs text-indigo-300 hover:text-indigo-200 underline font-medium"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="space-y-3 overflow-y-auto flex-1 pr-1">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all ${
                item.read 
                  ? 'bg-white/5 border-white/5 opacity-75' 
                  : 'bg-indigo-500/10 border-indigo-500/20 shadow-md'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/10 shrink-0">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-white">
                    <span className="text-indigo-300">{item.user}</span> {item.action} <span className="text-slate-200">{item.target}</span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">{item.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 mt-4 text-center">
          <p className="text-[11px] text-slate-400">Lumina Live Sync Engine v2.4</p>
        </div>
      </aside>
    </>
  );
};
