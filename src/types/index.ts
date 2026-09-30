export type DetectionClass = 'NORMAL' | 'ACCIDENT';

export interface DetectionRecord {
  id: string;
  date: string;
  time: string;
  videoName: string;
  prediction: DetectionClass;
  confidence: number;
  accidentProbability: number;
  status: 'Reviewed' | 'Unreviewed';
  isSimulated: boolean;
  framesAnalyzed: number;
  notes?: string;
  videoDuration?: string;
  location?: string;
}

export interface SampleVideo {
  id: string;
  title: string;
  filename: string;
  duration: string;
  expectedClass: DetectionClass;
  confidenceEstimate: number;
  accidentProbEstimate: number;
  description: string;
  imageSrc: string;
  resolution: string;
}

export interface AnalysisState {
  isAnalyzing: boolean;
  currentStepIndex: number;
  currentStepText: string;
  progressPercent: number;
  completed: boolean;
  result: {
    status: DetectionClass;
    confidence: number;
    accidentProbability: number;
    framesAnalyzed: number;
    timestamp: string;
    isSimulated: boolean;
    processingTimeMs: number;
  } | null;
}

export interface AnalyticsData {
  totalAnalyzed: number;
  accidentsDetected: number;
  normalVideos: number;
  averageConfidence: number;
  timeline: { time: string; normal: number; accident: number }[];
  confidenceDistribution: { range: string; count: number }[];
  hourlyActivity: { hour: string; videos: number }[];
}

export interface ModelStatus {
  modelName: string;
  framework: string;
  backbone: string;
  frameSampling: string;
  inputResolution: string;
  backendState: 'connected' | 'demo_mode';
  backendUrl: string;
  metrics: {
    accuracy: string;
    precision: string;
    recall: string;
    f1Score: string;
    statusText: string;
  };
}
