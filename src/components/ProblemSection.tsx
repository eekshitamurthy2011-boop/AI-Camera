import React from 'react';
import { Eye, HardDrive, Clock, Brain, Radio } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      title: 'Manual Monitoring',
      icon: Eye,
      description: 'Conventional traffic surveillance relies on human operators to observe video screens across multiple junctions simultaneously.'
    },
    {
      title: 'Large Video Volumes',
      icon: HardDrive,
      description: 'Municipal camera networks continuously generate hundreds of hours of raw video, making comprehensive manual inspection impractical.'
    },
    {
      title: 'Delayed Accident Detection',
      icon: Clock,
      description: 'Incidents frequently go unnoticed until bystanders place emergency calls or major congestion cascades upstream along the corridor.'
    },
    {
      title: 'Human Attention Limitations',
      icon: Brain,
      description: 'Operator fatigue and visual saturation naturally reduce vigilance during prolonged surveillance monitoring shifts.'
    },
    {
      title: 'Difficult Real-Time Monitoring',
      icon: Radio,
      description: 'Tracking rapid trajectory anomalies, collisions, and sudden stoppages across wide-angle feeds exceeds manual human reflex response.'
    }
  ];

  return (
    <section id="problem" className="py-20 bg-neutral-950 border-b border-cyan-500/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-2">
            The Surveillance Challenge
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            The Problem
          </h2>
          <p className="mt-4 text-base text-neutral-300 leading-relaxed text-balance">
            Conventional traffic video surveillance requires humans to continuously monitor large amounts of video footage. Without automated video-level intelligence, critical safety incidents risk delayed response times.
          </p>
        </div>

        {/* 5 Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`glass-panel rounded-xl p-6 hover:border-cyan-500/40 transition-all group ${
                  idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="w-11 h-11 rounded-lg bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/50 group-hover:text-cyan-300 transition-colors mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
