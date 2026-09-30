import React, { useState } from 'react';
import { Video, Film, Sliders, Cpu, Binary, Percent, Bell, LayoutDashboard, ChevronRight } from 'lucide-react';

export const SolutionSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(3); // TimeSformer selected by default

  const pipeline = [
    {
      id: 'step-1',
      title: 'Video Input',
      sub: 'Surveillance stream / file',
      icon: Video,
      details: 'Accepts raw CCTV, MP4, AVI, or real-time RTSP stream feeds from roadside and municipal monitoring points.'
    },
    {
      id: 'step-2',
      title: 'Frame Sampling',
      sub: 'OpenCV uniform 8-slice',
      icon: Film,
      details: 'Extracts 8 equidistant temporal frames across the video duration using OpenCV VideoCapture to capture temporal progression.'
    },
    {
      id: 'step-3',
      title: 'Preprocessing',
      sub: '224×224 patch tokenize',
      icon: Sliders,
      details: 'Normalizes frames to RGB, resizes to 224×224 resolution, and converts images into non-overlapping 16×16 spatial patches.'
    },
    {
      id: 'step-4',
      title: 'TimeSformer Model',
      sub: 'Divided space-time attention',
      icon: Cpu,
      details: 'Applies self-attention across time (temporal attention) and space (spatial attention) to recognize kinetic impact dynamics.'
    },
    {
      id: 'step-5',
      title: 'AI Classification',
      sub: 'Binary linear projection',
      icon: Binary,
      details: 'Linear projection layer maps the sequence representation into binary logits: NORMAL vs ACCIDENT.'
    },
    {
      id: 'step-6',
      title: 'Accident Probability',
      sub: 'Calibrated Softmax score',
      icon: Percent,
      details: 'Calculates definitive confidence percentages and triggers risk thresholds when incident probability rises.'
    },
    {
      id: 'step-7',
      title: 'Alert / Result',
      sub: 'Immediate dispatch notification',
      icon: Bell,
      details: 'Instantly surfaces high-priority visual alarms, location stamps, and video timestamps for rapid emergency triage.'
    },
    {
      id: 'step-8',
      title: 'Dashboard',
      sub: 'Centralized analytics & history',
      icon: LayoutDashboard,
      details: 'Archives incident logs, updates real-time analytics graphs, and logs review statuses for post-event audit.'
    }
  ];

  return (
    <section id="how-it-works-pipeline" className="py-20 bg-neutral-950/80 border-b border-cyan-500/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-2">
            Automated Video Intelligence
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Our AI Solution
          </h2>
          <p className="mt-4 text-base text-neutral-300 leading-relaxed text-balance">
            AI Sentinel automatically analyzes surveillance footage using an advanced video classification model. By learning temporal vehicle trajectories and sudden kinetic anomalies, accidents are flagged autonomously in seconds.
          </p>
        </div>

        {/* Pipeline Interactive Rail */}
        <div className="glass-panel-accent rounded-2xl p-6 sm:p-8 border border-cyan-500/25">
          <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider mb-6 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              END-TO-END INFERENCE PIPELINE
            </span>
            <span className="text-neutral-400 text-[11px] hidden sm:inline">
              Click any step to inspect technical details
            </span>
          </div>

          {/* Steps Horizontal Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 relative">
            {pipeline.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = activeStep === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`text-left p-3.5 rounded-xl border transition-all relative flex flex-col justify-between h-36 ${
                    isSelected
                      ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400/50'
                      : 'bg-neutral-900/60 border-neutral-800 hover:border-cyan-500/30 text-neutral-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-cyan-300' : 'text-neutral-500'}`}>
                        0{idx + 1}
                      </span>
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-neutral-400'}`} />
                    </div>
                    <div className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-neutral-200'}`}>
                      {step.title}
                    </div>
                  </div>

                  <div className="text-[10px] text-neutral-400 font-mono leading-tight mt-2 border-t border-neutral-800/80 pt-1.5">
                    {step.sub}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Deep-Dive Box */}
          <div className="mt-6 p-4 rounded-xl bg-neutral-950/80 border border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">
                  Step 0{activeStep + 1}: {pipeline[activeStep].title}
                </span>
                <span className="text-xs text-neutral-500">·</span>
                <span className="text-xs text-neutral-400 font-mono">{pipeline[activeStep].sub}</span>
              </div>
              <p className="text-sm text-neutral-200">
                {pipeline[activeStep].details}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : pipeline.length - 1))}
                className="px-3 py-1.5 text-xs font-mono rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800"
              >
                Previous
              </button>
              <button
                onClick={() => setActiveStep((prev) => (prev < pipeline.length - 1 ? prev + 1 : 0))}
                className="px-3 py-1.5 text-xs font-mono rounded bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/30 flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
