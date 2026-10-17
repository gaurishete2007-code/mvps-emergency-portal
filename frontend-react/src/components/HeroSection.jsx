import React from 'react';

export default function HeroSection({ setActiveTab }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 py-16 px-6 text-center text-white shadow-lg my-2">
      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        
        {/* Yellow Header Tag */}
        <span className="inline-block px-3.5 py-1 bg-amber-400 text-slate-950 text-[11px] font-black uppercase tracking-widest rounded-full shadow-sm">
          YOUR SAFETY MATTERS
        </span>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          College Emergency & Safety Portal
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed font-medium">
          Your campus. Your safety. One place for help. Quickly report emergencies and help college staff respond effectively.
        </p>

        {/* Dual CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setActiveTab('report')}
            className="w-full sm:w-auto px-7 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition flex items-center justify-center space-x-2"
          >
            <span>🚨</span>
            <span>Report Emergency</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className="w-full sm:w-auto px-7 py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition flex items-center justify-center space-x-2"
          >
            <span>🛡️</span>
            <span>Staff Dashboard</span>
          </button>
        </div>
      </div>
    </section>
  );
}