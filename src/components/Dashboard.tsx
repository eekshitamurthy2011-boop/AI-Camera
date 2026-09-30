import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import { Video, AlertTriangle, CheckCircle2, TrendingUp, Sparkles, Filter } from 'lucide-react';
import { AnalyticsData } from '../types';

interface DashboardProps {
  analytics: AnalyticsData;
  isBackendConnected: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ analytics, isBackendConnected }) => {
  const pieData = [
    { name: 'Normal Videos', value: analytics.normalVideos, color: '#10b981' },
    { name: 'Accidents Detected', value: analytics.accidentsDetected, color: '#f43f5e' }
  ];

  return (
    <section id="dashboard" className="py-20 bg-neutral-950 border-b border-cyan-500/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                Surveillance Intelligence Dashboard
              </span>
              <span className="text-neutral-500">·</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                {isBackendConnected ? 'LIVE BACKEND DATA' : 'DEMO METRICS DATA'}
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Monitoring Dashboard & Analytics
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-300 max-w-2xl">
              Real-time classification throughput, incident severity metrics, and confidence distributions from the TimeSformer video inference pipeline.
            </p>
          </div>

          <div className="text-xs font-mono text-neutral-400 bg-neutral-900/60 px-3 py-2 rounded-lg border border-neutral-800 shrink-0">
            <span>UPTIME: </span>
            <span className="text-emerald-400 font-bold">99.98%</span>
            <span className="mx-2 text-neutral-600">|</span>
            <span>MODEL: </span>
            <span className="text-cyan-400">TimeSformer ViT</span>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          
          {/* Card 1: Total Videos Analyzed */}
          <div className="glass-panel rounded-xl p-5 border border-cyan-500/20 hover:border-cyan-400/40 transition-colors">
            <div className="flex items-center justify-between text-neutral-400 mb-3">
              <span className="text-xs font-mono uppercase">Total Videos Analyzed</span>
              <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Video className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display text-3xl font-bold text-white tabular-nums">
              {analytics.totalAnalyzed}
            </div>
            <div className="text-[11px] font-mono text-neutral-400 mt-2 flex items-center gap-1.5">
              <span className="text-cyan-400">● 8 frames/video</span>
              <span>· OpenCV uniform sampling</span>
            </div>
          </div>

          {/* Card 2: Accidents Detected */}
          <div className="glass-panel rounded-xl p-5 border border-rose-500/30 hover:border-rose-400/50 transition-colors">
            <div className="flex items-center justify-between text-neutral-400 mb-3">
              <span className="text-xs font-mono uppercase">Accidents Detected</span>
              <div className="w-8 h-8 rounded-lg bg-rose-950/60 border border-rose-500/40 flex items-center justify-center text-rose-400">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display text-3xl font-bold text-rose-400 tabular-nums">
              {analytics.accidentsDetected}
            </div>
            <div className="text-[11px] font-mono text-neutral-400 mt-2 flex items-center gap-1.5">
              <span className="text-rose-400 font-semibold">
                {((analytics.accidentsDetected / (analytics.totalAnalyzed || 1)) * 100).toFixed(1)}%
              </span>
              <span>of scanned videos</span>
            </div>
          </div>

          {/* Card 3: Normal Videos */}
          <div className="glass-panel rounded-xl p-5 border border-emerald-500/30 hover:border-emerald-400/50 transition-colors">
            <div className="flex items-center justify-between text-neutral-400 mb-3">
              <span className="text-xs font-mono uppercase">Normal Videos</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display text-3xl font-bold text-emerald-400 tabular-nums">
              {analytics.normalVideos}
            </div>
            <div className="text-[11px] font-mono text-neutral-400 mt-2 flex items-center gap-1.5">
              <span className="text-emerald-400 font-semibold">
                {((analytics.normalVideos / (analytics.totalAnalyzed || 1)) * 100).toFixed(1)}%
              </span>
              <span>nominal flow</span>
            </div>
          </div>

          {/* Card 4: Average Confidence */}
          <div className="glass-panel rounded-xl p-5 border border-cyan-500/20 hover:border-cyan-400/40 transition-colors">
            <div className="flex items-center justify-between text-neutral-400 mb-3">
              <span className="text-xs font-mono uppercase">Average Confidence</span>
              <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display text-3xl font-bold text-cyan-300 tabular-nums">
              {analytics.averageConfidence.toFixed(1)}%
            </div>
            <div className="text-[11px] font-mono text-neutral-400 mt-2 flex items-center gap-1.5">
              <span className="text-cyan-400">High certainty</span>
              <span>· Softmax distribution</span>
            </div>
          </div>

        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Chart 1: Accidents vs Normal (Pie Chart) */}
          <div className="lg:col-span-4 glass-panel rounded-2xl p-6 border border-neutral-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white tracking-wide font-display">
                Accidents vs Normal
              </h3>
              <span className="text-[11px] font-mono text-neutral-400">Ratio</span>
            </div>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#090d16" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#f8fafc',
                      fontSize: '12px',
                      fontFamily: 'JetBrains Mono'
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(value) => <span className="text-xs text-neutral-300">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-2 pt-3 border-t border-neutral-800/80 text-[11px] font-mono text-neutral-400 flex items-center justify-between">
              <span>Detection rate:</span>
              <span className="text-rose-400 font-bold">
                {((analytics.accidentsDetected / (analytics.totalAnalyzed || 1)) * 100).toFixed(1)}% Accident
              </span>
            </div>
          </div>

          {/* Chart 2: Detection History Over Time (Bar Chart) */}
          <div className="lg:col-span-8 glass-panel rounded-2xl p-6 border border-neutral-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wide font-display">
                  Detection Timeline by Category
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Hourly breakdown of NORMAL vs ACCIDENT classifications
                </p>
              </div>
              <span className="text-[11px] font-mono text-cyan-400">Today</span>
            </div>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.timeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={11} fontFamily="JetBrains Mono" />
                  <YAxis stroke="#64748b" fontSize={11} fontFamily="JetBrains Mono" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#f8fafc',
                      fontSize: '12px',
                      fontFamily: 'JetBrains Mono'
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    formatter={(val) => <span className="text-xs text-neutral-300 capitalize">{val}</span>}
                  />
                  <Bar dataKey="normal" name="Normal" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="accident" name="Accident" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: Confidence Distribution */}
          <div className="lg:col-span-6 glass-panel rounded-2xl p-6 border border-neutral-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white tracking-wide font-display">
                Confidence Score Distribution
              </h3>
              <span className="text-[11px] font-mono text-neutral-400">Prob. Spread</span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.confidenceDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="range" stroke="#64748b" fontSize={11} fontFamily="JetBrains Mono" />
                  <YAxis stroke="#64748b" fontSize={11} fontFamily="JetBrains Mono" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#f8fafc',
                      fontSize: '12px',
                      fontFamily: 'JetBrains Mono'
                    }}
                  />
                  <Bar dataKey="count" name="Video Samples" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-2 text-[11px] font-mono text-neutral-400 text-center">
              Most predictions cluster in the 92%–97% high confidence tier.
            </div>
          </div>

          {/* Chart 4: Videos Analyzed Over Time (Area Chart) */}
          <div className="lg:col-span-6 glass-panel rounded-2xl p-6 border border-neutral-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white tracking-wide font-display">
                Videos Analyzed Over Time
              </h3>
              <span className="text-[11px] font-mono text-cyan-400">Hourly Throughput</span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics.hourlyActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVideos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="hour" stroke="#64748b" fontSize={11} fontFamily="JetBrains Mono" />
                  <YAxis stroke="#64748b" fontSize={11} fontFamily="JetBrains Mono" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#f8fafc',
                      fontSize: '12px',
                      fontFamily: 'JetBrains Mono'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="videos"
                    name="Videos Scanned"
                    stroke="#06b6d4"
                    fillOpacity={1}
                    fill="url(#colorVideos)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-2 text-[11px] font-mono text-neutral-400 text-center">
              Pipeline throughput scales dynamically with incoming camera streams.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
