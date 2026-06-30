import React, { useState } from 'react';
import {
  Settings, Power, PowerOff, Shield, Lock,
  LogIn, AlertTriangle, Eye, EyeOff, ChevronRight, Trash2
} from 'lucide-react';

const SETTINGS_PASSWORD = '4242';

// Format helpers
function formatDateTime(ts) {
  if (!ts) return '—';
  const d = new Date(ts);
  const date = d.toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const time = d.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  return { date, time };
}

function timeAgo(ts) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return `לפני ${diff} שניות`;
  if (diff < 3600) return `לפני ${Math.floor(diff / 60)} דקות`;
  if (diff < 86400) return `לפני ${Math.floor(diff / 3600)} שעות`;
  return `לפני ${Math.floor(diff / 86400)} ימים`;
}

// ─── Password Screen ───────────────────────────────────────────────────────────
function PasswordGate({ onUnlock }) {
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pass === SETTINGS_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setPass('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 flex items-center justify-center p-6 font-sans" dir="rtl">
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-indigo-500/20 border border-indigo-400/30 rounded-2xl flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8 text-indigo-300" />
          </div>
          <h1 className="text-xl font-black text-white">מרכז הגדרות מערכת</h1>
          <p className="text-slate-400 text-xs font-medium">אזור מוגן — הזן את קוד הגישה</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={pass}
              onChange={(e) => { setPass(e.target.value); setError(false); }}
              placeholder="קוד גישה..."
              className={`w-full bg-white/10 border rounded-xl pr-4 pl-10 py-3 text-white placeholder-slate-500 text-sm font-medium focus:outline-none transition-all ${
                error ? 'border-red-400' : 'border-white/20 focus:border-indigo-400'
              }`}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute left-3 top-3.5 text-slate-400 hover:text-white cursor-pointer"
            >
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-xs font-bold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> קוד שגוי, נסה שוב
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-extrabold rounded-xl transition-all cursor-pointer text-sm"
          >
            <Lock className="w-4 h-4 inline ml-2" />
            כניסה
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Main Settings Panel ───────────────────────────────────────────────────────
export default function SettingsPanel({ history = [], dogs = [], navigate }) {
  const [unlocked, setUnlocked] = useState(false);
  const [systemDisabled, setSystemDisabled] = useState(() =>
    localStorage.getItem('grooming_system_disabled') === 'true'
  );
  const [showDisableConfirm, setShowDisableConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState('logs');

  // Load access log
  const accessLog = (() => {
    try {
      return JSON.parse(localStorage.getItem('grooming_access_log') || '[]');
    } catch { return []; }
  })();

  const clearAccessLog = () => {
    localStorage.removeItem('grooming_access_log');
    window.location.reload();
  };

  const handleDisableSystem = () => {
    localStorage.setItem('grooming_system_disabled', 'true');
    setSystemDisabled(true);
    setShowDisableConfirm(false);
  };

  const handleEnableSystem = () => {
    localStorage.setItem('grooming_system_disabled', 'false');
    setSystemDisabled(false);
  };

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

  const tabs = [
    { id: 'logs', label: 'כניסות לממשק', icon: LogIn },
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
            <p className="text-xs text-slate-400 font-medium mt-0.5">ניטור כניסות לממשק וניהול מצב המערכת</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-1.5 py-2 px-3 sm:px-4 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all shadow-xs"
        >
          <ChevronRight className="w-4 h-4" />
          <span className="hidden sm:inline">ממשק ניהול</span>
        </button>
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
            ? '⛔ המערכת כבויה — מסך הטלוויזיה וממשק הניהול אינם פעילים.'
            : '✅ המערכת פעילה ועובדת בצורה תקינה.'}
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

        {/* ACCESS LOGS TAB */}
        {activeTab === 'logs' && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <LogIn className="w-5 h-5 text-indigo-500" />
              <h2 className="text-base font-black text-slate-800">כניסות לממשק הניהול</h2>
              <span className="mr-auto bg-indigo-50 text-indigo-600 text-[10px] font-black px-2 py-0.5 rounded-lg border border-indigo-100">
                {accessLog.length} כניסות
              </span>
              {accessLog.length > 0 && (
                <button
                  onClick={clearAccessLog}
                  className="flex items-center gap-1 text-[10px] font-bold text-red-400 hover:text-red-600 cursor-pointer"
                  title="נקה את כל הלוג"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  נקה לוג
                </button>
              )}
            </div>

            {accessLog.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="text-5xl">🔐</div>
                <p className="text-slate-400 text-sm font-medium">אין לוג כניסות עדיין</p>
                <p className="text-slate-300 text-xs">כניסות עתידיות לממשק הניהול יופיעו כאן עם תאריך ושעה מדויקים</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                {accessLog.map((entry, idx) => {
                  const dt = formatDateTime(entry.timestamp);
                  const isFirst = idx === 0;
                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl border transition-all ${
                        isFirst
                          ? 'bg-indigo-50 border-indigo-200'
                          : 'bg-slate-50/60 border-slate-100'
                      }`}
                    >
                      {/* Index */}
                      <span className={`text-[10px] font-black w-6 text-center shrink-0 ${isFirst ? 'text-indigo-400' : 'text-slate-300'}`}>
                        #{accessLog.length - idx}
                      </span>

                      {/* Icon */}
                      <div className={`p-2 rounded-xl shrink-0 ${isFirst ? 'bg-indigo-100' : 'bg-white border border-slate-200'}`}>
                        <LogIn className={`w-4 h-4 ${isFirst ? 'text-indigo-500' : 'text-slate-400'}`} />
                      </div>

                      {/* Main info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-black text-sm ${isFirst ? 'text-indigo-800' : 'text-slate-700'}`}>
                            כניסה לממשק ניהול
                          </span>
                          {isFirst && (
                            <span className="text-[9px] font-black bg-indigo-500 text-white px-1.5 py-0.5 rounded-md">אחרון</span>
                          )}
                        </div>
                        <div className={`text-xs font-medium mt-0.5 ${isFirst ? 'text-indigo-400' : 'text-slate-400'}`}>
                          {timeAgo(entry.timestamp)}
                        </div>
                      </div>

                      {/* Date + Time */}
                      <div className="text-left shrink-0" dir="ltr">
                        <div className={`text-xs font-bold ${isFirst ? 'text-indigo-600' : 'text-slate-600'}`}>{dt.date}</div>
                        <div className={`text-[11px] font-mono ${isFirst ? 'text-indigo-400' : 'text-slate-400'}`}>{dt.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* SYSTEM CONTROL TAB */}
        {activeTab === 'system' && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-indigo-500" />
              <h2 className="text-base font-black text-slate-800">ניהול מצב המערכת</h2>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center">
                <div className="text-2xl font-black text-indigo-600">{accessLog.length}</div>
                <div className="text-[10px] text-slate-400 font-bold mt-0.5">כניסות מוקלטות</div>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center">
                <div className="text-2xl font-black text-amber-500">{dogs.filter(d => d.status === 'waiting').length}</div>
                <div className="text-[10px] text-slate-400 font-bold mt-0.5">ממתינים כרגע</div>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center">
                <div className="text-2xl font-black text-emerald-500">{history.length}</div>
                <div className="text-[10px] text-slate-400 font-bold mt-0.5">טיפולים בארכיון</div>
              </div>
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
                    כיבוי המערכת יסתיר את מסך הטלוויזיה וממשק הניהול. דף ההגדרות (/settings) יישאר נגיש תמיד.
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
                          האם אתה בטוח? המסך הציבורי וממשק הניהול יכבו לכולם. ניתן להפעיל מחדש מכאן בכל עת.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={handleDisableSystem} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-extrabold rounded-xl text-xs transition-all cursor-pointer">
                          כן, כבה
                        </button>
                        <button onClick={() => setShowDisableConfirm(false)} className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 font-extrabold rounded-xl text-xs transition-all cursor-pointer hover:bg-slate-50">
                          ביטול
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-[10px] text-slate-400 font-medium mt-6">
        JOY 🐶 POLA • /settings • גישה מוגנת בסיסמה
      </p>
    </div>
  );
}
