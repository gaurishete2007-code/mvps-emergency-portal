import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ShieldAlert, Activity, User, Phone, MapPin } from 'lucide-react';

const CHART_COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981'];

export default function SecurityDashboard({ incidents = [], onResolveIncident }) {
  const [localIncidents, setLocalIncidents] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');

  // Helper to safely extract an array from props or API objects
  const normalizeToArray = (data) => {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.incidents)) return data.incidents;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
  };

  useEffect(() => {
    setLocalIncidents(normalizeToArray(incidents));
  }, [incidents]);

  const handleStatusChange = (id, newStatus) => {
    setLocalIncidents((prev) => {
      const list = normalizeToArray(prev);
      return list.map((item) => (item._id === id ? { ...item, status: newStatus } : item));
    });
    if (newStatus === 'Resolved' && onResolveIncident) {
      onResolveIncident(id);
    }
  };

  // Safe array guarantee
  const safeList = normalizeToArray(localIncidents);

  // Safely Compute Analytics Chart Data
  const typeCounts = safeList.reduce((acc, curr) => {
    const type = curr?.type || 'General Incident';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(typeCounts).map((type) => ({
    name: type,
    value: typeCounts[type],
  }));

  const filteredIncidents = activeFilter === 'All'
    ? safeList
    : safeList.filter((i) => (i?.status || 'Pending') === activeFilter);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100 space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-5 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-red-400">
              Command Dispatch Center
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">
            Campus Staff Safety Operational Dashboard
          </h1>
        </div>

        {/* Live Counters */}
        <div className="flex items-center space-x-3 text-xs">
          <div className="bg-slate-950 border border-slate-800 px-3.5 py-2 rounded-xl text-center">
            <p className="text-slate-400 font-medium">Total Signals</p>
            <p className="text-lg font-bold text-white">{safeList.length}</p>
          </div>
          <div className="bg-red-950/50 border border-red-500/30 px-3.5 py-2 rounded-xl text-center">
            <p className="text-red-300 font-medium">Active Alerts</p>
            <p className="text-lg font-bold text-red-400">
              {safeList.filter((i) => i?.status !== 'Resolved').length}
            </p>
          </div>
        </div>
      </div>

      {/* Analytics & Control Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recharts Analytics Panel */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              Incident Distribution Analytics
            </h2>
          </div>

          <div className="h-48 w-full my-2">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={60}
                    paddingAngle={4}
                  >
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-500">
                No active telemetry data available
              </div>
            )}
          </div>

          <p className="text-[10px] text-slate-400 text-center font-mono">
            LIVE TELEMETRY: Categorized incident frequency
          </p>
        </div>

        {/* Live Incident Dispatch Stream */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Status Filter Buttons */}
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Emergency Signal Queue
            </h2>

            <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
              {['All', 'Pending', 'Guard En Route', 'Resolved'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-3 py-1 rounded-md text-[11px] font-bold transition ${
                    activeFilter === tab
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Incident Feed List */}
          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {filteredIncidents.length === 0 ? (
              <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-8 text-center text-slate-500 text-xs">
                No emergency signals found.
              </div>
            ) : (
              filteredIncidents.map((incident, idx) => {
                const status = incident?.status || 'Pending';
                return (
                  <div
                    key={incident?._id || idx}
                    className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-red-950 text-red-400 border border-red-800">
                            {incident?.priority || 'High'}
                          </span>
                          <span className="text-xs font-bold text-white">
                            {incident?.type || 'Emergency Incident'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          {incident?.location || incident?.department || 'Main Campus'}
                        </p>
                      </div>

                      {/* Status Buttons */}
                      <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800 p-1 rounded-lg">
                        <button
                          onClick={() => handleStatusChange(incident?._id, 'Pending')}
                          className={`px-2 py-1 rounded text-[10px] font-bold ${
                            status === 'Pending' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          Pending
                        </button>
                        <button
                          onClick={() => handleStatusChange(incident?._id, 'Guard En Route')}
                          className={`px-2 py-1 rounded text-[10px] font-bold ${
                            status === 'Guard En Route' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          En Route
                        </button>
                        <button
                          onClick={() => handleStatusChange(incident?._id, 'Resolved')}
                          className={`px-2 py-1 rounded text-[10px] font-bold ${
                            status === 'Resolved' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          Resolved
                        </button>
                      </div>
                    </div>

                    {/* Footer Info */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-900">
                      <span className="flex items-center gap-1 text-slate-300">
                        <User className="w-3.5 h-3.5 text-slate-500" />
                        {incident?.studentName || 'Anonymous Student'}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-slate-400">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        {incident?.phone || 'N/A'}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>

      </div>

    </div>
  );
}