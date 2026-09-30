import { DetectionRecord, SampleVideo, AnalyticsData, ModelStatus } from '../types';

import heroTrafficImg from '@/src/assets/images/hero_traffic_cctv_1790782752091.jpg';
import normalFeedImg from '@/src/assets/images/traffic_normal_feed_1790782764317.jpg';
import accidentFeedImg from '@/src/assets/images/traffic_accident_feed_1790782775616.jpg';
import timesformerImg from '@/src/assets/images/timesformer_attention_1790782787018.jpg';

export { heroTrafficImg, normalFeedImg, accidentFeedImg, timesformerImg };

export const SAMPLE_VIDEOS: SampleVideo[] = [
  {
    id: 'sample-acc-1',
    title: 'Highway Sector 4 — Shoulder Impact Collision',
    filename: 'highway_accident_cam04.mp4',
    duration: '00:18',
    expectedClass: 'ACCIDENT',
    confidenceEstimate: 94.7,
    accidentProbEstimate: 94.7,
    description: 'Surveillance recording of multi-car rear-end impact with vehicle spin and roadside barrier contact.',
    imageSrc: accidentFeedImg,
    resolution: '1920x1080 (30 fps)'
  },
  {
    id: 'sample-norm-1',
    title: 'Arterial Corridor — Orderly Flow',
    filename: 'arterial_normal_cam12.mp4',
    duration: '00:24',
    expectedClass: 'NORMAL',
    confidenceEstimate: 96.4,
    accidentProbEstimate: 3.6,
    description: 'Daylight urban arterial surveillance displaying standard vehicle lane compliance and continuous motion.',
    imageSrc: normalFeedImg,
    resolution: '1920x1080 (30 fps)'
  },
  {
    id: 'sample-norm-2',
    title: 'Metropolitan Junction — Evening Flow',
    filename: 'metro_junction_cam08.mp4',
    duration: '00:30',
    expectedClass: 'NORMAL',
    confidenceEstimate: 92.1,
    accidentProbEstimate: 7.9,
    description: 'Twilight intersection traffic with signal regulation and pedestrian safety clearance.',
    imageSrc: heroTrafficImg,
    resolution: '2560x1440 (30 fps)'
  }
];

export const INITIAL_DETECTION_HISTORY: DetectionRecord[] = [
  {
    id: '#001',
    date: '30 Sep 2026',
    time: '14:32:18',
    videoName: 'road_video.mp4',
    prediction: 'ACCIDENT',
    confidence: 94.7,
    accidentProbability: 94.7,
    status: 'Reviewed',
    isSimulated: true,
    framesAnalyzed: 8,
    notes: 'Multi-lane shoulder friction detected with vehicle hazard stop.',
    videoDuration: '00:18',
    location: 'Northbound Expressway — KM 42'
  },
  {
    id: '#002',
    date: '30 Sep 2026',
    time: '14:15:02',
    videoName: 'junction_cam_north.mp4',
    prediction: 'NORMAL',
    confidence: 96.4,
    accidentProbability: 3.6,
    status: 'Reviewed',
    isSimulated: true,
    framesAnalyzed: 8,
    notes: 'Steady vehicle velocity across all 4 signal quadrants.',
    videoDuration: '00:32',
    location: 'Central Avenue & 5th St'
  },
  {
    id: '#003',
    date: '30 Sep 2026',
    time: '13:58:44',
    videoName: 'expressway_km14_south.mp4',
    prediction: 'NORMAL',
    confidence: 91.8,
    accidentProbability: 8.2,
    status: 'Reviewed',
    isSimulated: true,
    framesAnalyzed: 8,
    notes: 'Moderate traffic density, nominal deceleration patterns.',
    videoDuration: '00:26',
    location: 'Expressway Flyover Ramp B'
  },
  {
    id: '#004',
    date: '30 Sep 2026',
    time: '13:22:10',
    videoName: 'highway_sector_9_incident.mp4',
    prediction: 'ACCIDENT',
    confidence: 89.3,
    accidentProbability: 89.3,
    status: 'Unreviewed',
    isSimulated: true,
    framesAnalyzed: 8,
    notes: 'Abrupt angular trajectory deviation followed by immediate deceleration.',
    videoDuration: '00:15',
    location: 'Suburban Ring Road — Node 9'
  },
  {
    id: '#005',
    date: '30 Sep 2026',
    time: '12:47:35',
    videoName: 'downtown_grid_east.mp4',
    prediction: 'NORMAL',
    confidence: 97.2,
    accidentProbability: 2.8,
    status: 'Reviewed',
    isSimulated: true,
    framesAnalyzed: 8,
    notes: 'Transit bus and passenger car lane traversal without incidents.',
    videoDuration: '00:40',
    location: 'East Corridor Arterial'
  },
  {
    id: '#006',
    date: '30 Sep 2026',
    time: '11:14:50',
    videoName: 'bridge_approach_cam03.mp4',
    prediction: 'NORMAL',
    confidence: 94.1,
    accidentProbability: 5.9,
    status: 'Reviewed',
    isSimulated: true,
    framesAnalyzed: 8,
    notes: 'Standard bridge crossing speeds, clear weather visibility.',
    videoDuration: '00:22',
    location: 'Harbor Bridge Toll Plaza'
  },
  {
    id: '#007',
    date: '30 Sep 2026',
    time: '09:41:22',
    videoName: 'freeway_interchange_crash.mp4',
    prediction: 'ACCIDENT',
    confidence: 96.8,
    accidentProbability: 96.8,
    status: 'Reviewed',
    isSimulated: true,
    framesAnalyzed: 8,
    notes: 'High-speed sideswipe impact between two sedans with debris.',
    videoDuration: '00:19',
    location: 'Freeway Interchange 104'
  }
];

export const INITIAL_ANALYTICS: AnalyticsData = {
  totalAnalyzed: 48,
  accidentsDetected: 9,
  normalVideos: 39,
  averageConfidence: 94.6,
  timeline: [
    { time: '08:00', normal: 5, accident: 0 },
    { time: '10:00', normal: 7, accident: 1 },
    { time: '12:00', normal: 9, accident: 2 },
    { time: '14:00', normal: 8, accident: 3 },
    { time: '16:00', normal: 6, accident: 2 },
    { time: '18:00', normal: 4, accident: 1 }
  ],
  confidenceDistribution: [
    { range: '85-88%', count: 4 },
    { range: '89-91%', count: 8 },
    { range: '92-94%', count: 14 },
    { range: '95-97%', count: 17 },
    { range: '98-100%', count: 5 }
  ],
  hourlyActivity: [
    { hour: '06:00', videos: 3 },
    { hour: '08:00', videos: 6 },
    { hour: '10:00', videos: 9 },
    { hour: '12:00', videos: 11 },
    { hour: '14:00', videos: 12 },
    { hour: '16:00', videos: 7 }
  ]
};

export const INITIAL_MODEL_STATUS: ModelStatus = {
  modelName: 'TimeSformer (Divided Space-Time Attention)',
  framework: 'PyTorch / Hugging Face Transformers',
  backbone: 'TimeSformer-Base (Pretrained on Kinetics-400)',
  frameSampling: '8 Uniform Temporal Frames (OpenCV VideoCapture)',
  inputResolution: '8 x 3 x 224 x 224 (Patch Size: 16x16)',
  backendState: 'demo_mode',
  backendUrl: 'http://localhost:8000',
  metrics: {
    accuracy: 'Awaiting trained model results',
    precision: 'Awaiting trained model results',
    recall: 'Awaiting trained model results',
    f1Score: 'Awaiting trained model results',
    statusText: 'Prototype training on college hackathon benchmark dataset. Metric placeholders will be automatically populated once the model finishes test-set evaluation.'
  }
};

export const ANALYSIS_STEPS = [
  'Initializing AI model...',
  'Loading video...',
  'Extracting frames...',
  'Sampling video segments...',
  'Processing frames...',
  'Running TimeSformer...',
  'Calculating accident probability...',
  'Generating result...'
];
