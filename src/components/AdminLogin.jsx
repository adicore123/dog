import React, { useState } from 'react';
import { Lock, AlertCircle, Bone, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin({ onLogin, navigate }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'poladog') {
      setError(false);
      onLogin();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/20 via-[#faf9f2] to-amber-50/20 p-6 flex items-center justify-center font-sans text-right select-none" dir="rtl">
      
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-150/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] bg-amber-100/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200 p-8 shadow-2xl z-10 animate-fade-in">
        
        {/* Branding & Logo */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="bg-white p-2 rounded-2xl shadow-md border border-slate-100 flex items-center justify-center overflow-hidden mb-4 w-24 h-24">
            <img 
              src="/logo.jpg" 
              className="w-full h-full object-contain" 
              alt="Joy & Pola Logo" 
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div className="flex items-center gap-2 justify-center">
            <h1 className="text-3xl font-black text-blue-900 tracking-tight">
              JOY 🐶 POLA
            </h1>
            <Bone className="w-6 h-6 text-amber-500 fill-amber-400 rotate-12" />
          </div>
          <p className="text-slate-500 text-xs font-bold mt-1.5">
            מערכת ניהול תורים • אבן גבירול 163, תל אביב
          </p>
        </div>

        {/* Lock header */}
        <div className="border-t border-slate-100 pt-6 mb-6">
          <h2 className="text-lg font-black text-slate-800 flex items-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-purple-600" />
            <span>כניסת מנהל למערכת</span>
          </h2>
          <p className="text-slate-450 text-xs font-semibold">
            על מנת לגשת לניהול תורים, יומנים וארכיון יש להקליד את סיסמת מנהל המספרה.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label className="block text-xs font-bold text-slate-500 mb-1.5">סיסמת כניסה</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="הקלד סיסמת מנהל..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                className={`w-full bg-slate-50 border rounded-xl pr-4 pl-12 py-3 text-slate-900 font-medium transition-all text-sm focus:outline-none focus:bg-white ${
                  error ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-purple-500'
                }`}
              />
              
              {/* Show/Hide password toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3.5 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                title={showPassword ? "הסתר סיסמה" : "הצג סיסמה"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-start gap-2.5 text-red-800 text-xs font-bold animate-pulse-rose">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>סיסמה שגויה! אנא נסה שוב.</div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-extrabold py-3 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-sm shadow-md shadow-purple-100"
            >
              <span>התחבר מנהל</span>
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-5 rounded-xl border border-slate-200 transition-all cursor-pointer text-sm"
            >
              ביטול וחזרה
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
