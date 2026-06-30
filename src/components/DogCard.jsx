import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function DogCard({ dog, compact = false, isDark = false }) {
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

  // Set default theme styling details
  let theme = {
    colorClass: 'text-emerald-500',
    borderClass: isDark ? 'border-emerald-950/80 shadow-emerald-950/20' : 'border-emerald-300 shadow-emerald-100/50',
    bgGlow: 'bg-emerald-500/10',
    cardBg: isDark ? 'bg-emerald-950/20' : 'bg-emerald-50/40',
    badgeClass: isDark 
      ? 'bg-emerald-950/50 text-emerald-300 border-emerald-900/60' 
      : 'bg-emerald-100 text-emerald-800 border-emerald-250',
    statusText: 'בטיפול ✂️',
    pulse: false
  };

  if (elapsedMinutes >= 90) {
    theme = {
      colorClass: 'text-rose-500',
      borderClass: isDark ? 'border-rose-950/80 shadow-rose-950/20 animate-pulse-rose' : 'border-rose-400 shadow-rose-150 animate-pulse-rose',
      bgGlow: 'bg-rose-500/15',
      cardBg: isDark ? 'bg-rose-950/30' : 'bg-rose-50/50',
      badgeClass: isDark 
        ? 'bg-rose-950/50 text-rose-300 border-rose-900/60 font-bold' 
        : 'bg-rose-100 text-rose-800 border-rose-250 font-bold',
      statusText: 'חריגת זמן! ⚠️',
      pulse: true
    };
  } else if (elapsedMinutes >= 60) {
    theme = {
      colorClass: 'text-amber-500',
      borderClass: isDark ? 'border-amber-950/80 shadow-amber-950/20' : 'border-amber-300 shadow-amber-100/60',
      bgGlow: 'bg-amber-500/10',
      cardBg: isDark ? 'bg-amber-950/20' : 'bg-amber-50/40',
      badgeClass: isDark 
        ? 'bg-amber-950/50 text-amber-300 border-amber-900/60' 
        : 'bg-amber-100 text-amber-800 border-amber-250',
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
    <div className={`rounded-3xl border-2 flex flex-col justify-between h-full relative overflow-hidden shadow-xl transition-all duration-300 ${
      compact ? 'p-4 md:p-5' : 'p-6 md:p-8 hover:-translate-y-1 hover:shadow-2xl'
    } ${theme.borderClass} ${
      isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white/95'
    }`}>
      
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
          
          <div className={`flex items-center gap-1 text-[10px] md:text-xs py-0.5 px-2 rounded-full border font-bold ${
            isDark 
              ? 'bg-slate-950 border-slate-850 text-slate-400' 
              : 'bg-slate-100 border-slate-200 text-slate-500'
          }`}>
            <Clock className="w-3 h-3 text-indigo-500" />
            <span className="font-mono">{formatStartTime(dog.startTime)}</span>
          </div>
        </div>

        {/* Dog's Name & Breed */}
        <div className={`flex items-center justify-between gap-2 ${compact ? 'mt-2 mb-1' : 'mt-4 mb-2'}`}>
          <h2 className={`font-black tracking-tight break-all leading-tight ${
            isDark ? 'text-slate-100' : 'text-slate-855'
          } ${
            compact ? 'text-lg sm:text-xl md:text-2xl lg:text-3xl' : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'
          }`}>
            {dog.dogName}
          </h2>
          {dog.breed && (
            <span className={`font-bold rounded-lg border truncate shrink-0 ${
              isDark 
                ? 'bg-indigo-950/40 border-indigo-900 text-indigo-300' 
                : 'bg-indigo-50 border-indigo-100 text-indigo-700'
            } ${
              compact ? 'text-[11px] sm:text-xs md:text-sm py-0.5 px-2 max-w-[90px] sm:max-w-[120px]' : 'text-xs sm:text-sm py-1 px-3 max-w-[150px]'
            }`}>
              {dog.breed}
            </span>
          )}
        </div>

        {/* Owner Name */}
        {dog.ownerName && (
          <div className={`font-bold ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          } ${compact ? 'text-xs sm:text-sm mt-0.5' : 'text-sm sm:text-base mt-1'}`}>
            בעלים: <span className={isDark ? 'text-slate-200' : 'text-slate-750'}>{dog.ownerName}</span>
          </div>
        )}

        {/* Special Notes */}
        {dog.notes && (
          <div className={`rounded-xl border transition-all flex flex-col ${
            isDark 
              ? 'bg-slate-950/45 border-slate-850/80 text-slate-350' 
              : 'bg-slate-50/70 border-slate-100 text-slate-600'
          } ${
            compact ? 'p-2.5 mt-1.5' : 'p-3.5 mt-2.5'
          }`} title={dog.notes}>
            <span className={`font-extrabold block opacity-75 mb-0.5 shrink-0 ${compact ? 'text-[11px] sm:text-xs' : 'text-xs sm:text-sm'}`}>דגשי טיפול:</span>
            <span className={`${compact ? 'text-xs sm:text-sm line-clamp-1' : 'text-sm sm:text-base line-clamp-2'} leading-snug`}>
              {dog.notes}
            </span>
          </div>
        )}
      </div>

      {/* Live Stopwatch */}
      <div className={`border-t flex flex-col justify-end ${
        isDark ? 'border-slate-800' : 'border-slate-100'
      } ${compact ? 'mt-2 pt-2' : 'mt-4 pt-3'}`}>
        <div className={`text-[9px] md:text-[10px] font-bold uppercase tracking-wider mb-0.5 ${
          isDark ? 'text-slate-450' : 'text-slate-400'
        }`}>
          זמן עבודה מצטבר
        </div>
        <div className={`font-mono font-black tracking-wider tabular-nums leading-none ${theme.colorClass} ${
          compact ? 'text-xl sm:text-2xl md:text-3xl' : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
        }`}>
          {formatStopwatch(elapsedSeconds)}
        </div>
      </div>
    </div>
  );
}
