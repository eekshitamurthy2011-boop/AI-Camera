import React, { useState, useEffect } from 'react';
import { Play, ArrowRight, ShieldAlert, Cpu, Sparkles, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import heroTrafficImg from '@/src/assets/images/hero_traffic_cctv_1790782752091.jpg';

interface HeroProps {
  onAnalyzeClick: () => void;
  onDashboardClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onAnalyzeClick, onDashboardClick }) => {
  const [heroState, setHeroState] = useState<'ACCIDENT' | 'NORMAL'>('ACCIDENT');
  const [scanFrameIndex, setScanFrameIndex] = useState(3);

  // Cycling frame counter for realistic scanning effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScanFrameIndex((prev) => (prev % 8) + 1);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden cyber-grid border-b border-cyan-500/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-violet-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brief & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* System Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>TIME-SFORMER VIDEO CLASSIFICATION</span>
              <span className="text-neutral-500">·</span>
              <span className="text-neutral-300">8-FRAME ATTENTION</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance leading-[1.12]">
              AI-Powered{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Accident Detection
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl">
              AI Sentinel uses artificial intelligence and video analysis to identify potential accidents from surveillance footage and provide rapid detection results.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onAnalyzeClick}
                className="flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold tracking-wide text-neutral-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Analyze Video</span>
              </button>

              <button
                onClick={onDashboardClick}
                className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold tracking-wide text-neutral-200 hover:text-white bg-neutral-900/80 hover:bg-neutral-800/90 border border-neutral-700/80 hover:border-cyan-500/40 rounded-xl transition-all"
              >
                <span>View Dashboard</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>

            {/* Architectural Highlights */}
            <div className="pt-6 border-t border-neutral-800/70 grid grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <span className="text-neutral-500 block">MODEL</span>
                <span className="text-neutral-200 font-semibold">TimeSformer</span>
              </div>
              <div>
                <span className="text-neutral-500 block">SAMPLING</span>
                <span className="text-cyan-400 font-semibold">8 Video Frames</span>
              </div>
              <div>
                <span className="text-neutral-500 block">INFERENCE</span>
                <span className="text-indigo-300 font-semibold">Binary Classes</span>
              </div>
            </div>
          </div>

          {/* Right Column: Animated AI Video-Analysis Visualization */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl glass-panel-accent p-3 border border-cyan-500/30 shadow-[0_20px_50px_rgba(6,182,212,0.15)] overflow-hidden">
              
              {/* Header HUD Bar */}
              <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-cyan-500/20 px-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-cyan-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-semibold">AI ANALYSIS: LIVE MONITORING</span>
                </div>
                
                {/* Visual state toggle for interactive inspection */}
                <div className="flex items-center gap-1 bg-neutral-950/60 p-0.5 rounded border border-neutral-800">
                  <button
                    onClick={() => setHeroState('ACCIDENT')}
                    className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                      heroState === 'ACCIDENT'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Simulate Accident
                  </button>
                  <button
                    onClick={() => setHeroState('NORMAL')}
                    className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                      heroState === 'NORMAL'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Simulate Normal
                  </button>
                </div>
              </div>

              {/* Video Frame Display */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
                <img
                  src={heroTrafficImg}
                  alt="AI Traffic Surveillance Analysis Preview"
                  className="w-full h-full object-cover brightness-90 contrast-105"
                  referrerPolicy="no-referrer"
                />

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.06)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                {/* Animated Laser Scanning Line */}
                <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee] animate-scanline pointer-events-none" />

                {/* Bounding Box Simulation */}
                {heroState === 'ACCIDENT' ? (
                  <div className="absolute top-[32%] left-[42%] w-[26%] h-[34%] border-2 border-rose-500 rounded bg-rose-500/10 animate-pulse pointer-events-none shadow-[0_0_15px_rgba(244,63,94,0.4)]">
                    <div className="absolute -top-6 left-0 bg-rose-600 text-white font-mono text-[10px] px-1.5 py-0.5 rounded font-bold flex items-center gap-1 shadow">
                      <AlertTriangle className="w-3 h-3" />
                      IMPACT ZONE [0.947]
                    </div>
                    {/* Crosshairs */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-rose-400/60 rounded-full" />
                  </div>
                ) : (
                  <div className="absolute top-[38%] left-[28%] w-[22%] h-[28%] border-2 border-emerald-400/80 rounded bg-emerald-400/10 pointer-events-none">
                    <div className="absolute -top-6 left-0 bg-emerald-600 text-white font-mono text-[10px] px-1.5 py-0.5 rounded font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      FLOW NOMINAL [0.964]
                    </div>
                  </div>
                )}

                {/* Secondary Vehicle Trackers */}
                <div className="absolute top-[55%] left-[12%] w-[16%] h-[24%] border border-cyan-400/50 rounded bg-cyan-400/5 pointer-events-none">
                  <span className="absolute -top-4 left-0 text-[9px] font-mono text-cyan-300">TRK-01 [v=62km/h]</span>
                </div>
                <div className="absolute top-[48%] right-[14%] w-[18%] h-[26%] border border-cyan-400/50 rounded bg-cyan-400/5 pointer-events-none">
                  <span className="absolute -top-4 left-0 text-[9px] font-mono text-cyan-300">TRK-02 [v=58km/h]</span>
                </div>

                {/* HUD Telemetry Overlay on Bottom */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent p-3 pt-6 flex items-end justify-between">
                  <div className="space-y-1 font-mono text-xs">
                    <div className="text-cyan-300 font-semibold tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>SCANNING VIDEO...</span>
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      FRAMES ANALYZED: <span className="text-white font-bold">{scanFrameIndex} / 8</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono">
                      CLASSIFICATION
                    </div>
                    <div
                      className={`text-sm font-bold font-mono tracking-wider flex items-center justify-end gap-1.5 ${
                        heroState === 'ACCIDENT' ? 'text-rose-400' : 'text-emerald-400'
                      }`}
                    >
                      {heroState === 'ACCIDENT' ? (
                        <>
                          <AlertTriangle className="w-4 h-4" />
                          <span>ACCIDENT (94.7%)</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>NORMAL (96.4%)</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom 8-Frame Timeline Strip */}
              <div className="mt-3 pt-2.5 border-t border-cyan-500/15">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3 h-3 text-cyan-400" />
                    TimeSformer Frame Sampling Pipeline
                  </span>
                  <span className="text-cyan-300">Uniform 8-slice</span>
                </div>

                <div className="grid grid-cols-8 gap-1.5">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-9 rounded border flex flex-col items-center justify-center text-[9px] font-mono transition-all ${
                        i + 1 <= scanFrameIndex
                          ? heroState === 'ACCIDENT' && (i === 3 || i === 4)
                            ? 'border-rose-500 bg-rose-950/40 text-rose-300 font-bold'
                            : 'border-cyan-400/50 bg-cyan-950/40 text-cyan-200'
                          : 'border-neutral-800 bg-neutral-900/60 text-neutral-500'
                      }`}
                    >
                      <span>F0{i + 1}</span>
                      <span className="text-[8px] opacity-75">t+{i * 2}s</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
