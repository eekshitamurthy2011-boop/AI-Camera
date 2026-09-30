import { DetectionRecord, AnalyticsData, ModelStatus, DetectionClass } from '../types';
import { INITIAL_DETECTION_HISTORY, INITIAL_ANALYTICS, INITIAL_MODEL_STATUS } from '../mock/mockData';

// Storage keys for in-browser state persistence
const STORAGE_KEY_HISTORY = 'ai_sentinel_history';
const STORAGE_KEY_ANALYTICS = 'ai_sentinel_analytics';
const STORAGE_KEY_BACKEND_URL = 'ai_sentinel_backend_url';

class SentinelApiService {
  private backendUrl: string;
  private isConnectedToRealBackend: boolean = false;

  constructor() {
    this.backendUrl = localStorage.getItem(STORAGE_KEY_BACKEND_URL) || 'http://localhost:8000';
  }

  public getBackendUrl(): string {
    return this.backendUrl;
  }

  public setBackendUrl(url: string) {
    this.backendUrl = url;
    localStorage.setItem(STORAGE_KEY_BACKEND_URL, url);
  }

  public isConnected(): boolean {
    return this.isConnectedToRealBackend;
  }

  // Ping backend to check if real FastAPI server is responding
  public async checkBackendHealth(): Promise<{ connected: boolean; message: string }> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`${this.backendUrl}/model-status`, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        this.isConnectedToRealBackend = true;
        return { connected: true, message: `Connected to FastAPI server at ${this.backendUrl}` };
      }
    } catch {
      // Backend not running
    }
    this.isConnectedToRealBackend = false;
    return {
      connected: false,
      message: `FastAPI server not responding at ${this.backendUrl}. Operating in Demo / Simulation Mode.`
    };
  }

  // GET /detections & GET /history
  public async getHistory(): Promise<DetectionRecord[]> {
    if (this.isConnectedToRealBackend) {
      try {
        const res = await fetch(`${this.backendUrl}/history`);
        if (res.ok) {
          const data = await res.json();
          return data;
        }
      } catch {
        console.warn('Backend /history call failed, using local repository');
      }
    }

    const saved = localStorage.getItem(STORAGE_KEY_HISTORY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_DETECTION_HISTORY;
  }

  public saveHistory(history: DetectionRecord[]): void {
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
  }

  // GET /analytics
  public async getAnalytics(): Promise<AnalyticsData> {
    if (this.isConnectedToRealBackend) {
      try {
        const res = await fetch(`${this.backendUrl}/analytics`);
        if (res.ok) {
          return await res.json();
        }
      } catch {
        console.warn('Backend /analytics call failed, using local data');
      }
    }

    const saved = localStorage.getItem(STORAGE_KEY_ANALYTICS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_ANALYTICS;
  }

  public saveAnalytics(analytics: AnalyticsData): void {
    localStorage.setItem(STORAGE_KEY_ANALYTICS, JSON.stringify(analytics));
  }

  // GET /model-status
  public async getModelStatus(): Promise<ModelStatus> {
    if (this.isConnectedToRealBackend) {
      try {
        const res = await fetch(`${this.backendUrl}/model-status`);
        if (res.ok) {
          const data = await res.json();
          return {
            ...data,
            backendState: 'connected',
            backendUrl: this.backendUrl
          };
        }
      } catch {
        // fallback
      }
    }

    return {
      ...INITIAL_MODEL_STATUS,
      backendState: this.isConnectedToRealBackend ? 'connected' : 'demo_mode',
      backendUrl: this.backendUrl
    };
  }

  // POST /analyze-video
  public async analyzeVideo(file: File | { name: string; size?: number; duration?: string; preferredClass?: DetectionClass }): Promise<{
    prediction: DetectionClass;
    confidence: number;
    accidentProbability: number;
    framesAnalyzed: number;
    isSimulated: boolean;
    processingTimeMs: number;
  }> {
    if (this.isConnectedToRealBackend && file instanceof File) {
      try {
        const formData = new FormData();
        formData.append('video', file);
        const res = await fetch(`${this.backendUrl}/analyze-video`, {
          method: 'POST',
          body: formData
        });
        if (res.ok) {
          const json = await res.json();
          return {
            prediction: json.prediction,
            confidence: json.confidence,
            accidentProbability: json.accident_probability ?? json.accidentProbability,
            framesAnalyzed: json.frames_analyzed || 8,
            isSimulated: false,
            processingTimeMs: json.processing_time_ms || 1420
          };
        }
      } catch (err) {
        console.warn('Real /analyze-video failed, falling back to simulated inference:', err);
      }
    }

    // Demo Mode Inference:
    // Determine plausible outcome based on filename or preferredClass
    const nameLower = file.name.toLowerCase();
    const isAccident = 'preferredClass' in file && file.preferredClass
      ? file.preferredClass === 'ACCIDENT'
      : nameLower.includes('accident') || nameLower.includes('crash') || nameLower.includes('incident');

    // Realistic demo confidence values
    let confidence: number;
    let accidentProbability: number;

    if (isAccident) {
      confidence = Number((93.5 + Math.random() * 4.5).toFixed(1)); // 93.5 - 98.0%
      accidentProbability = confidence;
    } else {
      confidence = Number((92.0 + Math.random() * 6.0).toFixed(1)); // 92.0 - 98.0%
      accidentProbability = Number((100 - confidence).toFixed(1)); // 2.0 - 8.0%
    }

    return {
      prediction: isAccident ? 'ACCIDENT' : 'NORMAL',
      confidence,
      accidentProbability,
      framesAnalyzed: 8,
      isSimulated: true, // Marked explicitly as demo/simulated
      processingTimeMs: 1650
    };
  }

  // POST /simulate-accident
  public async simulateAccident(): Promise<{
    record: DetectionRecord;
    message: string;
  }> {
    if (this.isConnectedToRealBackend) {
      try {
        const res = await fetch(`${this.backendUrl}/simulate-accident`, { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          return data;
        }
      } catch {
        // fallback to local demo event
      }
    }

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const randomId = `#${Math.floor(100 + Math.random() * 900)}`;
    const confidence = Number((94.0 + Math.random() * 4.0).toFixed(1));

    const newRecord: DetectionRecord = {
      id: randomId,
      date: dateStr,
      time: timeStr,
      videoName: 'live_cam_feed_04_simulated.mp4',
      prediction: 'ACCIDENT',
      confidence: confidence,
      accidentProbability: confidence,
      status: 'Unreviewed',
      isSimulated: true,
      framesAnalyzed: 8,
      notes: 'Live feed triggered sudden vehicle stoppage with debris signature.',
      location: 'Live Stream — Sector 4 Camera'
    };

    return {
      record: newRecord,
      message: 'Simulated accident triggered successfully'
    };
  }
}

export const api = new SentinelApiService();
