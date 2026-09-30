import React from 'react';
import { Video, Film, Sliders, Cpu, Binary, Percent, Bell, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Video Input',
      icon: Video,
      summary: 'User uploads or provides video footage.',
      detail: 'Surveillance clips in MP4, AVI, MOV, or MKV format are fed into the system pipeline or piped from RTSP camera streams.'
    },
    {
      num: '02',
      title: 'Frame Sampling',
      icon: Film,
      summary: 'The system samples frames from different portions of the video.',
      detail: 'OpenCV VideoCapture uniformly samples exactly 8 frames across the entire clip to capture key temporal dynamics and velocity changes.'
    },
    {
      num: '03',
      title: 'Preprocessing',
      icon: Sliders,
      summary: 'Frames are converted and prepared for the AI model.',
      detail: 'Frames are converted to RGB tensors, scaled to 224×224 resolution, normalized with ImageNet statistics, and broken into 16×16 spatial patches.'
    },
    {
      num: '04',
      title: 'AI Model',
      icon: Cpu,
      summary: 'TimeSformer analyzes the sequence of video frames.',
      detail: 'The TimeSformer architecture computes Divided Space-Time Attention, isolating temporal motions across frames and spatial geometries within each frame.'
    },
    {
      num: '05',
      title: 'Classification',
      icon: Binary,
      summary: 'The model classifies the video as NORMAL or ACCIDENT.',
      detail: 'A binary classification head projects the learned sequence token into two target classes: NORMAL traffic flow or ACCIDENT event.'
    },
    {
      num: '06',
      title: 'Probability',
      icon: Percent,
      summary: 'The system calculates accident probability.',
      detail: 'Softmax activation outputs calibrated probability values (0.0% to 100.0%) indicating model confidence in the detected state.'
    },
    {
      num: '07',
      title: 'Alert',
      icon: Bell,
      summary: 'If an accident is detected, the dashboard displays an alert.',
      detail: 'Real-time high-contrast visual alert modals, timestamped incident records, and dispatcher notification cards are generated automatically.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-neutral-950 border-b border-cyan-500/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-2">
            Execution Flow
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            How It Works
          </h2>
          <p className="mt-4 text-base text-neutral-300 leading-relaxed text-balance">
            Follow the automated lifecycle from raw video ingestion through 8-frame temporal sampling, transformer attention, and instant safety alerting.
          </p>
        </div>

        {/* 7-Step Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="glass-panel rounded-2xl p-6 border border-neutral-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-extrabold text-cyan-400/80 group-hover:text-cyan-300 transition-colors">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/50 group-hover:scale-105 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight font-display mb-1.5">
                    {step.title}
                  </h3>

                  <p className="text-xs font-semibold text-cyan-300/90 font-mono mb-2">
                    {step.summary}
                  </p>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {step.detail}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                  <span>STAGE {step.num} / 07</span>
                  <ArrowRight className="w-3 h-3 text-neutral-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
