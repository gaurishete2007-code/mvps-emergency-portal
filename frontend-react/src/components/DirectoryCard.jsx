import React from 'react';

const DIRECTORY_CONTACTS = [
  { label: 'Security Control Room', number: '0253-2571439', icon: '🚨', type: 'Primary Dispatch' },
  { label: 'Campus Medical Cell', number: '+91 98765 43210', icon: '🚑', type: 'Emergency Health' },
  { label: 'Anti-Ragging Squad', number: '0253-2582843', icon: '🛡️', type: 'Confidential Helpline' },
  { label: 'Nashik Police Helpline', number: '112', icon: '🚔', type: 'External Dispatch' },
];

export default function DirectoryCard() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-2xl space-y-4">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Emergency Hotlines
          </span>
          <h3 className="text-base font-bold text-slate-100">KBTCOE Direct Directory</h3>
        </div>
        <span className="px-2 py-0.5 bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-mono font-bold rounded">
          24/7 ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {DIRECTORY_CONTACTS.map((contact, index) => (
          <a
            key={index}
            href={`tel:${contact.number}`}
            className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl hover:border-slate-700 transition duration-150 flex flex-col justify-between group"
          >
            <div>
              <div className="flex justify-between items-center">
                <span className="text-xl">{contact.icon}</span>
                <span className="text-[9px] font-mono text-slate-500 uppercase">{contact.type}</span>
              </div>
              <p className="text-xs font-semibold text-slate-300 mt-2 group-hover:text-white transition">
                {contact.label}
              </p>
            </div>
            <p className="text-sm font-mono font-black text-red-400 mt-2 tracking-wider">
              {contact.number}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}