import React from 'react';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'report', label: 'Report Emergency' },
    { id: 'security', label: 'Staff Dashboard' },
    { id: 'map', label: 'Campus Map' },
    { id: 'contacts', label: 'Contacts' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 px-6 py-3.5 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        
        {/* Brand Logo & Title (Left) */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center space-x-2.5 cursor-pointer group z-10"
        >
          <span className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white text-base shadow">
            🛡️
          </span>
          <span className="font-extrabold text-lg tracking-tight text-white">
            College Safety Portal
          </span>
        </div>

        {/* Centered Navigation Links */}
        <div className="absolute inset-x-0 flex justify-center items-center pointer-events-none">
          <div className="flex items-center space-x-1 pointer-events-auto bg-slate-800/60 p-1 rounded-xl border border-slate-700/50">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === item.id
                    ? 'text-white bg-slate-700 shadow-sm border border-slate-600'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Empty Spacer to maintain flex layout balance */}
        <div className="w-32 hidden md:block"></div>

      </div>
    </nav>
  );
}