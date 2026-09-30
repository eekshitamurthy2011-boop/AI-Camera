import React from 'react';
import { Shield, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 py-12 text-neutral-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-900">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display font-bold text-sm text-white tracking-wider">
                AI SENTINEL
              </span>
              <p className="text-[11px] text-neutral-500 font-sans">
                Video-Based Accident Detection Prototype
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-6 text-neutral-300">
            <a href="#home" className="hover:text-cyan-400 transition-colors">Home</a>
            <a href="#detection" className="hover:text-cyan-400 transition-colors">AI Detection</a>
            <a href="#live" className="hover:text-cyan-400 transition-colors">Live Monitoring</a>
            <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How It Works</a>
            <a href="#dashboard" className="hover:text-cyan-400 transition-colors">Dashboard</a>
            <a href="#history" className="hover:text-cyan-400 transition-colors">History</a>
            <a href="#ai-engine" className="hover:text-cyan-400 transition-colors">AI Engine</a>
          </div>

          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 transition-colors"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-500">
          <div>
            AI Sentinel © 2026 · College AI Hackathon Prototype · Built with TimeSformer & PyTorch
          </div>
          <div className="text-neutral-400">
            Classes: <span className="text-emerald-400">NORMAL</span> / <span className="text-rose-400">ACCIDENT</span> · 8-Frame Attention
          </div>
        </div>
      </div>
    </footer>
  );
};
