import React, { useState } from 'react';
import { Shield, Activity, Radio, Cpu, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onLaunchDetection: () => void;
  isBackendConnected: boolean;
  onOpenBackendModal: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onLaunchDetection,
  isBackendConnected,
  onOpenBackendModal,
  activeSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'AI Detection', href: '#detection' },
    { label: 'Live Monitor', href: '#live' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'History', href: '#history' },
    { label: 'AI Engine', href: '#ai-engine' },
    { label: 'About', href: '#about' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/85 backdrop-blur-md border-b border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Brand Wordmark */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)] group-hover:border-cyan-300 transition-colors">
            <Shield className="w-5 h-5 text-cyan-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold tracking-wider text-white flex items-center gap-1.5">
              AI SENTINEL
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`transition-colors py-1 relative hover:text-cyan-400 ${
                activeSection === link.href.replace('#', '') ? 'text-cyan-400 font-semibold' : 'text-neutral-300'
              }`}
            >
              {link.label}
              {activeSection === link.href.replace('#', '') && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
              )}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions + Mode Indicator */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Backend / Demo Indicator */}
          <button
            onClick={onOpenBackendModal}
            title="Configure Python / FastAPI Backend"
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-md border transition-all ${
              isBackendConnected
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30 hover:bg-emerald-900/40'
                : 'bg-neutral-900/80 text-cyan-300 border-cyan-500/20 hover:border-cyan-400/40'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isBackendConnected ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'}`} />
            <span>{isBackendConnected ? 'FASTAPI CONNECTED' : 'DEMO MODE'}</span>
            <Cpu className="w-3 h-3 text-neutral-400" />
          </button>

          {/* Primary CTA */}
          <button
            onClick={onLaunchDetection}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Launch Detection</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onLaunchDetection}
            className="px-3 py-1.5 text-xs font-semibold bg-cyan-400 text-neutral-950 rounded-md"
          >
            Detect
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-800 bg-neutral-950/95 px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs font-mono text-neutral-400">
            <span>PLATFORM STATUS</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBackendModal();
              }}
              className="text-cyan-400 flex items-center gap-1 hover:underline"
            >
              <span>{isBackendConnected ? 'FastAPI Connected' : 'Demo Mode (Click to configure)'}</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 rounded-md text-neutral-300 hover:bg-neutral-900 hover:text-cyan-400"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onLaunchDetection();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg"
            >
              Launch Detection
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
