import React, { useState } from 'react';

const BUILDINGS = [
  { id: 'BLD-A', name: 'A Building', icon: '🏛️' },
  { id: 'BLD-B', name: 'B Building', icon: '💻' },
  { id: 'BLD-C', name: 'C Building', icon: '⚙️' },
  { id: 'LIB', name: 'Central Library', icon: '📚' },
  { id: 'CAN', name: 'Campus Canteen', icon: '🍱' },
  { id: 'HST', name: 'Hostel & Workshop', icon: '🏢' },
];

export default function ReportForm({ onReportSubmitted }) {
  const [selectedBuilding, setSelectedBuilding] = useState(BUILDINGS[0].name);
  const [roomDetail, setRoomDetail] = useState('');
  const [emergencyType, setEmergencyType] = useState('Medical Emergency');
  const [priority, setPriority] = useState('High (Immediate Response)');
  const [studentName, setStudentName] = useState('');
  const [phone, setPhone] = useState('');
  
  // GPS State
  const [gpsLocation, setGpsLocation] = useState(null);
  const [gpsLoading, setGpsLoading] = useState(false);

  // Get Live Browser Coordinates
  const handleGetGPS = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setGpsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(5);
        const lng = position.coords.longitude.toFixed(5);
        setGpsLocation({ lat, lng });
        setGpsLoading(false);
      },
      (error) => {
        console.error("GPS Error:", error);
        alert("Unable to fetch location. Please allow location permissions in your browser.");
        setGpsLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentName || !phone) {
      alert("Please enter your name and phone number.");
      return;
    }

    const liveCoords = gpsLocation 
      ? `GPS (${gpsLocation.lat}, ${gpsLocation.lng})` 
      : 'GPS Not Captured';

    onReportSubmitted({
      studentName,
      department: selectedBuilding,
      type: emergencyType,
      location: roomDetail ? `${selectedBuilding} - ${roomDetail} | ${liveCoords}` : `${selectedBuilding} | ${liveCoords}`,
      phone,
      priority,
      gps: gpsLocation,
    });

    alert("🚨 Incident Signal & Live GPS Coordinates Transmitted to Dispatch!");
    setRoomDetail('');
    setStudentName('');
    setPhone('');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-800 shadow-md">
      <div className="border-b border-slate-100 pb-3 mb-4 flex justify-between items-center">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-red-600">
            Interactive Safety Dispatch
          </span>
          <h2 className="text-xl font-bold text-slate-900">Incident Report Center</h2>
        </div>

        {/* Live GPS Trigger Button */}
        <button
          type="button"
          onClick={handleGetGPS}
          disabled={gpsLoading}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 border ${
            gpsLocation
              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
              : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
          }`}
        >
          <span>📍</span>
          <span>
            {gpsLoading 
              ? "Fetching GPS..." 
              : gpsLocation 
                ? `GPS Active (${gpsLocation.lat}, ${gpsLocation.lng})` 
                : "Auto-Detect Live GPS"}
          </span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Step 1: Building Cards */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-2 uppercase tracking-wider">
            1. Select Incident Building Location
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {BUILDINGS.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setSelectedBuilding(b.name)}
                className={`p-3 rounded-xl border text-left flex justify-between items-center transition ${
                  selectedBuilding === b.name
                    ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-sm font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{b.icon}</span>
                  <span className="text-xs font-bold">{b.name}</span>
                </div>
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">{b.id}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Room / Floor Detail */}
        <div>
          <input
            type="text"
            value={roomDetail}
            onChange={(e) => setRoomDetail(e.target.value)}
            placeholder="Specific room or floor detail (e.g., 2nd Floor, Lab 4)"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Emergency Type & Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Emergency Type</label>
            <select
              value={emergencyType}
              onChange={(e) => setEmergencyType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
            >
              <option>Medical Emergency</option>
              <option>Fire Hazard / Short Circuit</option>
              <option>Physical Conflict / Ragging</option>
              <option>Lab Safety Incident</option>
              <option>Suspicious Activity</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Urgency Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
            >
              <option>High (Immediate Response)</option>
              <option>Medium (Prompt Attention)</option>
              <option>Low (General Notice)</option>
            </select>
          </div>
        </div>

        {/* Student Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Full Name</label>
            <input
              type="text"
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Student Name"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Contact Phone</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit Phone Number"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-red-600 hover:bg-red-700 font-bold text-xs uppercase tracking-wider text-white rounded-xl transition shadow mt-2"
        >
          Transmit Incident Signal
        </button>
      </form>
    </div>
  );
}