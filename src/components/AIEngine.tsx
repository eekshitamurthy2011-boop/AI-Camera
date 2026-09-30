import React from 'react';
import { Cpu, Layers, Sparkles, Binary, CheckCircle2, AlertTriangle, ArrowRight, Gauge } from 'lucide-react';
import timesformerImg from '@/src/assets/images/timesformer_attention_1790782787018.jpg';
import { ModelStatus } from '../types';

interface AIEngineProps {
  modelStatus: ModelStatus;
}

export const AIEngine: React.FC<AIEngineProps> = ({ modelStatus }) => {
  const metricCards = [
    { title: 'Accuracy', value: modelStatus.metrics.accuracy },
    { title: 'Precision', value: modelStatus.metrics.precision },
    { title: 'Recall', value: modelStatus.metrics.recall },
    { title: 'F1 Score', value: modelStatus.metrics.f1Score }
  ];

  return (
    <section id="ai-engine" className="py-20 bg-neutral-950/90 border-b border-cyan-500/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-2">
            Model Architecture
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            AI Engine
          </h2>
          <p className="mt-4 text-base text-neutral-300 leading-relaxed text-balance">
            TimeSformer (Time-Space Transformer) is an innovative video classification architecture developed specifically for video understanding by applying pure self-attention directly to video frame sequences.
          </p>
        </div>

        {/* 3-Column Concept Breakdown: Input, Processing, Output */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Input */}
          <div className="glass-panel rounded-2xl p-6 border border-cyan-500/20">
            <span className="text-[11px] font-mono uppercase text-neutral-500 block mb-2">
              PHASE 01 · INPUT
            </span>
            <h3 className="text-lg font-bold text-white font-display mb-2 flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              Video Frames
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              OpenCV extracts 8 equidistant temporal frames from raw CCTV video. Each frame is converted to a 224×224 resolution tensor and divided into non-overlapping 16×16 spatial image patches.
            </p>
            <div className="mt-4 pt-3 border-t border-neutral-800 text-[11px] font-mono text-cyan-300">
              Shape: (B × 8 × 3 × 224 × 224)
            </div>
          </div>

          {/* Card 2: Processing */}
          <div className="glass-panel-accent rounded-2xl p-6 border border-cyan-400/40 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
            <span className="text-[11px] font-mono uppercase text-cyan-400 block mb-2">
              PHASE 02 · PROCESSING
            </span>
            <h3 className="text-lg font-bold text-white font-display mb-2 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-300" />
              Temporal + Spatial Attention
            </h3>
            <p className="text-xs text-neutral-200 leading-relaxed">
              Unlike 3D CNNs that are computationally rigid, TimeSformer applies <em>Divided Space-Time Attention</em>. Temporal attention captures motion vectors across frames, while spatial attention captures vehicle geometry.
            </p>
            <div className="mt-4 pt-3 border-t border-cyan-500/20 text-[11px] font-mono text-cyan-200">
              Divided Space-Time Self-Attention
            </div>
          </div>

          {/* Card 3: Output */}
          <div className="glass-panel rounded-2xl p-6 border border-indigo-500/30">
            <span className="text-[11px] font-mono uppercase text-neutral-500 block mb-2">
              PHASE 03 · OUTPUT
            </span>
            <h3 className="text-lg font-bold text-white font-display mb-2 flex items-center gap-2">
              <Binary className="w-5 h-5 text-indigo-400" />
              Accident Probability
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              A binary classification head projects the learned video sequence token [CLS] into logits for <strong className="text-emerald-400">NORMAL</strong> vs <strong className="text-rose-400">ACCIDENT</strong>, outputting a calibrated Softmax probability score.
            </p>
            <div className="mt-4 pt-3 border-t border-neutral-800 text-[11px] font-mono text-indigo-300">
              Binary Softmax: NORMAL vs ACCIDENT
            </div>
          </div>

        </div>

        {/* Visual Architecture Deep Dive with Diagram */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-neutral-800 mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>VIDEO TRANSFORMER PARADIGM</span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                Why TimeSformer for Accident Detection?
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed">
                Traffic collisions are inherently kinetic temporal events. A single static frame rarely proves a crash; it could just be a car waiting at an intersection.
              </p>

              <p className="text-sm text-neutral-300 leading-relaxed">
                TimeSformer compares patch tokens across consecutive temporal slices. If vehicle velocity drops abruptly or rotational trajectory angles spike between frames F03 and F05, the temporal attention weights peak, signalling a collision with high confidence.
              </p>

              <div className="pt-3 space-y-2 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>FRAME RATE INDEPENDENT TEMPORAL STRIDE</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>LOW INFERENCE LATENCY COMPARED TO 3D CONVNETS</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-xl overflow-hidden border border-cyan-500/25 relative aspect-[16/9] shadow-2xl">
                <img
                  src={timesformerImg}
                  alt="TimeSformer Divided Space-Time Attention Diagram"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-mono text-cyan-200 bg-neutral-950/80 px-3 py-1 rounded border border-cyan-500/30">
                    Space-Time Attention Patch Tokenization (8 Frames × 196 Patches)
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Section: Model Metrics */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-neutral-800">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-1">
                Model Evaluation Benchmarks
              </span>
              <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                Model Metrics
              </h3>
            </div>
            
            <span className="text-xs font-mono text-amber-300/90 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-md self-start sm:self-auto">
              Evaluation Status: College Hackathon Prototype
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {metricCards.map((metric) => (
              <div
                key={metric.title}
                className="glass-panel rounded-xl p-5 border border-neutral-800 text-left"
              >
                <div className="text-xs font-mono text-neutral-400 uppercase mb-2">
                  {metric.title}
                </div>
                <div className="text-sm font-mono font-medium text-amber-300/90 italic">
                  {metric.value}
                </div>
                <div className="text-[11px] font-mono text-neutral-500 mt-2">
                  Test-set validation in progress
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 text-xs font-mono text-neutral-400 leading-relaxed flex items-start gap-3">
            <Gauge className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-neutral-200">Evaluation Integrity Policy: </strong>
              To uphold scientific rigor for hackathon judging, evaluation metrics are not fabricated or hardcoded. These metric slots will automatically reflect the verified benchmark scores once the PyTorch training checkpoint is evaluated against the designated test set.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
