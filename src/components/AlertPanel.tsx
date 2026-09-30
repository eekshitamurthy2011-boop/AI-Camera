import React from 'react';
import { AlertTriangle, CheckCircle2, Eye, X, ShieldAlert } from 'lucide-react';
import { DetectionRecord } from '../types';

interface AlertPanelProps {
  alert: DetectionRecord | null;
  onDismiss: () => void;
  onMarkReviewed: (id: string) => void;
  onViewVideo: (alert: DetectionRecord) => void;
}

export const AlertPanel: React.FC<AlertPanelProps> = ({
  alert,
  onDismiss,
  onMarkReviewed,
  onViewVideo
}) => {
  if (!alert) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-lg w-full px-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="glass-panel-alert rounded-xl p-5 border border-rose-500/50 shadow-[0_10px_40px_rgba(225,29,72,0.35)] relative overflow-hidden">
        {/* Subtle top indicator bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-amber-400 to-rose-600 animate-pulse" />

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-400 shrink-0 shadow-[0_0_15px_rgba(244,63,94,0.4)]">
              <ShieldAlert className="w-5 h-5 animate-pulse text-rose-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-wider text-rose-200 font-display flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  ACCIDENT DETECTED
                </span>
                {alert.isSimulated && (
                  <span className="text-[10px] font-mono uppercase bg-neutral-900/80 text-amber-300/90 border border-amber-500/30 px-1.5 py-0.5 rounded">
                    SIMULATED
                  </span>
                )}
              </div>
              <p className="text-xs text-rose-200/80 mt-0.5">
                Surveillance video classification triggered safety threshold
              </p>
            </div>
          </div>

          <button
            onClick={onDismiss}
            className="text-neutral-400 hover:text-white p-1 rounded transition-colors"
            title="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Telemetry data grid */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-rose-500/20 text-xs">
          <div>
            <span className="text-neutral-400 text-[11px] block">Detection Time</span>
            <span className="font-mono text-neutral-100 font-semibold">{alert.time} ({alert.date})</span>
          </div>
          <div>
            <span className="text-neutral-400 text-[11px] block">Video Source</span>
            <span className="font-mono text-neutral-100 truncate block" title={alert.videoName}>
              {alert.videoName}
            </span>
          </div>
          <div>
            <span className="text-neutral-400 text-[11px] block">Confidence</span>
            <span className="font-mono text-rose-300 font-bold text-sm">
              {alert.confidence.toFixed(1)}%
            </span>
          </div>
          <div>
            <span className="text-neutral-400 text-[11px] block">Accident Probability</span>
            <span className="font-mono text-amber-300 font-bold text-sm">
              {alert.accidentProbability.toFixed(1)}%
            </span>
          </div>
        </div>

        {alert.location && (
          <div className="mt-2 text-[11px] text-neutral-300 font-mono flex items-center gap-1.5 bg-neutral-950/40 px-2 py-1 rounded border border-rose-500/20">
            <span className="text-neutral-500">Node:</span>
            <span className="text-rose-200">{alert.location}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={() => onViewVideo(alert)}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-colors shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Video</span>
          </button>

          <button
            onClick={() => onMarkReviewed(alert.id)}
            className="flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-medium bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 rounded-lg transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mark Reviewed</span>
          </button>

          <button
            onClick={onDismiss}
            className="py-1.5 px-3 text-xs font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
