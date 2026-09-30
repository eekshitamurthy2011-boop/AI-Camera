import React, { useState } from 'react';
import { X, Server, CheckCircle2, AlertCircle, RefreshCw, Terminal, ExternalLink } from 'lucide-react';
import { api } from '../services/api';

interface BackendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectionChange: (connected: boolean) => void;
}

export const BackendModal: React.FC<BackendModalProps> = ({
  isOpen,
  onClose,
  onConnectionChange
}) => {
  const [backendUrl, setBackendUrl] = useState(api.getBackendUrl());
  const [isChecking, setIsChecking] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ connected: boolean; text: string } | null>(null);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setIsChecking(true);
    api.setBackendUrl(backendUrl);
    const result = await api.checkBackendHealth();
    setIsChecking(false);
    setStatusMessage({
      connected: result.connected,
      text: result.message
    });
    onConnectionChange(result.connected);
  };

  const handleResetToDemo = () => {
    setBackendUrl('http://localhost:8000');
    api.setBackendUrl('http://localhost:8000');
    setStatusMessage({
      connected: false,
      text: 'Reverted to simulated Demo Provider. All mock endpoints and 8-frame simulations active.'
    });
    onConnectionChange(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl glass-panel-accent rounded-2xl p-6 border border-cyan-500/30 shadow-2xl space-y-5">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white">
                Python / FastAPI Backend Configuration
              </h3>
              <p className="text-xs text-neutral-400 font-mono">
                Connect your real PyTorch TimeSformer server or run in Demo Mode
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Box for Judges */}
        <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 text-xs text-neutral-300 space-y-1.5 font-mono">
          <div className="text-cyan-300 font-semibold flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            Hackathon Verification Note
          </div>
          <p className="text-[11px] text-neutral-400 leading-relaxed">
            AI Sentinel features dual-mode architecture: if your Python backend is running locally on <code className="text-cyan-200">http://localhost:8000</code>, the app sends video uploads to <code className="text-cyan-200">POST /analyze-video</code>. Otherwise, the simulated Demo Engine operates locally with realistic 8-frame temporal logic.
          </p>
        </div>

        {/* Input Form */}
        <div className="space-y-3 font-mono text-xs">
          <label className="text-neutral-300 font-semibold block">
            FastAPI Server URL:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={backendUrl}
              onChange={(e) => setBackendUrl(e.target.value)}
              placeholder="http://localhost:8000"
              className="flex-1 px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={handleTestConnection}
              disabled={isChecking}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              {isChecking && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
              <span>Test Connection</span>
            </button>
          </div>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div
            className={`p-3 rounded-lg border text-xs font-mono flex items-start gap-2.5 ${
              statusMessage.connected
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-neutral-900 border-neutral-800 text-neutral-300'
            }`}
          >
            {statusMessage.connected ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div className="leading-relaxed">
              <span className="font-bold block mb-0.5">
                {statusMessage.connected ? 'Connection Established' : 'Operating in Simulated Demo Mode'}
              </span>
              <span className="text-[11px] text-neutral-400">
                {statusMessage.text}
              </span>
            </div>
          </div>
        )}

        {/* Actions Footer */}
        <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono">
          <button
            onClick={handleResetToDemo}
            className="text-neutral-400 hover:text-cyan-300 underline transition-colors"
          >
            Reset to Default Demo Provider
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg border border-neutral-700 transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
