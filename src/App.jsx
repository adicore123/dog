import React, { useState, useEffect, useRef } from 'react';
import TvDisplay from './components/TvDisplay';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';

// 5 stylish Tel Avivian feminine-focused color palettes
export const PALETTES = [
  {
    id: 'cream_classic',
    name: 'שמנת קלאסית 🐶 (JOY & POLA)',
    bgClass: 'from-indigo-50/20 via-[#faf9f2] to-amber-50/20',
    bgColor: '#faf9f2',
    primaryText: 'text-blue-900',
    titleGradient: 'from-blue-900 to-indigo-750',
    primaryBg: 'bg-purple-600 hover:bg-purple-700 focus:border-purple-500 shadow-purple-100',
    borderCol: 'border-slate-200',
    headerBadge: 'bg-white border-slate-100',
    accentText: 'text-amber-500',
    accentBg: 'bg-amber-50 text-amber-800 border-amber-200'
  },
  {
    id: 'sunset_pink',
    name: 'ורוד שקיעה תל אביבית 🌸 (Chic Rose)',
    bgClass: 'from-rose-50/30 via-[#fff5f6] to-purple-50/30',
    bgColor: '#fff5f6',
    primaryText: 'text-rose-900',
    titleGradient: 'from-rose-900 to-purple-800',
    primaryBg: 'bg-rose-600 hover:bg-rose-700 focus:border-rose-500 shadow-rose-100',
    borderCol: 'border-rose-200',
    headerBadge: 'bg-white border-rose-100',
    accentText: 'text-purple-600',
    accentBg: 'bg-purple-50 text-purple-800 border-purple-200'
  },
  {
    id: 'pistachio_chic',
    name: 'פיסטוק ורוד שיק 🌿 (Pistachio Blush)',
    bgClass: 'from-emerald-50/20 via-[#f4f7f0] to-rose-50/20',
    bgColor: '#f4f7f0',
    primaryText: 'text-emerald-950',
    titleGradient: 'from-emerald-900 to-teal-800',
    primaryBg: 'bg-emerald-600 hover:bg-emerald-700 focus:border-emerald-500 shadow-emerald-100',
    borderCol: 'border-emerald-250',
    headerBadge: 'bg-white border-emerald-100',
    accentText: 'text-rose-500',
    accentBg: 'bg-rose-50 text-rose-800 border-rose-200'
  },
  {
    id: 'lavender_dreams',
    name: 'לבנדר חלומות 🍇 (Lavender Mint)',
    bgClass: 'from-purple-50/30 via-[#f7f4fc] to-teal-50/20',
    bgColor: '#f7f4fc',
    primaryText: 'text-purple-950',
    titleGradient: 'from-purple-900 to-indigo-800',
    primaryBg: 'bg-purple-600 hover:bg-purple-700 focus:border-purple-500 shadow-purple-100',
    borderCol: 'border-purple-200',
    headerBadge: 'bg-white border-purple-100',
    accentText: 'text-teal-600',
    accentBg: 'bg-teal-50 text-teal-800 border-teal-200'
  },
  {
    id: 'vibrant_coral',
    name: 'קורל תפוז תוסס 🍊 (Vibrant Coral)',
    bgClass: 'from-orange-50/20 via-[#fffbf7] to-yellow-50/20',
    bgColor: '#fffbf7',
    primaryText: 'text-orange-950',
    titleGradient: 'from-orange-900 to-red-800',
    primaryBg: 'bg-orange-600 hover:bg-orange-700 focus:border-orange-500 shadow-orange-100',
    borderCol: 'border-orange-200',
    headerBadge: 'bg-white border-orange-100',
    accentText: 'text-amber-600',
    accentBg: 'bg-amber-50 text-amber-800 border-amber-200'
  }
];

// Synthesize long (2.5s-4.5s) sophisticated designer alarms in-code using HTML5 Web Audio API
const triggerSound = (presetId) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    // Helper to play multiple harmonics together (creates rich "designer" chord timbre)
    const playChord = (freqs, startTime, duration, vol) => {
      freqs.forEach(f => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime + startTime);
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.setValueAtTime(vol, ctx.currentTime + startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + startTime);
        osc.stop(ctx.currentTime + startTime + duration);
      });
    };

    switch (presetId) {
      case 'double_chime':
        playChord([880, 1320], 0, 2.5, 0.15); // A5 + E6 (perfect fifth)
        playChord([1109.73, 1661.22], 0.25, 3.0, 0.12); // C#6 + G#6
        break;

      case 'short_ping':
        [1200, 1205, 1500, 1800, 2200].forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = i % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(f, ctx.currentTime);
          gain.gain.setValueAtTime(0.07, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.5);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 3.5);
        });
        break;

      case 'ascending':
        [523.25, 659.25, 783.99, 1046.50, 523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
          const delay = idx * 0.35;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.setValueAtTime(0.18, ctx.currentTime + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + delay);
          osc.stop(ctx.currentTime + delay + 0.6);
        });
        break;

      case 'descending':
        [0, 0.12, 0.7, 0.82, 1.4, 1.52, 2.1, 2.22].forEach((delay) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(1200, ctx.currentTime + delay);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.setValueAtTime(0.15, ctx.currentTime + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + delay);
          osc.stop(ctx.currentTime + delay + 0.08);
        });
        break;

      case 'double_beep':
        for (let p = 0; p < 4; p++) {
          const delay = p * 0.8;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(140, ctx.currentTime + delay);
          
          osc.frequency.linearRampToValueAtTime(165, ctx.currentTime + delay + 0.2);
          osc.frequency.linearRampToValueAtTime(140, ctx.currentTime + delay + 0.4);

          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.setValueAtTime(0.24, ctx.currentTime + delay);
          gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + delay + 0.35);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.4);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + delay);
          osc.stop(ctx.currentTime + delay + 0.4);
        }
        break;

      case 'melody':
        {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          
          const sweep = (start, duration) => {
            osc.frequency.setValueAtTime(400, ctx.currentTime + start);
            osc.frequency.linearRampToValueAtTime(1000, ctx.currentTime + start + duration * 0.5);
            osc.frequency.linearRampToValueAtTime(400, ctx.currentTime + start + duration);
          };
          
          sweep(0, 1.2);
          sweep(1.2, 1.2);
          sweep(2.4, 1.2);

          gain.gain.setValueAtTime(0.24, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 3.6);
        }
        break;

      case 'mini_song':
        [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50, 783.99, 1046.50].forEach((freq, idx) => {
          const delay = idx * 0.16;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
          
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.setValueAtTime(0.12, ctx.currentTime + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.25);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + delay);
          osc.stop(ctx.currentTime + delay + 0.25);
        });
        break;

      case 'ding_dong':
        {
          const osc1a = ctx.createOscillator();
          const osc1b = ctx.createOscillator();
          const gain1 = ctx.createGain();
          osc1a.type = 'sine'; osc1b.type = 'triangle';
          osc1a.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
          osc1b.frequency.setValueAtTime(739.99, ctx.currentTime); // F#5
          gain1.gain.setValueAtTime(0.2, ctx.currentTime);
          gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);
          osc1a.connect(gain1); osc1b.connect(gain1);
          gain1.connect(ctx.destination);
          osc1a.start(); osc1b.start();
          osc1a.stop(ctx.currentTime + 2.0); osc1b.stop(ctx.currentTime + 2.0);

          const osc2a = ctx.createOscillator();
          const osc2b = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2a.type = 'sine'; osc2b.type = 'triangle';
          osc2a.frequency.setValueAtTime(440.00, ctx.currentTime + 0.4); // A4
          osc2b.frequency.setValueAtTime(554.37, ctx.currentTime + 0.4); // C#5
          gain2.gain.setValueAtTime(0, ctx.currentTime);
          gain2.gain.setValueAtTime(0.2, ctx.currentTime + 0.4);
          gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.4);
          osc2a.connect(gain2); osc2b.connect(gain2);
          gain2.connect(ctx.destination);
          osc2a.start(ctx.currentTime + 0.4); osc2b.start(ctx.currentTime + 0.4);
          osc2a.stop(ctx.currentTime + 3.4); osc2b.stop(ctx.currentTime + 3.4);
        }
        break;

      case 'bubble_plop':
        {
          const ring = (start) => {
            for (let i = 0; i < 20; i++) {
              const stepDelay = start + i * 0.03;
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(i % 2 === 0 ? 950 : 1000, ctx.currentTime + stepDelay);
              gain.gain.setValueAtTime(0, ctx.currentTime);
              gain.gain.setValueAtTime(0.2, ctx.currentTime + stepDelay);
              gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + stepDelay + 0.04);
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start(ctx.currentTime + stepDelay);
              osc.stop(ctx.currentTime + stepDelay + 0.04);
            }
          };
          ring(0);
          ring(1.2);
          ring(2.4);
        }
        break;

      case 'urgent_pulse':
        {
          let time = 0;
          for (let i = 0; i < 12; i++) {
            const delay = time;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            const freq = 600 + i * 55;
            osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
            
            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.setValueAtTime(0.25, ctx.currentTime + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.08);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + delay);
            osc.stop(ctx.currentTime + delay + 0.08);

            time += Math.max(0.12, 0.4 - i * 0.03);
          }
        }
        break;

      default:
        break;
    }
  } catch (e) {
    console.warn('AudioContext trigger failed', e);
  }
};

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('grooming_admin_authenticated') === 'true';
  });

  // Settings: color palette and TV sound toggle (both local and cross-tab synced)
  const [activePaletteId, setActivePaletteId] = useState(() => {
    return localStorage.getItem('grooming_active_palette') || 'cream_classic';
  });

  const [tvSoundEnabled, setTvSoundEnabled] = useState(() => {
    return localStorage.getItem('grooming_tv_sound_enabled') !== 'false';
  });

  // Refs to prevent recursive write/sync feedback loops
  const isSyncingDogsRef = useRef(false);
  const isSyncingHistoryRef = useRef(false);

  // Dynamic background style matching active palette
  const activePalette = PALETTES.find(p => p.id === activePaletteId) || PALETTES[0];

  useEffect(() => {
    document.body.style.backgroundColor = activePalette.bgColor;
  }, [activePalette]);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const [dogs, setDogs] = useState(() => {
    try {
      const savedDogs = localStorage.getItem('grooming_dogs_queue');
      return savedDogs ? JSON.parse(savedDogs) : [];
    } catch (e) {
      console.error('Failed to parse grooming_dogs_queue', e);
      return [];
    }
  });

  const [history, setHistory] = useState(() => {
    try {
      const savedHistory = localStorage.getItem('grooming_history');
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (e) {
      console.error('Failed to parse grooming_history', e);
      return [];
    }
  });

  // Local state changes trigger localStorage updates (skipped if updated via cross-tab sync)
  useEffect(() => {
    if (isSyncingDogsRef.current) {
      isSyncingDogsRef.current = false;
      return;
    }
    localStorage.setItem('grooming_dogs_queue', JSON.stringify(dogs));
  }, [dogs]);

  useEffect(() => {
    if (isSyncingHistoryRef.current) {
      isSyncingHistoryRef.current = false;
      return;
    }
    localStorage.setItem('grooming_history', JSON.stringify(history));
  }, [history]);

  // Real-time synchronization across browser tabs using HTML5 Storage Events
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'grooming_dogs_queue') {
        try {
          const parsed = e.newValue ? JSON.parse(e.newValue) : [];
          isSyncingDogsRef.current = true;
          setDogs(parsed);
        } catch (err) {
          console.error('Failed to sync grooming_dogs_queue from another tab', err);
        }
      }
      if (e.key === 'grooming_history') {
        try {
          const parsed = e.newValue ? JSON.parse(e.newValue) : [];
          isSyncingHistoryRef.current = true;
          setHistory(parsed);
        } catch (err) {
          console.error('Failed to sync grooming_history from another tab', err);
        }
      }
      // Sync color palette changes
      if (e.key === 'grooming_active_palette' && e.newValue) {
        setActivePaletteId(e.newValue);
      }
      // Sync TV sound enabled setting
      if (e.key === 'grooming_tv_sound_enabled' && e.newValue) {
        setTvSoundEnabled(e.newValue !== 'false');
      }
      // Cross-tab real-time audio synchronization
      if (e.key === 'grooming_trigger_sound_event' && e.newValue) {
        try {
          const eventData = JSON.parse(e.newValue);
          const isTv = window.location.pathname !== '/admin';
          const soundEnabledSetting = localStorage.getItem('grooming_tv_sound_enabled') !== 'false';
          
          if (eventData && eventData.id) {
            // Only play if on admin, or if TV sound is enabled
            if (!isTv || soundEnabledSetting) {
              triggerSound(eventData.id);
            }
          }
        } catch (err) {
          console.error('Failed to trigger sound from storage event', err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Backup active polling interval (runs every 800ms) to guarantee instant update on all tabs/setups
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const rawDogs = localStorage.getItem('grooming_dogs_queue');
        if (rawDogs) {
          const currentDogsStr = JSON.stringify(dogs);
          if (rawDogs !== currentDogsStr) {
            isSyncingDogsRef.current = true;
            setDogs(JSON.parse(rawDogs));
          }
        }
      } catch (e) {
        console.error('Failed to poll dogs queue', e);
      }

      try {
        const rawHistory = localStorage.getItem('grooming_history');
        if (rawHistory) {
          const currentHistoryStr = JSON.stringify(history);
          if (rawHistory !== currentHistoryStr) {
            isSyncingHistoryRef.current = true;
            setHistory(JSON.parse(rawHistory));
          }
        }
      } catch (e) {
        console.error('Failed to poll history', e);
      }

      // Poll palette ID
      const savedPalette = localStorage.getItem('grooming_active_palette') || 'cream_classic';
      if (savedPalette !== activePaletteId) {
        setActivePaletteId(savedPalette);
      }

      // Poll TV sound setting
      const savedTvSound = localStorage.getItem('grooming_tv_sound_enabled') !== 'false';
      if (savedTvSound !== tvSoundEnabled) {
        setTvSoundEnabled(savedTvSound);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [dogs, history, activePaletteId, tvSoundEnabled]);

  const handleRegisterDog = (newDog) => {
    const dogWithId = {
      ...newDog,
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      status: 'waiting',
      arrivalTime: Date.now(),
      startTime: null
    };
    setDogs((prev) => [...prev, dogWithId]);
  };

  const handleStartTreatment = (id) => {
    setDogs((prev) =>
      prev.map((dog) =>
        dog.id === id
          ? { ...dog, status: 'active', startTime: Date.now() }
          : dog
      )
    );
  };

  const handleFinishTreatment = (id) => {
    const targetDog = dogs.find((dog) => dog.id === id);
    if (!targetDog) return;

    const endTime = Date.now();
    const durationSeconds = Math.max(0, Math.floor((endTime - (targetDog.startTime || targetDog.arrivalTime)) / 1000));

    const completedSession = {
      id: targetDog.id,
      dogName: targetDog.dogName,
      ownerName: targetDog.ownerName,
      phone: targetDog.phone,
      breed: targetDog.breed,
      notes: targetDog.notes || '',
      arrivalTime: targetDog.arrivalTime,
      startTime: targetDog.startTime || targetDog.arrivalTime,
      endTime,
      durationSeconds
    };

    setHistory((prev) => [completedSession, ...prev]);
    setDogs((prev) => prev.filter((dog) => dog.id !== id));
  };

  const handleDeleteHistoryItem = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setDogs([]);
    setHistory([]);
  };

  const handleLoadDemo = () => {
    const now = Date.now();
    const demoDogs = [
      {
        id: 'demo-wait-1',
        dogName: 'לקי',
        ownerName: 'יוסי כהן',
        phone: '052-1234567',
        breed: 'שיצו',
        notes: 'להיזהר על קשרים מאחורי האוזניים',
        status: 'waiting',
        arrivalTime: now - 8 * 60 * 1000,
        startTime: null
      },
      {
        id: 'demo-wait-2',
        dogName: 'במבי',
        ownerName: 'מיכל לוי',
        phone: '054-9876543',
        breed: 'מלטז',
        notes: 'שמפו היפואלרגני בלבד, עור רגיש',
        status: 'waiting',
        arrivalTime: now - 25 * 60 * 1000,
        startTime: null
      },
      {
        id: 'demo-active-1',
        dogName: 'שוקו',
        ownerName: 'רוני שלום',
        phone: '050-5555555',
        breed: 'קוקר ספניאל',
        notes: 'רגישות בעיניים, לשטוף בעדינות רבה',
        status: 'active',
        arrivalTime: now - 45 * 60 * 1000,
        startTime: now - 15 * 60 * 1000
      },
      {
        id: 'demo-active-2',
        dogName: 'בייגל',
        ownerName: 'דנה גל',
        phone: '053-1111111',
        breed: 'פודל ננסי',
        notes: 'תספורת קצרה מאוד בראש (בסגנון דובון)',
        status: 'active',
        arrivalTime: now - 80 * 60 * 1000,
        startTime: now - 65 * 60 * 1000
      },
      {
        id: 'demo-active-3',
        dogName: 'לסי',
        ownerName: 'אביב ארד',
        phone: '058-2222222',
        breed: 'בורדר קולי',
        notes: 'פחדן ממייבשי שיער (לייבש בעוצמה נמוכה)',
        status: 'active',
        arrivalTime: now - 120 * 60 * 1000,
        startTime: now - 95 * 60 * 1000
      }
    ];

    const demoHistory = [
      {
        id: 'history-1',
        dogName: 'מקס',
        ownerName: 'גיל דוד',
        phone: '054-4444444',
        breed: 'רועה גרמני',
        notes: 'להבריש היטב את תת-הפרווה, נשירה כבדה',
        arrivalTime: now - 180 * 60 * 1000,
        startTime: now - 165 * 60 * 1000,
        endTime: now - 105 * 60 * 1000,
        durationSeconds: 60 * 60
      },
      {
        id: 'history-2',
        dogName: 'מיקי',
        ownerName: 'עדי פרידמן',
        phone: '050-8888888',
        breed: 'צ\'יוואווה',
        notes: 'לגזור ציפורניים בעדינות, נוטה לרעוד',
        arrivalTime: now - 240 * 60 * 1000,
        startTime: now - 235 * 60 * 1000,
        endTime: now - 200 * 60 * 1000,
        durationSeconds: 35 * 60
      }
    ];

    setDogs(demoDogs);
    setHistory(demoHistory);
  };

  const handleTriggerSound = (soundId) => {
    // Play locally
    triggerSound(soundId);
    // Sync to other tabs
    localStorage.setItem('grooming_trigger_sound_event', JSON.stringify({
      id: soundId,
      timestamp: Date.now()
    }));
  };

  const handlePaletteChange = (paletteId) => {
    setActivePaletteId(paletteId);
    localStorage.setItem('grooming_active_palette', paletteId);
  };

  const handleTvSoundToggle = (enabled) => {
    setTvSoundEnabled(enabled);
    localStorage.setItem('grooming_tv_sound_enabled', enabled ? 'true' : 'false');
  };

  if (currentPath === '/admin') {
    if (!isAdminAuthenticated) {
      return (
        <AdminLogin
          onLogin={() => {
            setIsAdminAuthenticated(true);
            sessionStorage.setItem('grooming_admin_authenticated', 'true');
          }}
          navigate={navigate}
        />
      );
    }
    return (
      <AdminDashboard
        dogs={dogs}
        history={history}
        palette={activePalette}
        tvSoundEnabled={tvSoundEnabled}
        onPaletteChange={handlePaletteChange}
        onTvSoundToggle={handleTvSoundToggle}
        onRegisterDog={handleRegisterDog}
        onStartTreatment={handleStartTreatment}
        onFinishTreatment={handleFinishTreatment}
        onDeleteHistoryItem={handleDeleteHistoryItem}
        onLoadDemo={handleLoadDemo}
        onClearAll={handleClearAll}
        onTriggerSound={handleTriggerSound}
        navigate={navigate}
      />
    );
  }

  return (
    <TvDisplay 
      dogs={dogs.filter((dog) => dog.status === 'active')} 
      palette={activePalette}
      navigate={navigate}
    />
  );
}
