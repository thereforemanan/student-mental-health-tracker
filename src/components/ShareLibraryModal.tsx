import React, { useState } from 'react';
import { X, Share2, Copy, Check, Users, Lock, Globe, Mail } from 'lucide-react';

interface ShareLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareLibraryModal: React.FC<ShareLibraryModalProps> = ({ isOpen, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [invitedList, setInvitedList] = useState<string[]>([]);
  const [accessLevel, setAccessLevel] = useState<'view' | 'edit' | 'admin'>('edit');

  if (!isOpen) return null;

  const shareUrl = 'https://lumina.studio/share/q4-campaign-frosted-v2';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setInvitedList((prev) => [...prev, inviteEmail.trim()]);
    setInviteEmail('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="bg-[#121524] border border-white/15 rounded-[2.5rem] w-full max-w-lg p-6 lg:p-8 shadow-2xl relative overflow-hidden text-slate-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/20">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Share Q4 Campaign Library</h3>
              <p className="text-xs text-slate-400">Invite team members or generate public links</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Invite Input */}
          <form onSubmit={handleInvite} className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Invite Collaborator
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="designer@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>

              <select
                value={accessLevel}
                onChange={(e) => setAccessLevel(e.target.value as any)}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
              >
                <option value="view" className="bg-[#121524]">Can View</option>
                <option value="edit" className="bg-[#121524]">Can Edit</option>
                <option value="admin" className="bg-[#121524]">Admin</option>
              </select>

              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold shrink-0"
              >
                Send
              </button>
            </div>
          </form>

          {/* Invited List */}
          {invitedList.length > 0 && (
            <div className="space-y-2 bg-white/5 p-3 rounded-xl border border-white/10 text-xs">
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Pending Invites</p>
              {invitedList.map((email, idx) => (
                <div key={idx} className="flex items-center justify-between text-slate-200">
                  <span>{email}</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Invite Sent</span>
                </div>
              ))}
            </div>
          )}

          {/* Share Link Box */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
              Shareable Workspace Link
            </label>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-black/30 border border-white/10 text-xs font-mono">
              <Globe className="w-4 h-4 text-indigo-400 shrink-0 ml-1" />
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="bg-transparent border-none text-slate-300 w-full focus:outline-none text-xs font-mono truncate"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1 shrink-0"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
