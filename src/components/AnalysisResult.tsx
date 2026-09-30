import React from 'react';
import { AlertTriangle, CheckCircle2, ShieldCheck, ShieldAlert, Cpu, Download, RefreshCw, Layers } from 'lucide-react';
import { DetectionClass, SampleVideo } from '../types';

interface AnalysisResultProps {
  status: DetectionClass;
  confidence: number;
  accidentProbability: number;
  isSimulated: boolean;
  framesAnalyzed: number;
  videoName: string;
  videoDuration: string;
  processingTimeMs: number;
  selectedSample?: SampleVideo | null;
  onReset: () => void;
  onDownloadReport: () => void;
  onTriggerAlert: () => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({
  status,
  confidence,
  accidentProbability,
  isSimulated,
  framesAnalyzed,
  videoName,
  videoDuration,
  processingTimeMs,
  selectedSample,
  onReset,
  onDownloadReport,
  onTriggerAlert
}) => {
  const isAccident = status === 'ACCIDENT';

  return (
    <div className="w-full space-y-6 animate-in fade-in zoom-in-95 duration-400">
      
      {/* Simulation / Real Model Banner */}
      <div
        className={`px-4 py-2.5 rounded-lg border flex items-center justify-between text-xs font-mono ${
          isSimulated
            ? 'bg-amber-950/30 border-amber-500/30 text-amber-200'
            : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isSimulated ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
          <span className="font-bold">
            {isSimulated ? 'DEMO / SIMULATED RESULT' : 'REAL MODEL RESULT'}
          </span>
          <span className="text-neutral-400 hidden sm:inline">·</span>
          <span className="text-neutral-300 hidden sm:inline">
            {isSimulated
              ? 'Computed via TimeSformer prototype simulation engine. Real model backend can be connected via Settings.'
              : 'Computed via connected PyTorch TimeSformer inference server.'}
          </span>
        </div>

        <span className="text-[11px] text-neutral-400 shrink-0">
          Inference: {(processingTimeMs / 1000).toFixed(2)}s
        </span>
      </div>

      {/* Main Result Card */}
      <div
        className={`rounded-2xl p-6 sm:p-8 border transition-all ${
          isAccident
            ? 'glass-panel-alert border-rose-500/50 shadow-[0_15px_50px_rgba(244,63,94,0.25)]'
            : 'glass-panel-accent border-emerald-500/40 shadow-[0_15px_50px_rgba(16,185,129,0.2)]'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          
          {/* Status Flag */}
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg shrink-0 ${
                isAccident
                  ? 'bg-rose-500/20 border-rose-400/50 text-rose-300 shadow-rose-900/30'
                  : 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300 shadow-emerald-900/30'
              }`}
            >
              {isAccident ? (
                <ShieldAlert className="w-8 h-8 animate-pulse text-rose-400" />
              ) : (
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
              )}
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                CLASSIFICATION STATUS
              </span>
              <div
                className={`font-display text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2.5 ${
                  isAccident ? 'text-rose-300' : 'text-emerald-300'
                }`}
              >
                {isAccident ? (
                  <>
                    <AlertTriangle className="w-6 h-6 text-rose-400" />
                    <span>ACCIDENT DETECTED</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    <span>NORMAL</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Probability & Confidence Readouts */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 bg-neutral-950/70 p-4 rounded-xl border border-white/10 shrink-0">
            <div>
              <span className="text-[11px] font-mono text-neutral-400 block uppercase">
                Confidence
              </span>
              <span
                className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight ${
                  isAccident ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                {confidence.toFixed(1)}%
              </span>
            </div>

            <div>
              <span className="text-[11px] font-mono text-neutral-400 block uppercase">
                Accident Probability
              </span>
              <span
                className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight ${
                  isAccident ? 'text-amber-400' : 'text-cyan-400'
                }`}
              >
                {accidentProbability.toFixed(1)}%
              </span>
            </div>
          </div>

        </div>

        {/* Video Metadata & Architecture Breakdown */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="text-neutral-500 block mb-0.5">SOURCE VIDEO</span>
            <span className="text-neutral-200 font-semibold truncate block" title={videoName}>
              {videoName}
            </span>
          </div>

          <div>
            <span className="text-neutral-500 block mb-0.5">DURATION</span>
            <span className="text-neutral-200 font-semibold">{videoDuration || '00:24'}</span>
          </div>

          <div>
            <span className="text-neutral-500 block mb-0.5">FRAMES SAMPLED</span>
            <span className="text-cyan-400 font-semibold">{framesAnalyzed} Uniform Frames</span>
          </div>

          <div>
            <span className="text-neutral-500 block mb-0.5">ARCHITECTURE</span>
            <span className="text-indigo-300 font-semibold">TimeSformer ViT</span>
          </div>
        </div>

        {/* 8 Sampled Video Frame Tokens */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between mb-3 text-xs font-mono">
            <span className="text-neutral-300 flex items-center gap-1.5 font-semibold">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Sampled 8-Frame Sequence (Divided Space-Time Attention Patches)
            </span>
            <span className="text-neutral-400 text-[11px]">Sampling: OpenCV Uniform Slicing</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {Array.from({ length: 8 }).map((_, i) => {
              const isFocalFrame = isAccident && (i === 3 || i === 4 || i === 5);
              return (
                <div
                  key={i}
                  className={`rounded-lg border p-2 flex flex-col items-center justify-between text-center font-mono transition-all ${
                    isFocalFrame
                      ? 'bg-rose-950/50 border-rose-500/60 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                      : 'bg-neutral-900/70 border-neutral-800'
                  }`}
                >
                  <div className="flex items-center justify-between w-full text-[9px] text-neutral-400 mb-1">
                    <span>FRAME 0{i + 1}</span>
                    <span className="text-cyan-400">t{i + 1}</span>
                  </div>

                  {/* Thumbnail patch placeholder */}
                  <div className="w-full aspect-[4/3] rounded bg-neutral-950/80 border border-neutral-800/80 relative overflow-hidden flex items-center justify-center my-1">
                    {selectedSample ? (
                      <img
                        src={selectedSample.imageSrc}
                        alt={`Sample frame ${i + 1}`}
                        className="w-full h-full object-cover opacity-75"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="text-[8px] text-neutral-500">224x224</span>
                    )}

                    {isFocalFrame && (
                      <div className="absolute inset-0 bg-rose-500/20 border border-rose-500 flex items-center justify-center">
                        <span className="text-[8px] bg-rose-600 text-white font-bold px-1 rounded">
                          IMPACT
                        </span>
                      </div>
                    )}
                  </div>

                  <span className={`text-[9px] ${isFocalFrame ? 'text-rose-300 font-bold' : 'text-neutral-400'}`}>
                    {isFocalFrame ? 'Attn: High' : 'Attn: Norm'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Analyze Another Video</span>
            </button>

            <button
              onClick={onDownloadReport}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-cyan-300 hover:text-cyan-200 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/30 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Analysis JSON</span>
            </button>
          </div>

          {isAccident && (
            <button
              onClick={onTriggerAlert}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-[0_0_15px_rgba(244,63,94,0.4)] transition-all"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>View Active Alert Notification</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
