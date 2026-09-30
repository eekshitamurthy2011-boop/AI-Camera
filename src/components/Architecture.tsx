import React, { useState } from 'react';
import { Layers, ArrowDown, Code2, Server, Terminal, CheckCircle2, ChevronRight, Settings } from 'lucide-react';

interface ArchitectureProps {
  onOpenBackendModal: () => void;
}

export const Architecture: React.FC<ArchitectureProps> = ({ onOpenBackendModal }) => {
  const [activeTab, setActiveTab] = useState<'flow' | 'code' | 'apis'>('flow');

  const layers = [
    {
      role: 'Frontend Client',
      name: 'React Dashboard & HUD',
      tech: 'React · TypeScript · Tailwind CSS · Recharts',
      description: 'Provides command-center UI, real-time video stream inspector, interactive alert popups, and audit history.'
    },
    {
      role: 'RESTful Gateway',
      name: 'Python / FastAPI Gateway',
      tech: 'FastAPI · Uvicorn · Pydantic · AsyncIO',
      description: 'Asynchronous API service receiving video file uploads, dispatching inferences, and streaming safety alerts.'
    },
    {
      role: 'Video Ingestion & Processing',
      name: 'OpenCV Video Processor',
      tech: 'OpenCV (cv2.VideoCapture) · NumPy',
      description: 'Decodes raw video containers (MP4, AVI, MKV), computes duration, and performs uniform 8-slice temporal frame sampling.'
    },
    {
      role: 'Video Transformer Backbone',
      name: 'TimeSformer AI Model',
      tech: 'PyTorch · Hugging Face Transformers',
      description: 'Deep ViT model computing Divided Space-Time Attention across 8 frame tokens (224×224, 16×16 spatial patches).'
    },
    {
      role: 'Classification Head',
      name: 'Binary Classifier & Softmax',
      tech: 'Linear Projection · Softmax Probabilities',
      description: 'Classifies sequence embeddings into binary classes: NORMAL vs ACCIDENT, yielding calibrated confidence scores.'
    },
    {
      role: 'Output & Action',
      name: 'Prediction API & Monitoring Webhook',
      tech: 'JSON Payloads · WebSocket / REST Dispatch',
      description: 'Returns real-time predictions to the command dashboard, persists audit logs, and triggers safety alerts.'
    }
  ];

  const apiEndpoints = [
    { method: 'POST', path: '/analyze-video', desc: 'Accepts video file, extracts 8 frames, returns TimeSformer prediction & confidence.' },
    { method: 'GET', path: '/detections', desc: 'Retrieves active safety detections and recent incident events.' },
    { method: 'GET', path: '/analytics', desc: 'Returns aggregate video throughput, normal vs accident counts, and timeline data.' },
    { method: 'GET', path: '/history', desc: 'Returns timestamped surveillance audit records with filterable review status.' },
    { method: 'GET', path: '/model-status', desc: 'Health check reporting model backbone, device (CUDA/CPU), and benchmark metrics.' },
    { method: 'POST', path: '/simulate-accident', desc: 'Triggers simulated high-confidence accident event for live demonstrations.' }
  ];

  const pythonSnippet = `from fastapi import FastAPI, UploadFile, File
import cv2, torch, numpy as np
from transformers import AutoImageProcessor, TimesformerForVideoClassification

app = FastAPI(title="AI Sentinel Inference API")

# Initialize TimeSformer for binary accident classification
model_name = "facebook/timesformer-base-finetuned-k400"
image_processor = AutoImageProcessor.from_pretrained(model_name)
model = TimesformerForVideoClassification.from_pretrained(
    model_name,
    num_labels=2, # Binary: [0: NORMAL, 1: ACCIDENT]
    ignore_mismatched_sizes=True
)
model.eval()

def sample_8_frames(video_path: str):
    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    indices = np.linspace(0, total_frames - 1, 8, dtype=int)
    frames = []
    for idx in range(total_frames):
        ret, frame = cap.read()
        if not ret: break
        if idx in indices:
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            frames.append(frame_rgb)
    cap.release()
    return frames

@app.post("/analyze-video")
async def analyze_video(video: UploadFile = File(...)):
    # 1. Save temp video and sample 8 frames
    temp_path = f"/tmp/{video.filename}"
    with open(temp_path, "wb") as f: f.write(await video.read())
    frames = sample_8_frames(temp_path)
    
    # 2. Preprocess into 8-frame tensor
    inputs = image_processor(frames, return_tensors="pt")
    
    # 3. Model forward pass
    with torch.no_grad():
        outputs = model(**inputs)
        probs = torch.softmax(outputs.logits, dim=-1)[0]
    
    accident_prob = float(probs[1]) * 100
    prediction = "ACCIDENT" if accident_prob >= 50.0 else "NORMAL"
    confidence = accident_prob if prediction == "ACCIDENT" else float(probs[0]) * 100
    
    return {
        "prediction": prediction,
        "confidence": round(confidence, 1),
        "accident_probability": round(accident_prob, 1),
        "frames_analyzed": 8
    }`;

  return (
    <section id="architecture" className="py-20 bg-neutral-950 border-b border-cyan-500/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-neutral-800">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-2">
              System Engineering
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Technical Architecture
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-300 max-w-2xl">
              End-to-end integration designed for college hackathons and production deployments, linking a modern React UI to an asynchronous Python / FastAPI server running PyTorch TimeSformer.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('flow')}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors ${
                activeTab === 'flow' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Visual Pipeline
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors ${
                activeTab === 'code' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' : 'text-neutral-400 hover:text-white'
              }`}
            >
              FastAPI + PyTorch
            </button>
            <button
              onClick={() => setActiveTab('apis')}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors ${
                activeTab === 'apis' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' : 'text-neutral-400 hover:text-white'
              }`}
            >
              API Contracts
            </button>
          </div>
        </div>

        {/* Tab 1: Visual Pipeline */}
        {activeTab === 'flow' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {layers.map((layer, idx) => (
                <div
                  key={layer.name}
                  className="glass-panel rounded-xl p-5 border border-neutral-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                      <span className="text-cyan-400 font-bold">0{idx + 1} · {layer.role}</span>
                    </div>

                    <h4 className="text-base font-bold text-white font-display mb-1">
                      {layer.name}
                    </h4>

                    <div className="text-[11px] font-mono text-cyan-300/80 mb-3 bg-neutral-900/80 px-2 py-1 rounded border border-neutral-800">
                      {layer.tech}
                    </div>

                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {layer.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                    <span>STATUS: OPERATIONAL</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Ready
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 rounded-2xl glass-panel-accent border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white font-display">
                  Connect Your Own Python Backend
                </h4>
                <p className="text-xs text-neutral-300 mt-0.5">
                  The frontend is structured to switch instantly from mock simulation to your live FastAPI backend URL.
                </p>
              </div>

              <button
                onClick={onOpenBackendModal}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 rounded-lg shrink-0 shadow-sm"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Configure Backend Endpoint</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Python Code Preview */}
        {activeTab === 'code' && (
          <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-neutral-800 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800 text-neutral-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-white font-semibold">backend/main.py</span>
                <span>(FastAPI + TimeSformer Video Classifier)</span>
              </div>
              <span className="text-[11px] text-cyan-300">PyTorch 2.x · Transformers</span>
            </div>

            <pre className="overflow-x-auto text-neutral-300 leading-relaxed p-4 rounded-xl bg-neutral-950 border border-neutral-900 max-h-[460px]">
              <code>{pythonSnippet}</code>
            </pre>
          </div>
        )}

        {/* Tab 3: API Contracts */}
        {activeTab === 'apis' && (
          <div className="glass-panel rounded-2xl border border-neutral-800 overflow-hidden font-mono text-xs">
            <div className="p-4 bg-neutral-900/80 border-b border-neutral-800 flex items-center justify-between text-neutral-300">
              <span className="font-semibold text-white">REST API Specification</span>
              <span className="text-cyan-400 text-[11px]">OpenAPI / FastAPI Compatible</span>
            </div>

            <div className="divide-y divide-neutral-800/80">
              {apiEndpoints.map((ep) => (
                <div key={ep.path} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-900/40">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        ep.method === 'POST' ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/40' : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {ep.method}
                    </span>
                    <span className="text-white font-bold">{ep.path}</span>
                  </div>
                  <span className="text-neutral-400 text-xs sm:text-right max-w-lg">
                    {ep.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
