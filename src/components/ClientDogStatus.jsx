import React, { useState, useEffect } from 'react';
import { Clock, Smile, Bone, MapPin, PhoneCall, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ClientDogStatus({ dogId, dogs, history, palette, businessAddress, logoUrl }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Search for the dog in active queue or completed archive
  let dog = dogs.find((d) => d.id === dogId);
  let isCompleted = false;

  if (!dog) {
    const historyItem = history.find((h) => h.id === dogId);
    if (historyItem) {
      dog = {
        ...historyItem,
        status: 'completed'
      };
      isCompleted = true;
    }
  }

  if (!dog) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${palette.bgClass} flex items-center justify-center p-6 text-right`} dir="rtl">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl max-w-md w-full text-center space-y-4">
          <div className="p-4 bg-amber-50 text-amber-500 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
            <Smile className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-black text-slate-800">הכרטיס לא נמצא במערכת</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            ייתכן שהטיפול של הכלב הסתיים והוא כבר שוחרר לביתו, או שהקישור אינו תקין. אנא פנה למספרה לבירור.
          </p>
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <div className="text-xs font-bold text-slate-700">📍 {businessAddress}</div>
          </div>
        </div>
      </div>
    );
  }

  // Determine status details
  const status = dog.status; // 'waiting', 'active', 'completed'
  let statusText = '';
  let statusColor = '';
  let statusBadge = '';
  let timeText = '';
  let progressPercent = 0;

  if (status === 'waiting') {
    statusText = 'ממתין בתור לטיפול בלובי 🛋️';
    statusColor = 'text-amber-600';
    statusBadge = 'bg-amber-50 border-amber-200 text-amber-800';
    const elapsedMinutes = Math.max(0, Math.floor((Date.now() - dog.arrivalTime) / 60000));
    timeText = `ממתין כבר ${elapsedMinutes} דקות בלובי המפנק שלנו`;
    progressPercent = 20;
  } else if (status === 'active') {
    statusText = 'בטיפול תספורת וטיפוח פעיל ✂️🛁';
    statusColor = 'text-emerald-600 animate-pulse';
    statusBadge = 'bg-emerald-50 border-emerald-250 text-emerald-800';
    
    // Live ticking active stopwatch
    const elapsedSeconds = Math.max(0, Math.floor((Date.now() - dog.startTime) / 1000));
    const hrs = Math.floor(elapsedSeconds / 3600);
    const mins = Math.floor((elapsedSeconds % 3600) / 60);
    const secs = elapsedSeconds % 60;
    const pad = (num) => String(num).padStart(2, '0');
    timeText = `בטיפול כבר ${pad(hrs)}:${pad(mins)}:${pad(secs)} • טיפול ממוצע אורך כ-90 דקות`;
    progressPercent = 60;
  } else {
    statusText = 'הטיפול הסתיים בהצלחה! 🎉🐶';
    statusColor = 'text-purple-650';
    statusBadge = 'bg-purple-50 border-purple-200 text-purple-800';
    
    const durationMins = dog.durationSeconds ? Math.floor(dog.durationSeconds / 60) : 0;
    timeText = `משך הטיפול הכולל: ${durationMins} דקות של פינוק וטיפוח`;
    progressPercent = 100;
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${palette.bgClass} flex items-center justify-center p-4 md:p-8 text-right`} dir="rtl">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-2xl max-w-xl w-full space-y-6 relative overflow-hidden">
        
        {/* Decorative ambient bubbles */}
        <div className="absolute top-[-30%] left-[-20%] w-[60%] h-[60%] bg-indigo-50/20 rounded-full filter blur-3xl -z-10" />
        <div className="absolute bottom-[-25%] right-[-20%] w-[50%] h-[50%] bg-amber-50/20 rounded-full filter blur-3xl -z-10" />

        {/* Salon Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden shrink-0 w-12 h-12">
              <img 
                src={logoUrl || "/logo.jpg"} 
                className="w-full h-full object-contain" 
                alt="Salon Logo" 
                onError={(e) => {
                  e.target.src = "/logo.jpg";
                }}
              />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-800 flex items-center gap-1">
                <span>לוח מעקב - JOY & POLA</span>
                <Bone className="w-4 h-4 text-purple-600 rotate-12" />
              </h1>
              <p className="text-[10px] text-slate-450 font-bold">מערכת מעקב לייב ללקוחות</p>
            </div>
          </div>

          <div className={`px-3 py-1 rounded-full border text-xs font-black shrink-0 ${statusBadge}`}>
            {status === 'waiting' && 'בלובי 🛋️'}
            {status === 'active' && 'בטיפול ✂️'}
            {status === 'completed' && 'מוכן לאיסוף! 🏁'}
          </div>
        </div>

        {/* Welcome Client Box */}
        <div className="bg-slate-50/50 border border-slate-150 rounded-2xl p-4 md:p-5 space-y-2">
          <h2 className="text-base font-black text-slate-800">
            שלום {dog.ownerName || 'לקוח יקר'},
          </h2>
          <p className="text-xs text-slate-550 leading-relaxed font-semibold">
            מעקב אחר מצב הטיפוח של <span className="font-bold text-slate-900">{dog.dogName}</span> (גזע: {dog.breed || 'לא מוגדר'}) פתוח כעת.
            תוכלי לראות את ההתקדמות של הכלב שלך בלייב:
          </p>
        </div>

        {/* Progress Tracker Steps */}
        <div className="space-y-6 pt-2">
          {/* Progress bar line */}
          <div className="relative">
            <div className="absolute top-4 right-4 left-4 h-1 bg-slate-100 -z-10 rounded-full" />
            <div 
              className="absolute top-4 right-4 h-1 bg-indigo-600 -z-10 rounded-full transition-all duration-1000" 
              style={{ width: `${progressPercent}%`, left: 'auto' }}
            />

            <div className="grid grid-cols-3 text-center">
              {/* Step 1: Arrived */}
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border shadow-xs transition-all ${
                  status === 'waiting'
                    ? 'bg-amber-500 border-amber-600 text-white animate-bounce shadow-md shadow-amber-100'
                    : 'bg-indigo-600 border-indigo-700 text-white'
                }`}>
                  {status === 'waiting' ? '⏳' : '✓'}
                </div>
                <span className="text-xs font-black text-slate-700">הגעה למספרה</span>
              </div>

              {/* Step 2: In Treatment */}
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border shadow-xs transition-all ${
                  status === 'active'
                    ? 'bg-emerald-500 border-emerald-600 text-white animate-pulse shadow-md shadow-emerald-100'
                    : status === 'completed'
                    ? 'bg-indigo-600 border-indigo-700 text-white'
                    : 'bg-white border-slate-200 text-slate-400'
                }`}>
                  {status === 'completed' ? '✓' : '✂️'}
                </div>
                <span className="text-xs font-black text-slate-700">בטיפול תספורת</span>
              </div>

              {/* Step 3: Finished */}
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border shadow-xs transition-all ${
                  status === 'completed'
                    ? 'bg-purple-650 border-purple-755 text-white animate-bounce shadow-md shadow-purple-100'
                    : 'bg-white border-slate-200 text-slate-400'
                }`}>
                  {status === 'completed' ? '🎉' : '🏁'}
                </div>
                <span className="text-xs font-black text-slate-700">מוכן לאיסוף</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Status Message Card */}
        <div className={`border rounded-2xl p-5 text-center space-y-3.5 shadow-sm transition-all duration-300 ${
          status === 'completed'
            ? 'bg-purple-50/60 border-purple-250'
            : status === 'active'
            ? 'bg-emerald-50/50 border-emerald-200'
            : 'bg-amber-50/50 border-amber-250'
        }`}>
          {status === 'completed' && <Sparkles className="w-8 h-8 text-purple-600 mx-auto animate-spin-slow" />}
          
          <h3 className={`text-base font-black ${statusColor}`}>
            סטטוס: {statusText}
          </h3>

          <p className="text-xs text-slate-655 font-bold leading-relaxed font-mono">
            {timeText}
          </p>

          {status === 'waiting' && (
            <p className="text-[11px] text-slate-500">
              הספר כבר מכין את עמדת הטיפוח. תודה על הסבלנות 💖
            </p>
          )}

          {status === 'active' && (
            <p className="text-[11px] text-slate-500">
              התספורת והחפיפה מתקדמות מעולה! הכלב שלך נהנה ומקבל יחס ויד אוהבת ומלטפת. 🥰
            </p>
          )}

          {status === 'completed' && (
            <div className="space-y-1">
              <p className="text-[11px] text-slate-600 font-extrabold">
                איזה יופי! התספורת הסתיימה והכלב נראה מדהים ומוכן לנשיקות וחיבוקים. 😘
              </p>
              <p className="text-xs text-slate-900 font-black">
                נא להגיע לאסוף את הכלב מהמספרה! 🐾
              </p>
            </div>
          )}
        </div>

        {/* Navigation & Contact Row */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          {/* Call button */}
          <a
            href="tel:052-1234567" // Fallback generic phone or add custom salon phone if needed
            className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 py-3 rounded-2xl text-xs font-black shadow-xs transition-all cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-slate-550" />
            <span>התקשר למספרה</span>
          </a>

          {/* Navigate button */}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessAddress)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 py-3 rounded-2xl text-xs font-black shadow-xs transition-all cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-slate-550" />
            <span>ניווט למספרה</span>
          </a>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 pt-4 text-center text-[10px] text-slate-400 font-semibold space-y-1">
          <div>JOY & POLA • {businessAddress}</div>
          <div>מערכת מעקב דינמית מסונכרנת בלייב • הנתונים מתעדכנים אוטומטית</div>
        </div>

      </div>
    </div>
  );
}
