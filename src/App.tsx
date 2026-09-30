import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { VideoAnalyzer } from './components/VideoAnalyzer';
import { LiveMonitoring } from './components/LiveMonitoring';
import { AlertPanel } from './components/AlertPanel';
import { Dashboard } from './components/Dashboard';
import { DetectionHistory } from './components/DetectionHistory';
import { HowItWorks } from './components/HowItWorks';
import { AIEngine } from './components/AIEngine';
import { Architecture } from './components/Architecture';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { BackendModal } from './components/BackendModal';

import { DetectionRecord, AnalyticsData, ModelStatus } from './types';
import { api } from './services/api';
import { INITIAL_DETECTION_HISTORY, INITIAL_ANALYTICS, INITIAL_MODEL_STATUS } from './mock/mockData';

export default function App() {
  const [history, setHistory] = useState<DetectionRecord[]>(INITIAL_DETECTION_HISTORY);
  const [analytics, setAnalytics] = useState<AnalyticsData>(INITIAL_ANALYTICS);
  const [modelStatus, setModelStatus] = useState<ModelStatus>(INITIAL_MODEL_STATUS);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);
  const [isBackendModalOpen, setIsBackendModalOpen] = useState<boolean>(false);
  const [activeAlert, setActiveAlert] = useState<DetectionRecord | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Load initial state & check backend on mount
  useEffect(() => {
    async function loadInitialData() {
      const [histData, analData, modData, health] = await Promise.all([
        api.getHistory(),
        api.getAnalytics(),
        api.getModelStatus(),
        api.checkBackendHealth()
      ]);

      setHistory(histData);
      setAnalytics(analData);
      setModelStatus(modData);
      setIsBackendConnected(health.connected);
    }

    loadInitialData();
  }, []);

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'detection', 'live', 'how-it-works', 'dashboard', 'history', 'ai-engine', 'about'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle new detection from VideoAnalyzer or Live Monitoring
  const handleNewDetection = (record: DetectionRecord) => {
    setHistory((prev) => {
      const updated = [record, ...prev];
      api.saveHistory(updated);
      return updated;
    });

    // Update analytics
    setAnalytics((prev) => {
      const isAcc = record.prediction === 'ACCIDENT';
      const newTotal = prev.totalAnalyzed + 1;
      const newAccidents = isAcc ? prev.accidentsDetected + 1 : prev.accidentsDetected;
      const newNormal = !isAcc ? prev.normalVideos + 1 : prev.normalVideos;
      const newAvgConf = Number(
        (((prev.averageConfidence * prev.totalAnalyzed) + record.confidence) / newTotal).toFixed(1)
      );

      // Update hourly timeline
      const updatedTimeline = [...prev.timeline];
      if (updatedTimeline.length > 0) {
        const lastEntry = { ...updatedTimeline[updatedTimeline.length - 1] };
        if (isAcc) {
          lastEntry.accident += 1;
        } else {
          lastEntry.normal += 1;
        }
        updatedTimeline[updatedTimeline.length - 1] = lastEntry;
      }

      const updatedAnalytics: AnalyticsData = {
        ...prev,
        totalAnalyzed: newTotal,
        accidentsDetected: newAccidents,
        normalVideos: newNormal,
        averageConfidence: newAvgConf,
        timeline: updatedTimeline
      };

      api.saveAnalytics(updatedAnalytics);
      return updatedAnalytics;
    });
  };

  const handleToggleHistoryStatus = (id: string) => {
    setHistory((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: (item.status === 'Reviewed' ? 'Unreviewed' : 'Reviewed') as 'Reviewed' | 'Unreviewed'
          };
        }
        return item;
      });
      api.saveHistory(updated);
      return updated;
    });

    if (activeAlert && activeAlert.id === id) {
      setActiveAlert(null);
    }
  };

  const handleMarkAlertReviewed = (id: string) => {
    handleToggleHistoryStatus(id);
    setActiveAlert(null);
  };

  const handleViewVideo = (record: DetectionRecord) => {
    const el = document.getElementById('detection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLaunchDetection = () => {
    const el = document.getElementById('detection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDashboardClick = () => {
    const el = document.getElementById('dashboard');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Fixed Header */}
      <Navbar
        onLaunchDetection={handleLaunchDetection}
        isBackendConnected={isBackendConnected}
        onOpenBackendModal={() => setIsBackendModalOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onAnalyzeClick={handleLaunchDetection}
          onDashboardClick={handleDashboardClick}
        />

        {/* Problem Section */}
        <ProblemSection />

        {/* Solution Section & Pipeline */}
        <SolutionSection />

        {/* AI Video Analyzer (Main Feature) */}
        <VideoAnalyzer
          onNewDetection={handleNewDetection}
          onOpenAlert={(record) => setActiveAlert(record)}
        />

        {/* Live Monitoring Simulator */}
        <LiveMonitoring
          onSimulateAccident={() => {}}
          onNewDetection={handleNewDetection}
          onOpenAlert={(record) => setActiveAlert(record)}
        />

        {/* How It Works (7 Steps) */}
        <HowItWorks />

        {/* Dashboard & Analytics */}
        <Dashboard
          analytics={analytics}
          isBackendConnected={isBackendConnected}
        />

        {/* Detection History Audit Log */}
        <DetectionHistory
          history={history}
          onToggleStatus={handleToggleHistoryStatus}
          onViewRecord={handleViewVideo}
        />

        {/* AI Engine & Model Metrics */}
        <AIEngine modelStatus={modelStatus} />

        {/* Technical Architecture & API Contracts */}
        <Architecture
          onOpenBackendModal={() => setIsBackendModalOpen(true)}
        />

        {/* About Hackathon Prototype */}
        <About />
      </main>

      {/* Emergency Alert Banner */}
      <AlertPanel
        alert={activeAlert}
        onDismiss={() => setActiveAlert(null)}
        onMarkReviewed={handleMarkAlertReviewed}
        onViewVideo={handleViewVideo}
      />

      {/* Backend Configuration Modal */}
      <BackendModal
        isOpen={isBackendModalOpen}
        onClose={() => setIsBackendModalOpen(false)}
        onConnectionChange={(connected) => setIsBackendConnected(connected)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
