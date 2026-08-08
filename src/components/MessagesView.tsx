import React, { useState } from 'react';
import { Send, Paperclip, Smile, Image as ImageIcon, CheckCheck, Users, Search } from 'lucide-react';
import { ChatMessage, TeamMember } from '../types';

export const MessagesView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      senderId: 'AM',
      senderName: 'Anna M.',
      senderInitials: 'AM',
      avatarBg: 'bg-indigo-500',
      text: 'Hey team! I just published the updated glassmorphism token set for the Q4 Campaign preview.',
      timestamp: '10:42 AM',
      attachment: {
        name: 'Frosted_Tokens_v2.json',
        type: 'JSON Token Map',
        size: '14.2 KB'
      }
    },
    {
      id: 'm2',
      senderId: 'SK',
      senderName: 'Sam K.',
      senderInitials: 'SK',
      avatarBg: 'bg-purple-500',
      text: 'Awesome! Checked the latency on the live preview component — averaging 1.2ms with neural blur enabled. Looks crisp!',
      timestamp: '10:45 AM'
    },
    {
      id: 'm3',
      senderId: 'TL',
      senderName: 'Tina L.',
      senderInitials: 'TL',
      avatarBg: 'bg-emerald-500',
      text: 'Can we try the Cyber Emerald theme filter on the primary call-to-action button set?',
      timestamp: '10:48 AM'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');

  const teamMembers: TeamMember[] = [
    { id: 'AM', name: 'Anna M.', initials: 'AM', role: 'Lead UI Architect', status: 'online', avatarBg: 'bg-indigo-500', currentActivity: 'Editing Glass Tokens' },
    { id: 'SK', name: 'Sam K.', initials: 'SK', role: 'Fullstack Engineer', status: 'online', avatarBg: 'bg-purple-500', currentActivity: 'Optimizing CDN Latency' },
    { id: 'TL', name: 'Tina L.', initials: 'TL', role: 'Brand Designer', status: 'online', avatarBg: 'bg-emerald-500', currentActivity: 'Reviewing Campaign Assets' },
    { id: 'JD', name: 'John Doe', initials: 'JD', role: 'Studio Lead (You)', status: 'online', avatarBg: 'bg-gradient-to-br from-indigo-600 to-purple-600', currentActivity: 'Active in Q4 Workspace' }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: `m_${Date.now()}`,
      senderId: 'JD',
      senderName: 'John Doe',
      senderInitials: 'JD',
      avatarBg: 'bg-gradient-to-br from-indigo-600 to-purple-600',
      text: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');
  };

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-6rem)]">
      {/* Left: Active Team Sidebar */}
      <div className="lg:col-span-4 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-6 flex flex-col h-full shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-lg">Team Workspace</h3>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            4 Online
          </span>
        </div>

        {/* Member list */}
        <div className="space-y-3 overflow-y-auto flex-1 pr-1">
          {teamMembers.map((member) => (
            <div 
              key={member.id}
              className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full ${member.avatarBg} flex items-center justify-center font-bold text-xs text-white shadow-md`}>
                    {member.initials}
                  </div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0A0C14] absolute -bottom-0.5 -right-0.5"></div>
                </div>
                <div>
                  <p className="font-semibold text-white text-xs lg:text-sm group-hover:text-indigo-300 transition-colors">
                    {member.name}
                  </p>
                  <p className="text-[11px] text-slate-400">{member.role}</p>
                  <p className="text-[10px] text-indigo-300/80 font-mono mt-0.5">{member.currentActivity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Active Chat Area */}
      <div className="lg:col-span-8 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-6 flex flex-col h-full shadow-xl">
        {/* Chat Header */}
        <div className="pb-4 border-b border-white/10 flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white"># Q4-Campaign-Design-Huddle</h3>
            <p className="text-xs text-slate-400">Collaborative frosted asset review thread</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs text-slate-300 font-medium">Live Synced</span>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
          {messages.map((msg) => {
            const isMe = msg.senderId === 'JD';
            return (
              <div key={msg.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                <div className={`w-9 h-9 rounded-full ${msg.avatarBg} flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-md`}>
                  {msg.senderInitials}
                </div>

                <div className={`max-w-md ${isMe ? 'items-end text-right' : ''}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-white">{msg.senderName}</span>
                    <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                  </div>

                  <div className={`
                    p-4 rounded-2xl text-xs lg:text-sm leading-relaxed border backdrop-blur-md
                    ${isMe 
                      ? 'bg-indigo-500/30 border-indigo-500/40 text-indigo-100 rounded-tr-none' 
                      : 'bg-white/10 border-white/10 text-slate-200 rounded-tl-none'}
                  `}>
                    <p>{msg.text}</p>

                    {msg.attachment && (
                      <div className="mt-3 p-3 rounded-xl bg-black/30 border border-white/10 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Paperclip className="w-4 h-4 text-indigo-400 shrink-0" />
                          <div className="truncate text-left">
                            <p className="font-semibold text-white truncate">{msg.attachment.name}</p>
                            <p className="text-[10px] text-slate-400">{msg.attachment.type} • {msg.attachment.size}</p>
                          </div>
                        </div>
                        <button className="px-2.5 py-1 rounded-lg bg-indigo-500/30 hover:bg-indigo-500/50 text-indigo-200 text-[10px] font-bold border border-indigo-500/30 shrink-0">
                          Inspect
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="pt-2 border-t border-white/10 flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type message or attach glass token preview..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-4 pr-12 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 backdrop-blur-md"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button 
                type="button" 
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                title="Attach design token"
              >
                <Paperclip className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="p-3 rounded-2xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white font-semibold shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
