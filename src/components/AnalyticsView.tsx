import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid 
} from 'recharts';
import { BarChart3, Clock, Zap, Cpu, Server, Activity, RefreshCw } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const sessionData = [
    { time: '00:00', sessions: 18200, latency: 1.4, cdnRate: 98.2 },
    { time: '04:00', sessions: 14500, latency: 1.1, cdnRate: 99.1 },
    { time: '08:00', sessions: 21400, latency: 1.3, cdnRate: 97.8 },
    { time: '12:00', sessions: 28900, latency: 1.5, cdnRate: 96.5 },
    { time: '16:00', sessions: 24800, latency: 1.2, cdnRate: 98.9 },
    { time: '20:00', sessions: 22100, latency: 1.0, cdnRate: 99.4 },
    { time: '23:59', sessions: 19800, latency: 1.2, cdnRate: 98.6 },
  ];

  const regionData = [
    { region: 'US East', traffic: 38 },
    { region: 'US West', traffic: 26 },
    { region: 'EU West', traffic: 21 },
    { region: 'Asia East', traffic: 15 },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="flex-1 p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 p-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/20">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Lumina Telemetry & Performance</h2>
            <p className="text-xs text-slate-400">Real-time edge analytics, CDN cache efficiency, and global node latency</p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
            {(['24h', '7d', '30d'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 rounded-lg font-medium uppercase transition-all ${
                  timeRange === r 
                    ? 'bg-indigo-500 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <button
            onClick={handleRefresh}
            className={`p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all ${
              isRefreshing ? 'animate-spin text-indigo-400' : ''
            }`}
            title="Refresh analytics data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-5 shadow-lg">
          <div className="flex justify-between items-start">
            <span className="text-xs text-slate-400 font-medium">Total Active Sessions</span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">+12% vs last week</span>
          </div>
          <p className="text-3xl font-bold text-white mt-2">24,819</p>
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-indigo-400 h-full w-[78%]"></div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-5 shadow-lg">
          <div className="flex justify-between items-start">
            <span className="text-xs text-slate-400 font-medium">Average Latency</span>
            <span className="text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">Ultra Stable</span>
          </div>
          <p className="text-3xl font-bold text-white mt-2">1.2 ms</p>
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-blue-400 h-full w-[92%]"></div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-5 shadow-lg">
          <div className="flex justify-between items-start">
            <span className="text-xs text-slate-400 font-medium">CDN Cache Hit Ratio</span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">Optimized</span>
          </div>
          <p className="text-3xl font-bold text-white mt-2">98.9%</p>
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-400 h-full w-[98%]"></div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-5 shadow-lg">
          <div className="flex justify-between items-start">
            <span className="text-xs text-slate-400 font-medium">Neural Asset Renders</span>
            <span className="text-[10px] text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">High Demand</span>
          </div>
          <p className="text-3xl font-bold text-white mt-2">142.3k</p>
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-purple-400 h-full w-[85%]"></div>
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Session Volume Chart */}
        <div className="lg:col-span-8 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-6 shadow-xl flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Active Session & Latency Dynamics</h3>
              <p className="text-xs text-slate-400">24-Hour telemetry snapshot</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Sessions
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sessionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="sessionGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#121524', 
                    borderColor: 'rgba(255,255,255,0.15)',
                    borderRadius: '1rem',
                    color: '#fff',
                    backdropFilter: 'blur(16px)'
                  }} 
                />
                <Area type="monotone" dataKey="sessions" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#sessionGlow)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Distribution */}
        <div className="lg:col-span-4 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Global Node Traffic</h3>
            <p className="text-xs text-slate-400 mb-6">Traffic distribution across region clusters</p>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="region" type="category" stroke="#cbd5e1" fontSize={11} axisLine={false} tickLine={false} width={70} />
                  <Bar dataKey="traffic" fill="#a855f7" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Server className="w-4 h-4 text-emerald-400" />
              <span>4 Active Edge Clusters</span>
            </span>
            <span className="text-emerald-400 font-semibold">100% Uptime</span>
          </div>
        </div>
      </div>
    </div>
  );
};
