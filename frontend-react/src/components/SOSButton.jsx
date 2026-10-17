import React, { useState } from 'react';
import { Volume2, AlertOctagon } from 'lucide-react';

export default function SOSButton({ onTriggerSOS }) {
  const [isActivating, setIsActivating] = useState(false);

  // Synthesize an active Emergency Siren Tone using Web Audio API
  const playSirenSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.5);

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {
      console.error("Audio API non-blocking warning", e);
    }
  };

  const handleSOSClick = () => {
    playSirenSound();
    setIsActivating(true);

    if (onTriggerSOS) {
      onTriggerSOS({
        studentName: "Instant Emergency Beacon",
        department: "General Campus Area",
        type: "CRITICAL: 1-Tap SOS Beacon Broadcast",
        location: "GPS Signal Broadcasting",
        phone: "911-DIRECT-SOS",
        priority: "High"
      });
    }

    setTimeout(() => setIsActivating(false), 2000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md text-slate-800 flex flex-col justify-between h-full">
      
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-red-600 flex items-center gap-1">
            <AlertOctagon className="w-3.5 h-3.5" />
            1-Tap Security Broadcast
          </span>
          <Volume2 className="w-4 h-4 text-slate-400 animate-pulse" />
        </div>
        <h2 className="text-xl font-extrabold text-slate-900">
          Instant Campus Emergency Trigger
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Broadcasting dispatches an emergency signal with acoustic beacon directly to Security Control.
        </p>
      </div>

      {/* SOS Center Trigger Circle */}
      <div className="my-8 flex justify-center items-center">
        <button
          onClick={handleSOSClick}
          className={`relative w-44 h-44 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 shadow-2xl ${
            isActivating
              ? 'bg-red-700 scale-95 ring-8 ring-red-400'
              : 'bg-red-600 hover:bg-red-700 hover:scale-105 ring-8 ring-red-100'
          }`}
        >
          {/* Animated Wave Rings */}
          <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-25"></span>

          <span className="text-3xl font-black text-white tracking-widest z-10">
            SOS
          </span>
          <span className="text-[10px] font-bold text-red-100 uppercase tracking-wider mt-1 z-10">
            {isActivating ? 'BROADCASTING...' : 'TAP TO BROADCAST'}
          </span>
        </button>
      </div>

      {/* Footer Disclaimer */}
      <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-center">
        <p className="text-[11px] font-bold text-red-800">
          🚨 Automatic GPS & Audio Beacon Transmission Enabled
        </p>
      </div>

    </div>
  );
}