import React, { useState } from 'react';

const CAMPUS_ZONES = [
  { id: 'bld-a', name: 'A Building', code: 'BLD-A', status: 'Safe', emergencyPosts: 2, icon: '🏛️' },
  { id: 'bld-b', name: 'B Building', code: 'BLD-B', status: 'Active Watch', emergencyPosts: 3, icon: '💻' },
  { id: 'bld-c', name: 'C Building', code: 'BLD-C', status: 'Safe', emergencyPosts: 1, icon: '⚙️' },
  { id: 'hostel', name: 'Campus Hostels', code: 'HSTL', status: 'High Vigilance', emergencyPosts: 4, icon: '🏢' },
  { id: 'library', name: 'Central Library', code: 'LIB', status: 'Safe', emergencyPosts: 2, icon: '📚' },
  { id: 'medical', name: 'Campus Medical Cell', code: 'MED', status: '24/7 Response', emergencyPosts: 1, icon: '🚑' },
];

export default function CampusMap() {
  const [selectedZone, setSelectedZone] = useState(CAMPUS_ZONES[0]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">
            Interactive Safety Grid
          </span>
          <h2 className="text-xl font-extrabold text-white">Campus Safety & Zone Layout Map</h2>
        </div>
        <span className="self-start sm:self-auto px-3 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold rounded-lg flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          GPS GRID ONLINE
        </span>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Zone Selectors */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          {CAMPUS_ZONES.map((zone) => {
            const isSelected = selectedZone.id === zone.id;
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => setSelectedZone(zone)}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-blue-950/70 border-blue-500 shadow-md ring-1 ring-blue-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-2xl">{zone.icon}</span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                    {zone.code}
                  </span>
                </div>
                
                <div className="mt-4">
                  <p className={`text-xs font-bold ${isSelected ? 'text-blue-300' : 'text-slate-200'}`}>
                    {zone.name}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {zone.emergencyPosts} Call Posts
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Zone Inspector Panel */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
              <span className="text-3xl p-2 bg-slate-900 border border-slate-800 rounded-lg">{selectedZone.icon}</span>
              <div>
                <h3 className="text-sm font-bold text-white">{selectedZone.name}</h3>
                <span className="text-[10px] font-mono text-slate-400">Zone Ref: {selectedZone.code}-SEC</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Security Status:</span>
                <span className="px-2 py-0.5 bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 rounded text-[10px] font-bold">
                  {selectedZone.status}
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Emergency Outposts:</span>
                <span className="font-mono text-slate-200 font-bold">{selectedZone.emergencyPosts} Installed</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Nearest Control Cell:</span>
                <span className="text-slate-200 font-medium">Main Gate Booth</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => alert(`Broadcasting alert specifically to ${selectedZone.name}...`)}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-2.5 rounded-lg transition shadow flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>🚨</span>
              <span>Dispatch Guard to {selectedZone.code}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}