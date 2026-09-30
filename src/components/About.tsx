import React from 'react';
import { Shield, Award, Users, Cpu, FileCheck, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-neutral-950/95 border-b border-cyan-500/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-2">
            Project Overview
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            About AI Sentinel
          </h2>
          <p className="mt-4 text-base text-neutral-300 leading-relaxed text-balance">
            AI Sentinel was developed as an AI-powered surveillance safety prototype for collegiate artificial intelligence hackathons. The system addresses critical delays in incident reporting by classifying surveillance video frames into NORMAL traffic flow or ACCIDENT occurrences.
          </p>
        </div>

        {/* 3 Overview Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="glass-panel rounded-2xl p-6 border border-neutral-800">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display mb-2">
              Hackathon Purpose
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Engineered to showcase practical application of modern transformer-based video understanding models on public safety surveillance streams.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-neutral-800">
            <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display mb-2">
              Modern Video ViT
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Moves beyond traditional single-frame CNN detectors by modeling the temporal sequence of 8 equidistant frames via TimeSformer attention.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-neutral-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display mb-2">
              Extensible API Architecture
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Provides robust REST endpoints for seamless integration between the React command HUD and Python / FastAPI inference microservices.
            </p>
          </div>

        </div>

        {/* Tech Stack Matrix */}
        <div className="glass-panel-accent rounded-2xl p-6 sm:p-8 border border-cyan-500/20">
          <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>TECHNOLOGY STACK SUMMARY</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs font-mono">
            <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
              <span className="text-neutral-500 block mb-1">FRAMEWORK</span>
              <span className="text-white font-bold">PyTorch 2.x</span>
            </div>
            <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
              <span className="text-neutral-500 block mb-1">TRANSFORMERS</span>
              <span className="text-cyan-300 font-bold">Hugging Face</span>
            </div>
            <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
              <span className="text-neutral-500 block mb-1">VISION CORE</span>
              <span className="text-white font-bold">TimeSformer ViT</span>
            </div>
            <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
              <span className="text-neutral-500 block mb-1">SAMPLING</span>
              <span className="text-cyan-300 font-bold">OpenCV 4.x</span>
            </div>
            <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
              <span className="text-neutral-500 block mb-1">BACKEND API</span>
              <span className="text-white font-bold">FastAPI / Uvicorn</span>
            </div>
            <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
              <span className="text-neutral-500 block mb-1">FRONTEND HUD</span>
              <span className="text-cyan-300 font-bold">React · Tailwind</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
