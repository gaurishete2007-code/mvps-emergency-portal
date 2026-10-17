import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SOSButton from './components/SOSButton';
import ReportForm from './components/ReportForm';
import SecurityDashboard from './components/SecurityDashboard';
import DirectoryCard from './components/DirectoryCard';
import CampusMap from './components/CampusMap';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [incidents, setIncidents] = useState([]);

  const fetchIncidents = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/incidents');
      const data = await res.json();
      setIncidents(data);
    } catch (err) {
      console.error("Backend offline", err);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const handleCreateIncident = async (newIncident) => {
    try {
      const res = await fetch('http://localhost:5000/api/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIncident),
      });
      if (res.ok) fetchIncidents();
    } catch (err) {
      console.error("Failed to post incident", err);
    }
  };

  const handleTriggerQuickSOS = () => {
    handleCreateIncident({
      studentName: "Instant Emergency SOS",
      department: "Campus General Area",
      type: "CRITICAL: Immediate SOS Signal",
      location: "GPS Signal Broadcasting",
      phone: "EMERGENCY 1-TAP",
      priority: "High"
    });
    alert("🚨 Emergency SOS Triggered! Dispatch alerted.");
  };

  const handleResolveIncident = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/incidents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Resolved' }),
      });
      if (res.ok) fetchIncidents();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    /* Clean Light Mode Background */
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans relative pb-20">
      
      {/* Header Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        
        {/* HOME VIEW */}
        {activeTab === 'home' && (
          <>
            <HeroSection setActiveTab={setActiveTab} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <SOSButton onTriggerSOS={handleCreateIncident} />
              </div>
              <div className="lg:col-span-2">
                <ReportForm onReportSubmitted={handleCreateIncident} />
              </div>
            </div>

            <DirectoryCard />
          </>
        )}

        {/* REPORT EMERGENCY VIEW */}
        {activeTab === 'report' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <SOSButton onTriggerSOS={handleCreateIncident} />
              </div>
              <div className="lg:col-span-2">
                <ReportForm onReportSubmitted={handleCreateIncident} />
              </div>
            </div>
            <DirectoryCard />
          </div>
        )}

        {/* STAFF DASHBOARD VIEW */}
        {activeTab === 'security' && (
          <SecurityDashboard 
            incidents={incidents} 
            onResolveIncident={handleResolveIncident} 
          />
        )}

        {/* CAMPUS MAP VIEW */}
        {activeTab === 'map' && (
          <CampusMap />
        )}

        {/* CONTACTS VIEW */}
        {activeTab === 'contacts' && (
          <DirectoryCard />
        )}
      </main>

      {/* Floating SOS Pill Button - ONLY visible on student pages */}
      {activeTab !== 'security' && (
        <button
          onClick={handleTriggerQuickSOS}
          className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white text-xs font-black px-4 py-2.5 rounded-full shadow-2xl border border-red-300 flex items-center space-x-2 animate-bounce"
        >
          <span className="px-1.5 py-0.5 bg-red-800 text-white rounded text-[9px]">SOS</span>
          <span className="uppercase tracking-wider">INSTANT SOS</span>
        </button>
      )}

    </div>
  );
}