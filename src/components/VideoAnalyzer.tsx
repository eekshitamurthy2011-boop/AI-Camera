import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, Play, Square, RefreshCw, FileVideo, Sparkles, AlertTriangle, CheckCircle2, Film, Layers, ShieldCheck, ShieldAlert, Cpu } from 'lucide-react';
import { SampleVideo, DetectionClass, DetectionRecord } from '../types';
import { SAMPLE_VIDEOS, ANALYSIS_STEPS } from '../mock/mockData';
import { AnalysisResult } from './AnalysisResult';
import { api } from '../services/api';

interface VideoAnalyzerProps {
  onNewDetection: (record: DetectionRecord) => void;
  onOpenAlert: (record: DetectionRecord) => void;
}

export const VideoAnalyzer: React.FC<VideoAnalyzerProps> = ({ onNewDetection, onOpenAlert }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedSample, setSelectedSample] = useState<SampleVideo | null>(SAMPLE_VIDEOS[0]);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  
  // Analysis runtime state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisCompleted, setAnalysisCompleted] = useState(false);
  
  // Video player controls & state
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [activeFrameScan, setActiveFrameScan] = useState(1);
  
  // Analysis Output
  const [resultData, setResultData] = useState<{
    status: DetectionClass;
    confidence: number;
    accidentProbability: number;
    isSimulated: boolean;
    framesAnalyzed: number;
    processingTimeMs: number;
    timestamp: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const abortControllerRef = useRef<boolean>(false);

  // Set initial sample
  useEffect(() => {
    if (!selectedFile && selectedSample) {
      // Keep selectedSample active
    }
  }, [selectedFile, selectedSample]);

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const processSelectedFile = (file: File) => {
    // Validate format
    const validExtensions = ['.mp4', '.avi', '.mov', '.mkv'];
    const nameLower = file.name.toLowerCase();
    const isValid = validExtensions.some((ext) => nameLower.endsWith(ext)) || file.type.startsWith('video/');

    if (!isValid) {
      alert('Supported video formats: MP4, AVI, MOV, MKV');
      return;
    }

    setSelectedFile(file);
    setSelectedSample(null);
    setResultData(null);
    setAnalysisCompleted(false);

    const url = URL.createObjectURL(file);
    setVideoPreviewUrl(url);
  };

  const handleSelectSample = (sample: SampleVideo) => {
    setSelectedSample(sample);
    setSelectedFile(null);
    setVideoPreviewUrl(null);
    setResultData(null);
    setAnalysisCompleted(false);
  };

  // Run the 8-step TimeSformer analysis
  const startAnalysis = async (forcedClass?: DetectionClass) => {
    setIsAnalyzing(true);
    setCurrentStepIndex(0);
    setAnalysisProgress(0);
    setAnalysisCompleted(false);
    abortControllerRef.current = false;

    const startTime = Date.now();
    const totalSteps = ANALYSIS_STEPS.length;

    // Step-by-step sequential loading animation
    for (let i = 0; i < totalSteps; i++) {
      if (abortControllerRef.current) {
        setIsAnalyzing(false);
        return;
      }
      setCurrentStepIndex(i);
      setAnalysisProgress(Math.round(((i + 1) / totalSteps) * 100));
      setActiveFrameScan(Math.min(8, i + 1));
      await new Promise((res) => setTimeout(res, 280));
    }

    if (abortControllerRef.current) {
      setIsAnalyzing(false);
      return;
    }

    // Call API / Inference
    try {
      const preferredClass = forcedClass || (selectedSample ? selectedSample.expectedClass : undefined);
      const targetPayload = selectedFile || {
        name: selectedSample ? selectedSample.filename : 'surveillance_feed.mp4',
        duration: selectedSample ? selectedSample.duration : '00:20',
        preferredClass
      };

      const inference = await api.analyzeVideo(targetPayload);

      const endTime = Date.now();
      const elapsed = endTime - startTime;

      const newResult = {
        status: inference.prediction,
        confidence: inference.confidence,
        accidentProbability: inference.accidentProbability,
        isSimulated: inference.isSimulated,
        framesAnalyzed: 8,
        processingTimeMs: elapsed,
        timestamp: new Date().toLocaleTimeString()
      };

      setResultData(newResult);
      setAnalysisCompleted(true);
      setIsAnalyzing(false);

      // Record in detection history and trigger alert if accident
      const newRecord: DetectionRecord = {
        id: `#${Math.floor(100 + Math.random() * 900)}`,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: new Date().toTimeString().split(' ')[0],
        videoName: selectedFile ? selectedFile.name : selectedSample?.filename || 'video_stream.mp4',
        prediction: inference.prediction,
        confidence: inference.confidence,
        accidentProbability: inference.accidentProbability,
        status: 'Unreviewed',
        isSimulated: inference.isSimulated,
        framesAnalyzed: 8,
        videoDuration: selectedSample?.duration || '00:24',
        notes: inference.prediction === 'ACCIDENT'
          ? 'Spatial-temporal anomaly detected across frames F04-F06.'
          : 'Uniform vehicular flow verified across all 8 sampled temporal tokens.'
      };

      onNewDetection(newRecord);

      if (inference.prediction === 'ACCIDENT') {
        onOpenAlert(newRecord);
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setIsAnalyzing(false);
    }
  };

  const stopAnalysis = () => {
    abortControllerRef.current = true;
    setIsAnalyzing(false);
  };

  const resetAll = () => {
    abortControllerRef.current = true;
    setIsAnalyzing(false);
    setAnalysisCompleted(false);
    setResultData(null);
    setAnalysisProgress(0);
    setCurrentStepIndex(0);
  };

  const downloadReportJson = () => {
    if (!resultData) return;
    const payload = {
      platform: 'AI Sentinel',
      model: 'TimeSformer Video Transformer (PyTorch/Transformers)',
      sampling: '8 Uniform Temporal Frames',
      result: resultData,
      video: {
        filename: selectedFile?.name || selectedSample?.filename,
        duration: selectedSample?.duration || '00:24'
      },
      exportedAt: new Date().toISOString()
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ai_sentinel_${resultData.status.toLowerCase()}_report.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section id="detection" className="py-20 bg-neutral-950 border-b border-cyan-500/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                Core Inference Engine
              </span>
              <span className="text-neutral-500">·</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                DEMO MODE ACTIVE
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              AI Video Analyzer
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-300 max-w-2xl">
              Upload surveillance footage or load reference camera files. The TimeSformer architecture uniformly extracts 8 video frames to classify the sequence as <strong className="text-white">NORMAL</strong> or <strong className="text-white">ACCIDENT</strong>.
            </p>
          </div>

          {/* Quick Demo Mode Controls */}
          <div className="flex flex-wrap items-center gap-2 bg-neutral-900/80 p-2 rounded-xl border border-neutral-800 shrink-0">
            <span className="text-[11px] font-mono text-neutral-400 px-2">Simulate:</span>
            <button
              onClick={() => {
                handleSelectSample(SAMPLE_VIDEOS[0]);
                startAnalysis('ACCIDENT');
              }}
              disabled={isAnalyzing}
              className="px-3 py-1.5 text-xs font-mono font-semibold bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 rounded-lg transition-colors disabled:opacity-50"
            >
              Simulate Accident
            </button>
            <button
              onClick={() => {
                handleSelectSample(SAMPLE_VIDEOS[1]);
                startAnalysis('NORMAL');
              }}
              disabled={isAnalyzing}
              className="px-3 py-1.5 text-xs font-mono font-semibold bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 rounded-lg transition-colors disabled:opacity-50"
            >
              Simulate Normal
            </button>
            <button
              onClick={resetAll}
              className="px-3 py-1.5 text-xs font-mono text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              Clear Result
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Upload / Video Selector */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Drag & Drop Upload Zone */}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="glass-panel rounded-2xl p-6 sm:p-8 border-2 border-dashed border-cyan-500/30 hover:border-cyan-400/70 transition-all text-center cursor-pointer group bg-neutral-900/30 hover:bg-cyan-950/20"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".mp4,.avi,.mov,.mkv,video/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mx-auto mb-4 group-hover:scale-105 group-hover:border-cyan-400/50 transition-all">
                <UploadCloud className="w-7 h-7" />
              </div>

              <h4 className="text-base font-semibold text-white mb-1">
                Upload Surveillance Video
              </h4>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto mb-3">
                Drag and drop your surveillance clip here, or click to browse.
              </p>
              
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-neutral-400 bg-neutral-950/60 px-3 py-1 rounded-full border border-neutral-800">
                <span>SUPPORTED:</span>
                <span className="text-cyan-300">MP4 · AVI · MOV · MKV</span>
              </div>
            </div>

            {/* Reference Sample Videos */}
            <div className="glass-panel rounded-2xl p-5 border border-cyan-500/15">
              <div className="flex items-center justify-between mb-3 text-xs font-mono">
                <span className="text-neutral-300 font-semibold flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-cyan-400" />
                  Preset Surveillance Footage
                </span>
                <span className="text-neutral-500 text-[11px]">3 Scenarios</span>
              </div>

              <div className="space-y-2.5">
                {SAMPLE_VIDEOS.map((sample) => {
                  const isSelected = !selectedFile && selectedSample?.id === sample.id;
                  const isAcc = sample.expectedClass === 'ACCIDENT';
                  return (
                    <div
                      key={sample.id}
                      onClick={() => handleSelectSample(sample)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                        isSelected
                          ? 'bg-cyan-950/50 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                          : 'bg-neutral-900/50 border-neutral-800 hover:border-cyan-500/30'
                      }`}
                    >
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-neutral-950 shrink-0 relative border border-neutral-700">
                        <img
                          src={sample.imageSrc}
                          alt={sample.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-0.5 right-0.5 bg-black/80 font-mono text-[9px] px-1 rounded text-neutral-200">
                          {sample.duration}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0 text-left">
                        <div className="text-xs font-semibold text-white truncate">
                          {sample.title}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400 mt-1">
                          <span className={isAcc ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                            {sample.expectedClass}
                          </span>
                          <span>·</span>
                          <span>{sample.resolution}</span>
                        </div>
                      </div>

                      <span className={`w-2 h-2 rounded-full shrink-0 ${isAcc ? 'bg-rose-400' : 'bg-emerald-400'}`} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Video File Specs Badge */}
            <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 text-xs font-mono space-y-1.5">
              <div className="flex items-center justify-between text-neutral-400">
                <span>ACTIVE FILE:</span>
                <span className="text-white truncate max-w-[200px]">
                  {selectedFile ? selectedFile.name : selectedSample?.filename}
                </span>
              </div>
              <div className="flex items-center justify-between text-neutral-400">
                <span>DURATION:</span>
                <span className="text-cyan-300">
                  {selectedSample?.duration || (selectedFile ? 'Estimated ~00:20' : '--:--')}
                </span>
              </div>
              <div className="flex items-center justify-between text-neutral-400">
                <span>STATUS:</span>
                <span className={isAnalyzing ? 'text-amber-400 font-bold' : analysisCompleted ? 'text-emerald-400' : 'text-neutral-300'}>
                  {isAnalyzing ? 'Processing TimeSformer...' : analysisCompleted ? 'Inference Completed' : 'Ready for Analysis'}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Video Preview & Overlay & Loading & Results */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Video Player Display Container */}
            <div className="glass-panel-accent rounded-2xl p-4 border border-cyan-500/25 overflow-hidden relative">
              
              {/* Top Stream HUD */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-cyan-500/15 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-neutral-200 font-semibold">SURVEILLANCE FEED INSPECTOR</span>
                </div>
                <div className="text-neutral-400 text-[11px]">
                  FRAME EXTRACTION: <span className="text-cyan-400">8 TOKENS</span>
                </div>
              </div>

              {/* Viewport Box */}
              <div className="relative aspect-video rounded-xl bg-neutral-950 overflow-hidden border border-neutral-800">
                {videoPreviewUrl ? (
                  <video
                    ref={videoElementRef}
                    src={videoPreviewUrl}
                    controls
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full relative">
                    <img
                      src={selectedSample?.imageSrc || SAMPLE_VIDEOS[0].imageSrc}
                      alt="Surveillance Preview"
                      className="w-full h-full object-cover brightness-90"
                      referrerPolicy="no-referrer"
                    />

                    {/* Scanning Line Animation if analyzing */}
                    {isAnalyzing && (
                      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-scanline pointer-events-none" />
                    )}

                    {/* Grid Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                    {/* AI Visualization Layer */}
                    <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
                      
                      {/* Top HUD stamps */}
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="bg-black/75 px-2 py-0.5 rounded text-cyan-300 border border-cyan-500/30">
                          AI SCANNING · CAM-SEC-04
                        </span>
                        <span className="bg-black/75 px-2 py-0.5 rounded text-neutral-300 border border-neutral-700">
                          {isAnalyzing ? `FRAME ${activeFrameScan} / 8` : 'READY'}
                        </span>
                      </div>

                      {/* Result Box if completed */}
                      {analysisCompleted && resultData && (
                        <div className="self-center bg-black/85 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 text-center pointer-events-auto">
                          <div className="text-[10px] font-mono uppercase text-neutral-400">
                            INFERENCE RESULT
                          </div>
                          <div className={`text-base font-bold font-display ${resultData.status === 'ACCIDENT' ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {resultData.status === 'ACCIDENT' ? 'ACCIDENT DETECTED' : 'NORMAL TRAFFIC'}
                          </div>
                          <div className="text-xs font-mono text-neutral-300">
                            Confidence: {resultData.confidence.toFixed(1)}%
                          </div>
                        </div>
                      )}

                      {/* Bottom Info HUD */}
                      <div className="flex items-end justify-between text-[11px] font-mono bg-gradient-to-t from-black/85 via-black/50 to-transparent p-2 -mx-4 -mb-4">
                        <span className="text-neutral-300">
                          RES: 1920x1080 · 30 FPS
                        </span>
                        <span className="text-cyan-400">
                          TIMESFORMER 8-FRAME
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Analysis Control Bar */}
              <div className="mt-4 pt-3 border-t border-cyan-500/15 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {!isAnalyzing ? (
                    <button
                      onClick={() => startAnalysis()}
                      className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-neutral-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Analyze Video</span>
                    </button>
                  ) : (
                    <button
                      onClick={stopAnalysis}
                      className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors"
                    >
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>Stop Analysis</span>
                    </button>
                  )}

                  <button
                    onClick={resetAll}
                    disabled={isAnalyzing}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>

                <div className="text-xs font-mono text-neutral-400">
                  {selectedFile ? selectedFile.name : selectedSample?.title}
                </div>
              </div>

            </div>

            {/* Analysis Loading Sequence Bar */}
            {isAnalyzing && (
              <div className="glass-panel-accent rounded-2xl p-6 border border-cyan-400/40 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                    <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
                    <span>{ANALYSIS_STEPS[currentStepIndex]}</span>
                  </div>
                  <span className="text-cyan-400 font-bold">{analysisProgress}%</span>
                </div>

                {/* Progress track */}
                <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-cyan-500/20">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 shadow-[0_0_10px_#22d3ee]"
                    style={{ width: `${analysisProgress}%` }}
                  />
                </div>

                {/* Step list checklist */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] font-mono">
                  {ANALYSIS_STEPS.map((step, idx) => (
                    <div
                      key={step}
                      className={`flex items-center gap-1.5 ${
                        idx < currentStepIndex
                          ? 'text-cyan-400'
                          : idx === currentStepIndex
                          ? 'text-white font-bold animate-pulse'
                          : 'text-neutral-600'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                      <span className="truncate">{step.replace('...', '')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Final Result Card Component */}
            {analysisCompleted && resultData && (
              <AnalysisResult
                status={resultData.status}
                confidence={resultData.confidence}
                accidentProbability={resultData.accidentProbability}
                isSimulated={resultData.isSimulated}
                framesAnalyzed={resultData.framesAnalyzed}
                videoName={selectedFile?.name || selectedSample?.filename || 'video.mp4'}
                videoDuration={selectedSample?.duration || '00:24'}
                processingTimeMs={resultData.processingTimeMs}
                selectedSample={selectedSample}
                onReset={resetAll}
                onDownloadReport={downloadReportJson}
                onTriggerAlert={() => {
                  if (resultData.status === 'ACCIDENT') {
                    onOpenAlert({
                      id: '#001',
                      date: 'Today',
                      time: resultData.timestamp,
                      videoName: selectedFile?.name || selectedSample?.filename || 'video.mp4',
                      prediction: 'ACCIDENT',
                      confidence: resultData.confidence,
                      accidentProbability: resultData.accidentProbability,
                      status: 'Unreviewed',
                      isSimulated: resultData.isSimulated,
                      framesAnalyzed: 8
                    });
                  }
                }}
              />
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
