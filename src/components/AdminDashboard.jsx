import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Smile, Scissors, Plus, Bone, Trash2, ArrowLeft, AlertCircle, Sparkles, Search, Check, FileText, Volume2 } from 'lucide-react';

const COMMON_BREEDS = [
  'שיצו',
  'פודל',
  'מלטז',
  'גולדן רטריבר',
  'לברדור',
  'יורקשייר טרייר',
  'צ\'יוואווה',
  'בורדר קולי',
  'פומרניאן',
  'רועה גרמני',
  'קוקר ספניאל',
  'פאג',
  'מעורב',
  'בישון פריזה',
  'ג\'ק ראסל'
];

const SOUND_PRESETS = [
  { id: 'double_chime', name: 'פעמון דלפק מהדהד ארוך 🔔' },
  { id: 'short_ping', name: 'צלצול מתכת קוסמי 🎵' },
  { id: 'ascending', name: 'שעון מעורר מלודי מעוצב ⏰' },
  { id: 'descending', name: 'צפצוף סנסור דיגיטלי 📟' },
  { id: 'double_beep', name: 'זמזם תעשייתי פועם 🚨' },
  { id: 'melody', name: 'סירנה מעוצבת עולה ויורדת 📣' },
  { id: 'mini_song', name: 'מנגינת בוקר אנרגטית 🐕' },
  { id: 'ding_dong', name: 'דינג-דונג מהדהד ארוך 🚪' },
  { id: 'bubble_plop', name: 'טלפון וינטג\' ארוך ☎️' },
  { id: 'urgent_pulse', name: 'זמזם חירום מואץ 🔴' }
];

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

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
      case 'double_chime': // 1.פעמון דלפק מהדהד ארוך
        // Rich ringing chime with lingering harmonics (approx 3.2s)
        playChord([880, 1320], 0, 2.5, 0.15); // A5 + E6 (perfect fifth)
        playChord([1109.73, 1661.22], 0.25, 3.0, 0.12); // C#6 + G#6
        break;

      case 'short_ping': // 2.צלצול מתכת קוסמי
        // Dense metallic cascade echoing for 3.5s
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

      case 'ascending': // 3.שעון מעורר מלודי מעוצב
        // 8-note major chord run playing in a bright rising sequence (lasts 3.2s)
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

      case 'descending': // 4.צפצוף סנסור דיגיטלי
        // Heartbeat digital sonar pulses (lasts 3s)
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

      case 'double_beep': // 5.זמזם תעשייתי פועם
        // Low submarine sawtooth alarm with pitch vibrato (lasts 3.2s)
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

      case 'melody': // 6.סירנה מעוצבת עולה ויורדת
        // Clean triangle siren sweeping smoothly 3 times (lasts 3.6s)
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

      case 'mini_song': // 7.מנגינת בוקר אנרגטית
        // Lively, fast digital chime arpeggio (lasts 3s)
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

      case 'ding_dong': // 8.דינג-דונג מהדהד ארוך
        // Rich chords played in doorway ding-dong sequence (lasts 3.4s)
        // Ding
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

          // Dong
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

      case 'bubble_plop': // 9.טלפון וינטג\' ארוך
        // Vintage phone mechanical ringing cycle (lasts 4.0s)
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

      case 'urgent_pulse': // 10.זמזם חירום מואץ
        // 12 beeps accelerating in rate and pitch (lasts 3.5s)
        {
          let time = 0;
          for (let i = 0; i < 12; i++) {
            const delay = time;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            const freq = 600 + i * 55; // Pitch escalates
            osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
            
            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.setValueAtTime(0.25, ctx.currentTime + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.08);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + delay);
            osc.stop(ctx.currentTime + delay + 0.08);

            time += Math.max(0.12, 0.4 - i * 0.03); // Speed increases
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

export default function AdminDashboard({
  dogs,
  history,
  onRegisterDog,
  onStartTreatment,
  onFinishTreatment,
  onDeleteHistoryItem,
  onLoadDemo,
  onClearAll,
  navigate
}) {
  const [dogName, setDogName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  
  const [breedInput, setBreedInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Custom persistent breeds list
  const [availableBreeds, setAvailableBreeds] = useState(() => {
    const saved = localStorage.getItem('grooming_custom_breeds');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...COMMON_BREEDS, ...parsed];
      } catch (e) {
        return COMMON_BREEDS;
      }
    }
    return COMMON_BREEDS;
  });

  const [filteredBreeds, setFilteredBreeds] = useState(COMMON_BREEDS);

  const [selectedSound, setSelectedSound] = useState(() => {
    return localStorage.getItem('grooming_selected_sound') || 'double_chime';
  });

  const [historySearch, setHistorySearch] = useState('');
  const [historyBreedFilter, setHistoryBreedFilter] = useState('');
  const [historyDateFilter, setHistoryDateFilter] = useState('');

  const [playedWaitingAlerts, setPlayedWaitingAlerts] = useState([]);
  const [playedActiveAlerts, setPlayedActiveAlerts] = useState([]);

  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((t) => t + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const now = Date.now();
    
    const waitingAlertIds = dogs
      .filter((dog) => dog.status === 'waiting' && (now - dog.arrivalTime) >= 20 * 60 * 1000)
      .map((dog) => dog.id);
      
    const activeAlertIds = dogs
      .filter((dog) => dog.status === 'active' && dog.startTime && (now - dog.startTime) >= 90 * 60 * 1000)
      .map((dog) => dog.id);

    let chimePlayed = false;

    const newWaitingAlerts = waitingAlertIds.filter(id => !playedWaitingAlerts.includes(id));
    if (newWaitingAlerts.length > 0) {
      triggerSound(selectedSound);
      chimePlayed = true;
    }

    const newActiveAlerts = activeAlertIds.filter(id => !playedActiveAlerts.includes(id));
    if (newActiveAlerts.length > 0 && !chimePlayed) {
      triggerSound(selectedSound);
    }

    setPlayedWaitingAlerts(waitingAlertIds);
    setPlayedActiveAlerts(activeAlertIds);
  }, [dogs, tick, playedWaitingAlerts, playedActiveAlerts, selectedSound]);

  useEffect(() => {
    if (!breedInput.trim()) {
      setFilteredBreeds(availableBreeds);
    } else {
      setFilteredBreeds(
        availableBreeds.filter((b) =>
          b.toLowerCase().includes(breedInput.toLowerCase())
        )
      );
    }
  }, [breedInput, availableBreeds]);

  const handleAddNewBreed = () => {
    const newBreed = breedInput.trim();
    if (!newBreed || availableBreeds.includes(newBreed)) return;

    // Add to custom list (we keep only the new custom ones in localStorage)
    const saved = localStorage.getItem('grooming_custom_breeds');
    let customList = [];
    if (saved) {
      try { customList = JSON.parse(saved); } catch (e) {}
    }
    if (!customList.includes(newBreed)) {
      customList.push(newBreed);
      localStorage.setItem('grooming_custom_breeds', JSON.stringify(customList));
    }

    setAvailableBreeds([...COMMON_BREEDS, ...customList]);
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dogName.trim()) return;

    const finalBreed = breedInput.trim() || 'לא מוגדר';

    if (finalBreed !== 'לא מוגדר' && !availableBreeds.includes(finalBreed)) {
      const saved = localStorage.getItem('grooming_custom_breeds');
      let customList = [];
      if (saved) {
        try { customList = JSON.parse(saved); } catch (e) {}
      }
      if (!customList.includes(finalBreed)) {
        customList.push(finalBreed);
        localStorage.setItem('grooming_custom_breeds', JSON.stringify(customList));
        setAvailableBreeds([...COMMON_BREEDS, ...customList]);
      }
    }

    onRegisterDog({
      dogName: dogName.trim(),
      ownerName: ownerName.trim(),
      phone: phone.trim(),
      breed: finalBreed,
      notes: notes.trim()
    });

    setDogName('');
    setOwnerName('');
    setPhone('');
    setBreedInput('');
    setNotes('');
    setIsDropdownOpen(false);
  };

  const handleSelectBreed = (selected) => {
    setBreedInput(selected);
    setIsDropdownOpen(false);
  };

  const handleSoundChange = (e) => {
    const soundId = e.target.value;
    setSelectedSound(soundId);
    localStorage.setItem('grooming_selected_sound', soundId);
    triggerSound(soundId);
  };

  const getWhatsAppUrl = (phoneNum, ownerName, dogName) => {
    let cleanPhone = phoneNum.replace(/\D/g, '');
    if (cleanPhone.startsWith('05')) {
      cleanPhone = '972' + cleanPhone.slice(1);
    }
    const message = `שלום ${ownerName}, הטיפול של ${dogName} בסלון הכלבים העליז הסתיים בהצלחה והוא מוכן לאיסוף! 🐶✂️`;
    return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
  };

  const getWaitingTimeMinutes = (arrivalTime) => {
    const elapsedMs = Date.now() - arrivalTime;
    return Math.max(0, Math.floor(elapsedMs / 60000));
  };

  const formatActiveTime = (startTime) => {
    if (!startTime) return '00:00:00';
    const elapsedSeconds = Math.max(0, Math.floor((Date.now() - startTime) / 1000));
    const hrs = Math.floor(elapsedSeconds / 3600);
    const mins = Math.floor((elapsedSeconds % 3600) / 60);
    const secs = elapsedSeconds % 60;
    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  const formatDuration = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    if (mins < 1) return 'פחות מדקה';
    if (mins === 1) return 'דקה אחת';
    if (mins < 60) return `${mins} דקות`;
    
    const hrs = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    
    if (hrs === 1) {
      return remainingMins > 0 ? `שעה ו-${remainingMins} דק'` : 'שעה אחת';
    }
    return remainingMins > 0 ? `${hrs} שעות ו-${remainingMins} דק'` : `${hrs} שעות`;
  };

  const formatTimeOfDay = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const matchesDateFilter = (timestamp, filterDateString) => {
    if (!filterDateString) return true;
    const itemDate = new Date(timestamp);
    const yyyy = itemDate.getFullYear();
    const mm = String(itemDate.getMonth() + 1).padStart(2, '0');
    const dd = String(itemDate.getDate()).padStart(2, '0');
    const itemDateString = `${yyyy}-${mm}-${dd}`;
    return itemDateString === filterDateString;
  };

  const uniqueBreedsInHistory = Array.from(
    new Set(history.map((item) => item.breed).filter(Boolean))
  ).sort();

  const waitingDogs = dogs.filter((dog) => dog.status === 'waiting');
  const activeDogs = dogs.filter((dog) => dog.status === 'active');

  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.dogName.toLowerCase().includes(historySearch.toLowerCase()) ||
      (item.ownerName && item.ownerName.toLowerCase().includes(historySearch.toLowerCase())) ||
      (item.phone && item.phone.includes(historySearch)) ||
      (item.notes && item.notes.toLowerCase().includes(historySearch.toLowerCase()));

    const matchesBreed = !historyBreedFilter || item.breed === historyBreedFilter;
    const matchesDate = matchesDateFilter(item.endTime, historyDateFilter);

    return matchesSearch && matchesBreed && matchesDate;
  });

  return (
    <div className="min-h-screen bg-[#faf9f2] p-6 md:p-10 select-none text-right flex flex-col font-sans" dir="rtl">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-200 pb-6 mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-white p-1 rounded-2xl shadow-md border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
            <img 
              src="/logo.jpg" 
              className="h-14 w-auto object-contain" 
              alt="Joy & Pola Logo" 
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-black text-blue-900 tracking-tight leading-none flex items-center gap-2">
              <span>ממשק ניהול - JOY 🐶 POLA</span>
              <Bone className="w-5 h-5 text-amber-500 fill-amber-400 rotate-12" />
            </h1>
            <p className="text-slate-500 text-xs font-bold mt-1.5">
              אבן גבירול 163, תל אביב • ניהול תורים, צלילי התראה חזקים ומעוצבים (שעון מעורר) וחריגות זמן
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Sound Selector Dropdown */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-xs">
            <Volume2 className="w-4 h-4 text-purple-600" />
            <label className="text-[10px] font-bold text-slate-500">צליל מעורר:</label>
            <select
              value={selectedSound}
              onChange={handleSoundChange}
              className="text-xs text-slate-700 font-bold bg-transparent border-0 focus:outline-none cursor-pointer pr-1"
            >
              {SOUND_PRESETS.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.name}
                </option>
              ))}
            </select>
          </div>

          {/* Test Sound Button */}
          <button
            onClick={() => triggerSound(selectedSound)}
            className="flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-650 py-2.5 px-4 rounded-xl border border-slate-200 shadow-xs transition-all cursor-pointer text-xs font-bold"
            title="השמע בדיקה לצליל שבחרת"
          >
            <span>השמע בדיקה 🔊</span>
          </button>

          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 px-4 rounded-xl border border-slate-200 shadow-sm transition-all cursor-pointer text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4 ml-1.5" />
            <span>מעבר למסך ציבורי (טלוויזיה)</span>
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* RIGHT COLUMN: REGISTRATION (4 cols) */}
        <div className="xl:col-span-4 space-y-6">
          
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-md">
            <h2 className="text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-5 flex items-center gap-2">
              <Plus className="w-5 h-5 text-purple-650" />
              <span>רישום לקוח חדש שהגיע</span>
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">שם הכלב *</label>
                <input
                  type="text"
                  required
                  placeholder="הקלד את שם הכלב..."
                  value={dogName}
                  onChange={(e) => setDogName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white font-medium transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">שם הבעלים</label>
                <input
                  type="text"
                  placeholder="שם הבעלים..."
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white font-medium transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">מספר טלפון</label>
                <input
                  type="tel"
                  placeholder="לדוגמה: 052-1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white font-mono font-medium transition-all text-sm text-left"
                  dir="ltr"
                />
              </div>

              {/* Breed Selection */}
              <div className="relative">
                <label className="block text-xs font-bold text-slate-500 mb-1.5">גזע הכלב</label>
                <div className="flex gap-2 items-center">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="חפש או הקלד גזע..."
                      value={breedInput}
                      onChange={(e) => {
                        setBreedInput(e.target.value);
                        setIsDropdownOpen(true);
                      }}
                      onFocus={() => setIsDropdownOpen(true)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-4 pl-10 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white font-medium transition-all text-sm"
                    />
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  </div>
                  
                  {/* Plus button to add custom breed */}
                  <button
                    type="button"
                    onClick={handleAddNewBreed}
                    disabled={!breedInput.trim() || availableBreeds.includes(breedInput.trim())}
                    className={`p-2.5 rounded-xl border font-bold transition-all flex items-center justify-center shrink-0 ${
                      breedInput.trim() && !availableBreeds.includes(breedInput.trim())
                        ? 'bg-purple-600 border-purple-650 hover:bg-purple-750 text-white cursor-pointer shadow-md shadow-purple-100'
                        : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                    title="הוסף גזע לרשימה הקבועה"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                    <ul className="absolute z-20 w-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl max-h-52 overflow-y-auto divide-y divide-slate-50">
                      {filteredBreeds.length === 0 ? (
                        <li className="p-3 text-xs text-slate-450 italic">
                          אין גזע תואם. הקלד גזע מותאם אישית...
                        </li>
                      ) : (
                        filteredBreeds.map((breed) => (
                          <li
                            key={breed}
                            onClick={() => handleSelectBreed(breed)}
                            className="p-3 text-sm text-slate-700 hover:bg-purple-50 hover:text-purple-700 cursor-pointer flex items-center justify-between transition-colors"
                          >
                            <span>{breed}</span>
                            {breedInput === breed && <Check className="w-4 h-4 text-purple-600" />}
                          </li>
                        ))
                      )}
                    </ul>
                  </>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">הערות מיוחדות / דגשים לטיפול</label>
                <textarea
                  placeholder="לדוגמה: רגישות לשמפו, פוחד ממייבש, לספר קצר..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="2"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white font-medium transition-all text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-sm shadow-md shadow-purple-100 mt-6"
              >
                <Plus className="w-4 h-4" />
                <span>רשום והמתן לתספורת</span>
              </button>
            </form>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-md space-y-4">
            <h2 className="text-sm font-black text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>סימולציות דמו מהירות לטלוויזיה ולתור</span>
            </h2>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={onLoadDemo}
                className="bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 p-2.5 rounded-lg font-bold transition-all cursor-pointer text-center"
              >
                טען סימולציה מלאה
              </button>
              <button
                onClick={onClearAll}
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-650 p-2.5 rounded-lg font-bold transition-all cursor-pointer text-center"
              >
                נקה את כל הנתונים
              </button>
            </div>
          </div>
        </div>

        {/* LEFT COLUMN: QUEUES (8 cols) */}
        <div className="xl:col-span-8 space-y-6">
          
          {/* Waiting Queue */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-md">
            <h2 className="text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>תור הממתינים לתספורת ({waitingDogs.length})</span>
              </span>
              <span className="text-xs font-semibold text-slate-400">לובי המתנה</span>
            </h2>

            {waitingDogs.length === 0 ? (
              <p className="text-slate-400 text-sm italic py-8 text-center">אין כלבים ממתינים כרגע</p>
            ) : (
              <div className="divide-y divide-slate-100 overflow-y-auto max-h-72 pr-1 space-y-3.5">
                {waitingDogs.map((dog) => {
                  const waitMinutes = getWaitingTimeMinutes(dog.arrivalTime);
                  const isAlert = waitMinutes >= 20;

                  return (
                    <div
                      key={dog.id}
                      className={`flex flex-col p-4 rounded-2xl border transition-all duration-300 gap-3 ${
                        isAlert
                          ? 'bg-rose-50/70 border-rose-300 animate-pulse-rose shadow-sm shadow-rose-50'
                          : 'bg-slate-50/50 border-slate-150'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-slate-855 text-base">{dog.dogName}</span>
                            <span className="text-xs font-bold bg-indigo-50 text-indigo-700 py-0.5 px-2 rounded-lg border border-indigo-100">
                              {dog.breed}
                            </span>
                            {isAlert && (
                              <span className="flex items-center gap-1 bg-rose-100 border border-rose-250 text-rose-800 text-[10px] font-black py-0.5 px-2 rounded-md animate-pulse">
                                <AlertCircle className="w-3 h-3" />
                                <span>המתנה חריגה! ({waitMinutes} דק')</span>
                              </span>
                            )}
                          </div>
                          
                          <div className="text-xs text-slate-500 mt-1 font-medium space-x-2 space-x-reverse">
                            <span>בעלים: {dog.ownerName || 'לא צוין'}</span>
                            <span>•</span>
                            <span className="font-mono">{dog.phone || 'אין טלפון'}</span>
                            <span>•</span>
                            <span className="font-mono text-slate-450">הגעה: {formatTimeOfDay(dog.arrivalTime)}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 justify-end shrink-0">
                          {dog.phone && (
                            <a
                              href={getWhatsAppUrl(dog.phone, dog.ownerName || 'לקוח יקר', dog.dogName)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-emerald-500 hover:bg-emerald-600 text-white p-2.5 rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center cursor-pointer"
                              title="שלח הודעת וואטסאפ ללקוח"
                            >
                              <WhatsAppIcon />
                            </a>
                          )}
                          <button
                            onClick={() => onStartTreatment(dog.id)}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-md shadow-purple-100 flex items-center gap-1.5"
                          >
                            <Scissors className="w-3.5 h-3.5 rotate-45" />
                            <span>הכנס לטיפול (לטלוויזיה)</span>
                          </button>
                        </div>
                      </div>

                      {dog.notes && (
                        <div className="text-xs text-indigo-900 bg-indigo-50/50 border border-indigo-100/50 rounded-xl py-2 px-3 flex items-start gap-1.5 mt-0.5">
                          <FileText className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold">הערות לטיפול:</span> {dog.notes}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Active Treatments */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-md">
            <h2 className="text-lg font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span>טיפולים פעילים על מסך הטלוויזיה ({activeDogs.length})</span>
              </span>
              <span className="text-xs font-semibold text-slate-400">לוח ציבורי פעיל</span>
            </h2>

            {activeDogs.length === 0 ? (
              <p className="text-slate-400 text-sm italic py-8 text-center">אין כלבים בטיפול כרגע</p>
            ) : (
              <div className="divide-y divide-slate-100 overflow-y-auto max-h-80 pr-1 space-y-3.5">
                {activeDogs.map((dog) => {
                  return (
                    <div
                      key={dog.id}
                      className="flex flex-col p-4 bg-slate-50/50 border border-slate-150 rounded-2xl gap-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-slate-855 text-base">{dog.dogName}</span>
                            <span className="text-xs font-bold bg-indigo-50 text-indigo-700 py-0.5 px-2 rounded-lg border border-indigo-100">
                              {dog.breed}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 mt-1 font-medium space-x-2 space-x-reverse">
                            <span>בעלים: {dog.ownerName || 'לא צוין'}</span>
                            <span>•</span>
                            <span className="font-mono">{dog.phone || 'אין טלפון'}</span>
                            <span>•</span>
                            <span className="font-mono text-slate-450">התחלה: {formatTimeOfDay(dog.startTime)}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 justify-end shrink-0">
                          <div className="text-left font-mono font-bold text-slate-700 bg-slate-200/60 px-3 py-1 rounded-lg border border-slate-250 text-xs">
                            {formatActiveTime(dog.startTime)}
                          </div>

                          {dog.phone && (
                            <a
                              href={getWhatsAppUrl(dog.phone, dog.ownerName || 'לקוח יקר', dog.dogName)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-emerald-500 hover:bg-emerald-600 text-white p-2.5 rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center cursor-pointer"
                              title="שלח וואטסאפ: הכלב מוכן לאיסוף! 🐶"
                            >
                              <WhatsAppIcon />
                            </a>
                          )}

                          <button
                            onClick={() => onFinishTreatment(dog.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-md shadow-emerald-50"
                          >
                            סיום תספורת 🏁
                          </button>
                        </div>
                      </div>

                      {dog.notes && (
                        <div className="text-xs text-indigo-900 bg-indigo-50/50 border border-indigo-100/50 rounded-xl py-2 px-3 flex items-start gap-1.5 mt-0.5">
                          <FileText className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold">הערות לטיפול:</span> {dog.notes}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* FULL-WIDTH COLUMN: HISTORY TABLE */}
      <div className="grid grid-span-12 mt-8 z-10">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-md">
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between border-b border-slate-100 pb-4 mb-6 gap-4">
            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-650" />
              <span>ארכיון טיפולים והיסטוריית תספורות מלאה ({filteredHistory.length})</span>
            </h2>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="חיפוש חופשי / הערה..."
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white w-48 font-medium transition-all"
                />
                <Search className="absolute right-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
              </div>

              <div className="relative flex items-center">
                <select
                  value={historyBreedFilter}
                  onChange={(e) => setHistoryBreedFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 font-bold focus:outline-none focus:border-indigo-500 transition-all cursor-pointer"
                >
                  <option value="">כל הגזעים ({uniqueBreedsInHistory.length})</option>
                  {uniqueBreedsInHistory.map((breed) => (
                    <option key={breed} value={breed}>{breed}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1">
                <span className="text-[10px] font-bold text-slate-450">סינון תאריך:</span>
                <input
                  type="date"
                  value={historyDateFilter}
                  onChange={(e) => setHistoryDateFilter(e.target.value)}
                  className="text-xs text-slate-700 bg-transparent border-0 focus:outline-none font-sans font-bold cursor-pointer"
                />
                {historyDateFilter && (
                  <button
                    onClick={() => setHistoryDateFilter('')}
                    className="text-xs text-red-500 hover:text-red-700 font-black cursor-pointer px-1"
                    title="נקה תאריך"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>

          {filteredHistory.length === 0 ? (
            <div className="text-center py-10 text-slate-400 italic text-sm">
              {history.length === 0 ? 'ארכיון הטיפולים ריק כרגע.' : 'לא נמצאו טיפולים התואמים את מסנני החיפוש.'}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full text-right border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-550 font-black">
                    <th className="p-4">שם הכלב</th>
                    <th className="p-4">גזע</th>
                    <th className="p-4">שם הבעלים</th>
                    <th className="p-4 text-left">מספר טלפון</th>
                    <th className="p-4">תאריך</th>
                    <th className="p-4">שעות טיפול</th>
                    <th className="p-4">משך עבודה</th>
                    <th className="p-4">הערות לטיפול</th>
                    <th className="p-4 text-center">פעולות</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-bold text-slate-900">{item.dogName}</td>
                      <td className="p-4">
                        <span className="bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded border border-indigo-100">
                          {item.breed}
                        </span>
                      </td>
                      <td className="p-4">{item.ownerName || 'לא צוין'}</td>
                      <td className="p-4 text-left font-mono">{item.phone || 'אין'}</td>
                      <td className="p-4">{formatDate(item.endTime)}</td>
                      <td className="p-4 font-mono text-slate-500">
                        {formatTimeOfDay(item.startTime)} - {formatTimeOfDay(item.endTime)}
                      </td>
                      <td className="p-4 text-indigo-650 font-bold">{formatDuration(item.durationSeconds)}</td>
                      <td className="p-4 max-w-[220px] truncate text-slate-550 font-semibold italic" title={item.notes}>
                        {item.notes || '-'}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          {item.phone && (
                            <a
                              href={getWhatsAppUrl(item.phone, item.ownerName || 'לקוח יקר', item.dogName)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-emerald-500 hover:bg-emerald-600 text-white p-1.5 rounded-lg transition-all shadow-xs hover:shadow flex items-center justify-center cursor-pointer"
                              title="שלח הודעת וואטסאפ חוזרת"
                            >
                              <WhatsAppIcon />
                            </a>
                          )}
                          <button
                            onClick={() => onDeleteHistoryItem(item.id)}
                            className="text-slate-400 hover:text-red-650 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                            title="מחק לצמיתות מהארכיון"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-slate-200/60 flex justify-between text-slate-400 text-xs font-semibold">
        <div>JOY 🐶 POLA • אבן גבירול 163, תל אביב</div>
        <div>מחובר למאגר מקומי (LocalStorage)</div>
      </footer>
    </div>
  );
}
