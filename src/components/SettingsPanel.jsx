import React, { useState, useEffect } from 'react';
import {
  Settings, LogOut, Power, PowerOff, Shield, Clock, Dog, Scissors,
  Trash2, RotateCcw, AlertTriangle, CheckCircle, FileText, Calendar,
  ChevronRight, Activity, History
} from 'lucide-react';

// Helper: format full date + time in Hebrew
function formatDateTime(ts) {
  if (!ts) return '—';
  const d = new Date(ts);
  return d.toLocaleString('he-IL', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
}

function formatDateOnly(ts) {
  if (!ts) return '—';
  const d = new Date(ts);
  return d.toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatTime(ts) {
  if (!ts) return '—';
  const d = new Date(ts);
  return d.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function durationLabel(seconds) {
  if (!seconds && seconds !== 0) return '—';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s} שניות`;
  return `${m} דק' ${s > 0 ? `${s} שנ'` : ''}`;
}

// Log entry types and their visual config
const LOG_TYPE = {
  registered: { label: 'נרשם לתור', icon: Dog, color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-100' },
  treatment_start: { label: 'הכנס לטיפול', icon: Scissors, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' },
  treatment_end: { label: 'טיפול הסתיים', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  deleted: { label: 'כרטיס נמחק', icon: Trash2, color: 'text-red-400', bg: 'bg-red-50', border: 'border-red-100' },
};

function SystemLogs({ logs }) {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filtered = logs.filter(l => {
    const matchSearch = !search ||
      (l.dogName || '').toLowerCase().includes(search.toLowerCase()) ||
      (l.ownerName || '').toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' || l.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <input
          type="text"
          placeholder="חיפוש לפי כלב / בעלים..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-slate-200 bg-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-400 w-52 font-medium"
          dir="rtl"
        />
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          className="border border-slate-200 bg-white rounded-xl px-2.5 py-2 text-xs font-bold focus:outline-none cursor-pointer"
          dir="rtl"
        >
          <option value="all">כל הפעולות</option>
          {Object.entries(LOG_TYPE).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
        <span className="text-xs text-slate-400 font-bold mr-auto">{filtered.length} רשומות</span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400 italic text-sm">אין לוגים להצגה</div>
      ) : (
        <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-1">
          {filtered.map((log, idx) => {
            const cfg = LOG_TYPE[log.type] || LOG_TYPE.registered;
            const Icon = cfg.icon;
            return (
              <div
                key={idx}
                className={`flex items-start gap-3 p-3.5 rounded-2xl border ${cfg.bg} ${cfg.border} transition-all`}
                dir="rtl"
              >
                <div className={`p-2 rounded-xl bg-white border ${cfg.border} shrink-0`}>
                  <Icon className={`w-4 h-4 ${cfg.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-black uppercase tracking-wide ${cfg.color}`}>{cfg.label}</span>
                    <span className="font-black text-slate-800 text-sm">{log.dogName || '—'}</span>
                    {log.breed && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600">{log.breed}</span>
                    )}
                  </div>
                  {log.ownerName && (
                    <div className="text-xs text-slate-500 font-medium mt-0.5">בעלים: {log.ownerName}</div>
                  )}
                  {log.duration && (
                    <div className="text-xs text-emerald-600 font-bold mt-0.5">⏱ משך: {durationLabel(log.duration)}</div>
                  )}
                </div>
                <div className="shrink-0 text-left text-right" dir="ltr">
                  <div className="text-[10px] font-bold text-slate-500">{formatDateOnly(log.timestamp)}</div>
                  <div className="text-[10px] font-mono text-slate-400">{formatTime(log.timestamp)}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function SettingsPanel({ history = [], dogs = [], navigate }) {
  const [systemDisabled, setSystemDisabled] = useState(() =>
    localStorage.getItem('grooming_system_disabled') === 'true'
  );
  const [showDisableConfirm, setShowDisableConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState('logs');

  // Build logs from history records
  const buildLogs = () => {
    const logs = [];

    // From history: each record = registration + treatment start + end
    history.forEach(item => {
      if (item.arrivalTime) {
        logs.push({ type: 'registered', timestamp: item.arrivalTime, dogName: item.dogName, ownerName: item.ownerName, breed: item.breed });
      }
      if (item.startTime) {
        logs.push({ type: 'treatment_start', timestamp: item.startTime, dogName: item.dogName, ownerName: item.ownerName, breed: item.breed });
      }
      if (item.endTime) {
        logs.push({ type: 'treatment_end', timestamp: item.endTime, dogName: item.dogName, ownerName: item.ownerName, breed: item.breed, duration: item.durationSeconds });
      }
    });

    // Currently in queue
    dogs.forEach(dog => {
      if (dog.arrivalTime) {
        logs.push({ type: 'registered', timestamp: dog.arrivalTime, dogName: dog.dogName, ownerName: dog.ownerName, breed: dog.breed });
      }
      if (dog.startTime) {
        logs.push({ type: 'treatment_start', timestamp: dog.startTime, dogName: dog.dogName, ownerName: dog.ownerName, breed: dog.breed });
      }
    });

    return logs.sort((a, b) => b.timestamp - a.timestamp);
  };

  const logs = buildLogs();

  const handleDisableSystem = () => {
    localStorage.setItem('grooming_system_disabled', 'true');
    setSystemDisabled(true);
    setShowDisableConfirm(false);
  };

  const handleEnableSystem = () => {
    localStorage.setItem('grooming_system_disabled', 'false');
    setSystemDisabled(false);
  };

  const tabs = [
    { id: 'logs', label: 'לוג פעילות', icon: Activity },
    { id: 'system', label: 'ניהול מערכת', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-4 sm:p-8 font-sans" dir="rtl">
      
      {/* Header */}
      <header className="flex items-center justify-between mb-8 pb-5 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2.5 rounded-2xl shadow-sm border border-slate-200">
            <Settings className="w-6 h-6 text-indigo-500" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">מרכז הגדרות מערכת</h1>
            <p className="text-xs text-slate-400 font-medium mt-0.5">ניטור לוגים, מצב מערכת, וניהול נתונים</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-1.5 py-2 px-3 sm:px-4 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all shadow-xs"
          >
            <ChevronRight className="w-4 h-4" />
            <span className="hidden sm:inline">ממשק ניהול</span>
          </button>
        </div>
      </header>

      {/* System Status Banner */}
      <div className={`mb-6 px-4 py-3 rounded-2xl border flex items-center gap-3 ${
        systemDisabled
          ? 'bg-red-50 border-red-200 text-red-700'
          : 'bg-emerald-50 border-emerald-200 text-emerald-700'
      }`}>
        {systemDisabled ? <PowerOff className="w-5 h-5 shrink-0" /> : <Power className="w-5 h-5 shrink-0" />}
        <span className="font-bold text-sm">
          {systemDisabled
            ? '⛔ המערכת כבויה — מסך הטלוויזיה והממשק אינם פעילים. רק דף ההגדרות זמין.'
            : '✅ המערכת פעילה ועובדת בצורה תקינה.'
          }
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-100 rounded-2xl p-1 w-fit">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-indigo-600 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6">

        {/* LOGS TAB */}
        {activeTab === 'logs' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <History className="w-5 h-5 text-indigo-500" />
              <h2 className="text-base font-black text-slate-800">לוג פעילות מערכת מלא</h2>
              <span className="mr-auto bg-indigo-50 text-indigo-600 text-[10px] font-black px-2 py-0.5 rounded-lg border border-indigo-100">
                {logs.length} אירועים
              </span>
            </div>
            <SystemLogs logs={logs} />
          </div>
        )}

        {/* SYSTEM CONTROL TAB */}
        {activeTab === 'system' && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-indigo-500" />
              <h2 className="text-base font-black text-slate-800">ניהול מצב המערכת</h2>
            </div>

            {/* Disable / Enable System */}
            <div className="rounded-2xl border border-slate-200 p-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-xl ${systemDisabled ? 'bg-red-100' : 'bg-slate-100'}`}>
                  {systemDisabled ? <PowerOff className="w-5 h-5 text-red-500" /> : <Power className="w-5 h-5 text-slate-500" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-slate-800 text-sm">מצב המערכת</h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5 leading-relaxed">
                    כיבוי המערכת יסתיר את מסך הטלוויזיה הציבורי ואת ממשק הניהול עבור לקוחות ועובדים.
                    דף ההגדרות (/settings) יישאר נגיש בכל עת.
                  </p>
                </div>
              </div>

              {systemDisabled ? (
                <button
                  onClick={handleEnableSystem}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-xl transition-all cursor-pointer shadow-sm text-sm"
                >
                  <Power className="w-5 h-5" />
                  הפעל מחדש את המערכת ✅
                </button>
              ) : (
                <>
                  {!showDisableConfirm ? (
                    <button
                      onClick={() => setShowDisableConfirm(true)}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-extrabold rounded-xl transition-all cursor-pointer text-sm"
                    >
                      <PowerOff className="w-5 h-5" />
                      כבה את המערכת ⛔
                    </button>
                  ) : (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 space-y-3">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-red-700 font-bold leading-relaxed">
                          האם אתה בטוח? פעולה זו תכבה את מסך הטלוויזיה וממשק הניהול לכל המשתמשים.
                          ניתן להפעיל מחדש בכל עת מדף זה.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleDisableSystem}
                          className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-extrabold rounded-xl text-xs transition-all cursor-pointer"
                        >
                          כן, כבה את המערכת
                        </button>
                        <button
                          onClick={() => setShowDisableConfirm(false)}
                          className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 font-extrabold rounded-xl text-xs transition-all cursor-pointer hover:bg-slate-50"
                        >
                          ביטול
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="text-2xl font-black text-indigo-600">{history.length}</div>
                <div className="text-xs text-slate-400 font-bold mt-0.5">טיפולים שהסתיימו</div>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="text-2xl font-black text-amber-500">{dogs.filter(d => d.status === 'waiting').length}</div>
                <div className="text-xs text-slate-400 font-bold mt-0.5">ממתינים כרגע</div>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="text-2xl font-black text-emerald-500">{dogs.filter(d => d.status === 'active').length}</div>
                <div className="text-xs text-slate-400 font-bold mt-0.5">בטיפול פעיל</div>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Footer */}
      <p className="text-center text-[10px] text-slate-400 font-medium mt-6">
        JOY 🐶 POLA • מרכז הגדרות מערכת • /settings
      </p>
    </div>
  );
}
