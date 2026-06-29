import React, { useState, useEffect } from 'react';
import { Clock, Scissors } from 'lucide-react';

export default function DogCard({ dog, compact = false }) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const calculateElapsed = () => {
      const now = Date.now();
      const differenceMs = now - dog.startTime;
      return Math.max(0, Math.floor(differenceMs / 1000));
    };

    setElapsedSeconds(calculateElapsed());

    const interval = setInterval(() => {
      setElapsedSeconds(calculateElapsed());
    }, 1000);

    return () => clearInterval(interval);
  }, [dog.startTime]);

  const elapsedMinutes = Math.floor(elapsedSeconds / 60);

  let theme = {
    colorClass: 'text-emerald-600',
    borderClass: 'border-emerald-300 shadow-md shadow-emerald-100/50 hover:border-emerald-450',
    bgGlow: 'bg-emerald-500/10',
    cardBg: 'bg-emerald-50/40',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-250',
    statusText: 'בטיפול ✂️',
    pulse: false
  };

  if (elapsedMinutes >= 90) {
    theme = {
      colorClass: 'text-rose-600',
      borderClass: 'border-rose-400 shadow-lg shadow-rose-150 animate-pulse-rose',
      bgGlow: 'bg-rose-500/15',
      cardBg: 'bg-rose-50/50',
      badgeClass: 'bg-rose-100 text-rose-800 border-rose-250 font-bold',
      statusText: 'חריגת זמן! ⚠️',
      pulse: true
    };
  } else if (elapsedMinutes >= 60) {
    theme = {
      colorClass: 'text-amber-600',
      borderClass: 'border-amber-300 shadow-md shadow-amber-100/60 hover:border-amber-450',
      bgGlow: 'bg-amber-500/10',
      cardBg: 'bg-amber-50/40',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-250',
      statusText: 'טיפול מתארך ⏳',
      pulse: false
    };
  }

  const formatStopwatch = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  const formatStartTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `התחיל ב-${hours}:${minutes}`;
  };

  return (
    <div className={`rounded-3xl border-2 flex flex-col justify-between h-full relative overflow-hidden bg-white/95 shadow-xl transition-all duration-300 ${
      compact ? 'p-4 md:p-5' : 'p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl'
    } ${theme.borderClass}`}>
      
      {/* Playful background card color tint */}
      <div className={`absolute inset-0 opacity-40 -z-10 transition-colors duration-500 ${theme.cardBg}`} />
      
      {/* Colorful corner blur effect (hidden in compact for space savings) */}
      {!compact && (
        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full filter blur-3xl opacity-20 -mr-16 -mt-16 transition-colors duration-500 ${theme.bgGlow}`} />
      )}

      <div>
        {/* Top bar with status and start time */}
        <div className={`flex items-center justify-between ${compact ? 'mb-2' : 'mb-4'}`}>
          <div className={`flex items-center gap-1 py-0.5 px-2.5 rounded-full border text-[10px] md:text-xs font-bold ${theme.badgeClass}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${theme.pulse ? 'bg-rose-500 animate-ping' : theme.colorClass.replace('text-', 'bg-')}`} />
            <span>{theme.statusText}</span>
          </div>
          
          <div className="flex items-center gap-1 text-slate-500 text-[10px] md:text-xs bg-slate-100 py-0.5 px-2 rounded-full border border-slate-200 font-bold">
            <Clock className="w-3 h-3 text-indigo-500" />
            <span className="font-mono">{formatStartTime(dog.startTime)}</span>
          </div>
        </div>

        {/* Dog's Name & Breed */}
        <div className={`flex items-center justify-between gap-2 ${compact ? 'mt-2 mb-1' : 'mt-4 mb-2'}`}>
          <h2 className={`font-black text-slate-855 tracking-tight break-all leading-tight ${
            compact ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-4xl md:text-5xl lg:text-6xl'
          }`}>
            {dog.dogName}
          </h2>
          {dog.breed && (
            <span className={`font-bold bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100 truncate shrink-0 ${
              compact ? 'text-[9px] md:text-xs py-0.5 px-1.5 max-w-[80px] md:max-w-[100px]' : 'text-xs py-1 px-3 max-w-[130px]'
            }`}>
              {dog.breed}
            </span>
          )}
        </div>
      </div>

      {/* Live Stopwatch */}
      <div className={`border-t border-slate-100 flex flex-col justify-end ${compact ? 'mt-2 pt-2' : 'mt-6 pt-4'}`}>
        <div className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
          זמן עבודה מצטבר
        </div>
        <div className={`font-mono font-black tracking-wider tabular-nums leading-none ${theme.colorClass} ${
          compact ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-5xl md:text-6xl lg:text-7xl'
        }`}>
          {formatStopwatch(elapsedSeconds)}
        </div>
      </div>
    </div>
  );
}
