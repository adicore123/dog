import React, { useState, useEffect } from 'react';
import DogCard from './DogCard';
import { Calendar, Clock, Smile, Plus, Bone } from 'lucide-react';

export default function TvDisplay({ dogs, navigate }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Real-time clock in the header
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatHeaderTime = (date) => {
    return date.toLocaleTimeString('he-IL', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const formatHeaderDate = (date) => {
    return date.toLocaleDateString('he-IL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const activeCount = dogs.length;

  // Grid calculation to fit 100% height on TV viewports without scrolling
  let cols = 3;
  let rows = 1;

  if (activeCount === 1) {
    cols = 1;
    rows = 1;
  } else if (activeCount === 2) {
    cols = 2;
    rows = 1;
  } else if (activeCount === 3) {
    cols = 3;
    rows = 1;
  } else if (activeCount === 4) {
    cols = 2;
    rows = 2;
  } else if (activeCount <= 6) {
    cols = 3;
    rows = 2;
  } else if (activeCount <= 9) {
    cols = 3;
    rows = 3;
  } else {
    cols = 4;
    rows = Math.ceil(activeCount / 4);
  }

  // Styles to lock the grid to exact container dimensions on desktop/TV
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
    gap: '1.25rem',
    height: '100%',
    width: '100%',
  };

  return (
    <div className="flex flex-col min-h-screen lg:h-screen lg:overflow-hidden bg-gradient-to-br from-indigo-50/20 via-[#faf9f2] to-amber-50/20 p-4 md:p-8 select-none relative overflow-hidden">
      {/* Decorative background illustrations (bubbles/blobs) for dog salon atmosphere */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-150/15 rounded-full filter blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-100/10 rounded-full filter blur-3xl -z-10 pointer-events-none" />

      {/* Premium Signage Header (UI/UX Balanced Layout with Logo) */}
      <header className="flex-shrink-0 flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-slate-250 pb-4 mb-4 lg:mb-6 gap-4 z-10">
        
        {/* Right Side: Branding with Logo */}
        <div className="flex items-center gap-4 md:gap-5 text-right">
          <div className="bg-white p-2 rounded-2xl shadow-md border border-slate-150 flex items-center justify-center overflow-hidden shrink-0">
            <img 
              src="/logo.jpg" 
              className="h-16 md:h-24 lg:h-28 w-auto object-contain" 
              alt="Joy & Pola Logo" 
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl md:text-4xl font-black text-blue-900 tracking-tight leading-none">
                JOY 🐶 POLA
              </h1>
              <Bone className="w-6 h-6 text-amber-500 fill-amber-400 rotate-12 animate-bounce" />
            </div>
            <p className="text-slate-600 text-xs md:text-sm font-bold mt-1.5">
              אבן גבירול 163, תל אביב • לוח מעקב טיפולים חי
            </p>
          </div>
        </div>

        {/* Left Side: Stats & Clock */}
        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto lg:mr-auto justify-between lg:justify-end">
          
          {/* Active Dogs Count */}
          <div className="bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-slate-600 text-xs font-bold">
              כלבים בטיפול פעיל: <span className="text-slate-900 font-black text-sm">{activeCount}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-slate-200" />

          {/* Digital Signage Clock */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-slate-850 font-mono text-2xl md:text-3xl font-black tracking-wider leading-none">
              <Clock className="w-6 h-6 text-blue-800" />
              <span>{formatHeaderTime(currentDate)}</span>
            </div>
            <div className="hidden md:flex flex-col text-slate-450 text-[10px] font-bold leading-tight">
              <span>{formatHeaderDate(currentDate)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area: flex-1 and min-h-0 allows locked sizing */}
      <main className="flex-1 min-h-0 w-full overflow-hidden flex flex-col justify-center z-10">
        {activeCount === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in max-w-md mx-auto">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-indigo-50 rounded-full filter blur-2xl w-32 h-32 -m-4" />
              <div className="relative p-6 bg-white rounded-full border border-indigo-50 text-indigo-400 shadow-lg">
                <Smile className="w-16 h-16 stroke-[1.2]" />
              </div>
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">אין כלבים בטיפול כרגע</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              התצוגה תתעדכן באופן אוטומטי ברגע שיתחיל טיפול חדש במספרה.
            </p>
          </div>
        ) : (
          /* Viewport-locked responsive grid on TV, normal grid on mobile */
          <div className="w-full h-full lg:overflow-hidden">
            {/* Desktop / TV view */}
            <div className="hidden lg:grid" style={gridStyle}>
              {dogs.map((dog) => (
                <DogCard key={dog.id} dog={dog} compact={activeCount > 3} />
              ))}
            </div>

            {/* Mobile / Tablet fallback scrollable view */}
            <div className="grid lg:hidden grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto max-h-[70vh] pb-4">
              {dogs.map((dog) => (
                <DogCard key={dog.id} dog={dog} compact={activeCount > 2} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Subtle bottom informational bar with tiny, low-profile admin link */}
      <footer className="flex-shrink-0 mt-4 lg:mt-6 pt-4 border-t border-slate-200/60 flex justify-between text-slate-400 text-xs font-semibold z-10">
        <div>JOY 🐶 POLA • אבן גבירול 163, תל אביב</div>
        <button
          onClick={() => navigate('/admin')}
          className="text-slate-400 hover:text-blue-800 transition-colors duration-200 cursor-pointer font-bold"
        >
          מעבר לממשק ניהול
        </button>
      </footer>
    </div>
  );
}
