import React, { useState, useEffect } from 'react';
import { Radio, AlertTriangle, CheckCircle2, RotateCcw, ShieldAlert, Sparkles, Activity } from 'lucide-react';
import { DetectionRecord } from '../types';
import accidentFeedImg from '@/src/assets/images/traffic_accident_feed_1790782775616.jpg';
import normalFeedImg from '@/src/assets/images/traffic_normal_feed_1790782764317.jpg';

interface LiveMonitoringProps {
  onSimulateAccident: () => void;
  onNewDetection: (record: DetectionRecord) => void;
  onOpenAlert: (record: DetectionRecord) => void;
}

export const LiveMonitoring: React.FC<LiveMonitoringProps> = ({
  onSimulateAccident,
  onNewDetection,
  onOpenAlert
}) => {
  const [liveState, setLiveState] = useState<'NORMAL' | 'ACCIDENT'>('NORMAL');
  const [confidence, setConfidence] = useState<number>(96.2);
  const [lastEventTime, setLastEventTime] = useState<string>('Nominal');
  const [pulseFrame, setPulseFrame] = useState<number>(1);

  // Frame tick for live scanning animation
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseFrame((prev) => (prev % 8) + 1);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const handleSimulateAccident = () => {
    const accConfidence = Number((94.5 + Math.random() * 4.0).toFixed(1));
    setLiveState('ACCIDENT');
    setConfidence(accConfidence);
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    setLastEventTime(timeStr);

    const record: DetectionRecord = {
      id: `#${Math.floor(100 + Math.random() * 900)}`,
      date: dateStr,
      time: timeStr,
      videoName: 'live_cam_feed_04.mp4',
      prediction: 'ACCIDENT',
      confidence: accConfidence,
      accidentProbability: accConfidence,
      status: 'Unreviewed',
      isSimulated: true,
      framesAnalyzed: 8,
      notes: 'Live CCTV stream flagged abrupt kinetic collision signature.',
      location: 'Expressway Flyover — Camera 04'
    };

    onNewDetection(record);
    onOpenAlert(record);
    onSimulateAccident();
  };

  const handleResetToNormal = () => {
    setLiveState('NORMAL');
    setConfidence(96.2);
    setLastEventTime('Nominal');
  };

  return (
    <section id="live" className="py-20 bg-neutral-950/90 border-b border-cyan-500/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                Real-Time Surveillance Stream
              </span>
              <span className="text-neutral-500">·</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 text-amber-300">
                DEMO MODE
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Live Monitoring
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-300 max-w-2xl">
              Continuous live video stream simulation. Real-world municipal feeds are piped to the TimeSformer engine for continuous 8-frame temporal accident detection.
            </p>
          </div>

          {/* Action Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            {liveState === 'ACCIDENT' ? (
              <button
                onClick={handleResetToNormal}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-semibold text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Normal</span>
              </button>
            ) : null}

            <button
              onClick={handleSimulateAccident}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Simulate Accident</span>
            </button>
          </div>
        </div>

        {/* Live Surveillance Viewport Panel */}
        <div className="glass-panel-accent rounded-2xl p-4 sm:p-6 border border-cyan-500/25">
          
          {/* Top HUD Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-cyan-500/15 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span>CAMERA FEED — DEMO MODE</span>
              </span>
              <span className="text-neutral-500">·</span>
              <span className="text-neutral-400">FPS: 30.0 · BITRATE: 4.8 Mbps</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-neutral-400">
                ACTIVE SAMPLING: <span className="text-cyan-400">FRAME 0{pulseFrame} / 08</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left: Video Feed Visualizer */}
            <div className="lg:col-span-8">
              <div className="relative aspect-video rounded-xl bg-neutral-950 overflow-hidden border border-neutral-800 shadow-2xl">
                <img
                  src={liveState === 'ACCIDENT' ? accidentFeedImg : normalFeedImg}
                  alt="Live Camera Feed Simulation"
                  className="w-full h-full object-cover brightness-95"
                  referrerPolicy="no-referrer"
                />

                {/* Laser Scanning Line */}
                <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-scanline pointer-events-none" />

                {/* Cyber Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.06)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

                {/* Top Corner Camera Label */}
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded border border-white/10 text-[11px] font-mono text-neutral-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>CAM-04 [HIGHWAY KM 42]</span>
                </div>

                {/* Watermark / Demo Mode tag */}
                <div className="absolute top-3 right-3 bg-amber-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-amber-500/40 text-[10px] font-mono text-amber-300">
                  DEMO MODE — SIMULATED STREAM
                </div>

                {/* Accident Focal Box if triggered */}
                {liveState === 'ACCIDENT' && (
                  <div className="absolute top-[34%] left-[44%] w-[28%] h-[36%] border-2 border-rose-500 rounded bg-rose-500/15 animate-pulse pointer-events-none shadow-[0_0_25px_rgba(244,63,94,0.5)]">
                    <div className="absolute -top-6 left-0 bg-rose-600 text-white font-mono text-[10px] px-2 py-0.5 rounded font-bold flex items-center gap-1 shadow">
                      <AlertTriangle className="w-3 h-3" />
                      ACCIDENT DETECTED [P={confidence}%]
                    </div>
                  </div>
                )}

                {/* Bottom Overlay Status */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 flex items-end justify-between text-xs font-mono">
                  <div className="space-y-0.5">
                    <div className="text-neutral-400 text-[10px]">TIME-SFORMER EVALUATION</div>
                    <div className="text-cyan-300 font-semibold flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-cyan-400" />
                      <span>DIVIDED SPACE-TIME ATTENTION: ACTIVE</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-neutral-400">LAST EVENT</div>
                    <div className="text-neutral-200">{lastEventTime}</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Live Telemetry HUD */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
              
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3">
                <span className="text-xs font-mono uppercase text-neutral-400 tracking-wider block">
                  System Telemetry
                </span>

                <div className="space-y-2.5 text-xs font-mono">
                  <div className="flex items-center justify-between p-2 rounded bg-neutral-950/60 border border-neutral-800/80">
                    <span className="text-neutral-400">SYSTEM STATUS</span>
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      ACTIVE
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded bg-neutral-950/60 border border-neutral-800/80">
                    <span className="text-neutral-400">AI MODEL</span>
                    <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      READY (TimeSformer)
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded bg-neutral-950/60 border border-neutral-800/80">
                    <span className="text-neutral-400">VIDEO INPUT</span>
                    <span className="flex items-center gap-1.5 text-neutral-200 font-bold">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      CONNECTED / DEMO
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded bg-neutral-950/60 border border-neutral-800/80">
                    <span className="text-neutral-400">DETECTION</span>
                    <span
                      className={`flex items-center gap-1.5 font-bold ${
                        liveState === 'ACCIDENT' ? 'text-rose-400' : 'text-emerald-400'
                      }`}
                    >
                      {liveState === 'ACCIDENT' ? (
                        <>
                          <AlertTriangle className="w-3.5 h-3.5" />
                          ACCIDENT
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          NORMAL
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dynamic Reading Card */}
              <div
                className={`p-4 rounded-xl border text-xs font-mono space-y-2 transition-colors ${
                  liveState === 'ACCIDENT'
                    ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                    : 'bg-cyan-950/40 border-cyan-500/30 text-cyan-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">CURRENT CONFIDENCE</span>
                  <span className="text-lg font-bold">
                    {confidence.toFixed(1)}%
                  </span>
                </div>

                <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      liveState === 'ACCIDENT' ? 'bg-rose-500' : 'bg-emerald-400'
                    }`}
                    style={{ width: `${confidence}%` }}
                  />
                </div>

                <p className="text-[11px] text-neutral-400 leading-tight pt-1">
                  {liveState === 'ACCIDENT'
                    ? 'Accident detected on sector camera. Emergency alert dispatched.'
                    : 'Continuous smooth vehicular flow detected. No anomalies observed.'}
                </p>
              </div>

              {/* Quick Info Box */}
              <div className="p-3 rounded-lg bg-neutral-950/80 border border-neutral-800 text-[11px] font-mono text-neutral-400">
                <span className="text-neutral-200 font-semibold block mb-0.5">College Hackathon Demo:</span>
                Clicking <strong className="text-rose-300">"Simulate Accident"</strong> updates the counter, triggers the alert modal, logs the event to the history table, and redraws dashboard metrics.
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
