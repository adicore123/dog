import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Smile, Scissors, Plus, Bone, Trash2, ArrowLeft, AlertCircle, Sparkles, Search, Check, FileText, Volume2, Settings, Edit2, Lock, Eye } from 'lucide-react';

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

const PALETTES_PREVIEW = [
  { id: 'cream_classic', name: 'שמנת קלאסית 🐶 (JOY & POLA)', color1: '#faf9f2', color2: '#1e3a8a', color3: '#f59e0b' },
  { id: 'sunset_pink', name: 'ורוד שקיעה תל אביבית 🌸', color1: '#fff5f6', color2: '#e11d48', color3: '#8b5cf6' },
  { id: 'pistachio_chic', name: 'פיסטוק ורוד שיק 🌿', color1: '#f4f7f0', color2: '#065f46', color3: '#ec4899' },
  { id: 'lavender_dreams', name: 'לבנדר חלומות 🍇', color1: '#f7f4fc', color2: '#6d28d9', color3: '#14b8a6' },
  { id: 'vibrant_coral', name: 'קורל תפוז תוסס 🍊', color1: '#fffbf7', color2: '#ea580c', color3: '#eab308' },
  { id: 'neon_night', name: 'לילה תל אביבי 🌃 (כהה)', color1: '#090d16', color2: '#d946ef', color3: '#fbbf24' },
  { id: 'forest_dark', name: 'פיסטוק יער כהה 🌲 (כהה)', color1: '#070c09', color2: '#10b981', color3: '#fb7185' }
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

export default function AdminDashboard({
  dogs,
  history,
  palette,
  tvSoundEnabled,
  businessAddress,
  logoUrl,
  whatsappTemplate,
  onPaletteChange,
  onTvSoundToggle,
  onBusinessAddressChange,
  onLogoUrlChange,
  onWhatsappTemplateChange,
  onRegisterDog,
  onStartTreatment,
  onFinishTreatment,
  onUpdateDog,
  onDeleteDog,
  onDeleteHistoryItem,
  onLoadDemo,
  onClearAll,
  onTriggerSound,
  navigate
}) {
  const [dogName, setDogName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  
  const [breedInput, setBreedInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Card editing & deleting states
  const [editingDog, setEditingDog] = useState(null);
  const [deletingDogId, setDeletingDogId] = useState(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');

  // 15-Minute waiting alert states
  const [acknowledged15MinAlerts, setAcknowledged15MinAlerts] = useState([]);
  const [active15MinAlertDog, setActive15MinAlertDog] = useState(null);
  
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

  const [alertThresholdMinutes, setAlertThresholdMinutes] = useState(() => {
    const saved = localStorage.getItem('grooming_alert_threshold');
    return saved ? parseInt(saved, 10) : 15;
  });

  const handleAlertThresholdChange = (minutes) => {
    setAlertThresholdMinutes(minutes);
    localStorage.setItem('grooming_alert_threshold', String(minutes));
    // Reset so the alert fires again against new threshold
    setAcknowledged15MinAlerts([]);
    setActive15MinAlertDog(null);
  };

  const [historySearch, setHistorySearch] = useState('');
  const [historyBreedFilter, setHistoryBreedFilter] = useState('');
  const [historyDateFilter, setHistoryDateFilter] = useState('');

  const [playedWaitingAlerts, setPlayedWaitingAlerts] = useState([]);
  const [playedActiveAlerts, setPlayedActiveAlerts] = useState([]);

  // Tick state triggers every 1 second for live clock & stopwatch updates
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 15-Minute waiting queue blocking alert — runs every tick, independent of sound state
  useEffect(() => {
    const now = Date.now();

    // If an alert is already active, verify the dog is still in the waiting queue
    if (active15MinAlertDog) {
      const stillWaiting = dogs.find(d => d.id === active15MinAlertDog.id && d.status === 'waiting');
      if (!stillWaiting) {
        setActive15MinAlertDog(null);
      }
      return; // keep showing this alert until dismissed
    }
    
    // Check if any dog has been waiting in the lobby for configured minutes
    const alertDog = dogs.find(
      (dog) =>
        dog.status === 'waiting' &&
        (now - dog.arrivalTime) >= alertThresholdMinutes * 60 * 1000 &&
        !acknowledged15MinAlerts.includes(dog.id)
    );

    if (alertDog) {
      setActive15MinAlertDog(alertDog);
      onTriggerSound(selectedSound);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dogs, tick, acknowledged15MinAlerts, alertThresholdMinutes]);

  // Warning badge sounds (20-min waiting + 90-min active) — separate effect to avoid conflicts
  useEffect(() => {
    const now = Date.now();

    // Waiting warning badges threshold (20 mins)
    const waitingAlertIds = dogs
      .filter((dog) => dog.status === 'waiting' && (now - dog.arrivalTime) >= 20 * 60 * 1000)
      .map((dog) => dog.id);
      
    // Active treatment warning badges (90 mins)
    const activeAlertIds = dogs
      .filter((dog) => dog.status === 'active' && dog.startTime && (now - dog.startTime) >= 90 * 60 * 1000)
      .map((dog) => dog.id);

    let chimePlayed = false;

    const newWaitingAlerts = waitingAlertIds.filter(id => !playedWaitingAlerts.includes(id));
    if (newWaitingAlerts.length > 0 && !active15MinAlertDog) {
      onTriggerSound(selectedSound);
      chimePlayed = true;
    }

    const newActiveAlerts = activeAlertIds.filter(id => !playedActiveAlerts.includes(id));
    if (newActiveAlerts.length > 0 && !chimePlayed && !active15MinAlertDog) {
      onTriggerSound(selectedSound);
    }

    setPlayedWaitingAlerts(waitingAlertIds);
    setPlayedActiveAlerts(activeAlertIds);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dogs, tick]);

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
    setIsFormOpen(false);
  };

  const handleSelectBreed = (selected) => {
    setBreedInput(selected);
    setIsDropdownOpen(false);
  };

  const handleSoundChange = (e) => {
    const soundId = e.target.value;
    setSelectedSound(soundId);
    localStorage.setItem('grooming_selected_sound', soundId);
    onTriggerSound(soundId);
  };

  const getWhatsAppUrl = (phoneNum, ownerName, dogName) => {
    let cleanPhone = phoneNum.replace(/\D/g, '');
    if (cleanPhone.startsWith('05')) {
      cleanPhone = '972' + cleanPhone.slice(1);
    }
    
    // Dynamic replacement in WhatsApp template
    let message = whatsappTemplate
      .replace(/{owner}/g, ownerName || 'לקוח יקר')
      .replace(/{dog}/g, dogName);

    return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
  };

  // Generate tracking link and send via WhatsApp
  const handleSendTrackingLink = (dog) => {
    if (!dog.phone) return;
    
    // Generate live status tracker URL using current origin
    const trackingLink = `${window.location.origin}/status?id=${dog.id}`;
    
    let cleanPhone = dog.phone.replace(/\D/g, '');
    if (cleanPhone.startsWith('05')) {
      cleanPhone = '972' + cleanPhone.slice(1);
    }
    
    const message = `שלום ${dog.ownerName || 'לקוח יקר'}, כאן מספרת JOY & POLA! תוכל לעקוב אחר קצב הטיפול והזמן הנותר של ${dog.dogName} בלייב בקישור הבא: ${trackingLink} 🐾`;
    
    window.open(`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`, '_blank');
  };

  // Compressed Image Upload Reader (Base64 Canvas Optimization to fit LocalStorage)
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const MAX_DIM = 256;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Compress image data to JPEG format with 0.7 quality factor to keep Base64 small
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        onLogoUrlChange(compressedDataUrl);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Confirm and authorize card deletion with password
  const handleConfirmDelete = () => {
    if (deletePassword === '123123') {
      onDeleteDog(deletingDogId);
      setDeletingDogId(null);
      setDeletePassword('');
      setDeleteError('');
    } else {
      setDeleteError('סיסמה שגויה! המחיקה נחסמה.');
    }
  };

  // Acknowledge the 15-minute lobby waiting warning modal
  const handleAcknowledgeAlert = () => {
    if (active15MinAlertDog) {
      setAcknowledged15MinAlerts((prev) => [...prev, active15MinAlertDog.id]);
      setActive15MinAlertDog(null);
    }
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
    <div className={`min-h-screen bg-gradient-to-br ${palette.bgClass} p-6 md:p-10 select-none text-right flex flex-col font-sans`} dir="rtl">
      
      {/* Header */}
      <header className={`flex flex-col md:flex-row items-start md:items-center justify-between border-b ${palette.borderCol} pb-6 mb-8 gap-4`}>
        <div className="flex items-center gap-4">
          <div className="bg-white p-1 rounded-2xl shadow-md border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
            <img 
              src={logoUrl || "/logo.jpg"} 
              className="h-14 w-auto object-contain" 
              alt="Joy & Pola Logo" 
              onError={(e) => {
                e.target.src = "/logo.jpg";
              }}
            />
          </div>
          <div>
            <h1 className={`text-2xl font-black tracking-tight leading-none flex items-center gap-2 ${palette.primaryText}`}>
              <span>ממשק ניהול - JOY 🐶 POLA</span>
              <Bone className={`w-5 h-5 rotate-12 ${palette.accentText}`} />
            </h1>
            <p className={`${palette.isDark ? 'text-slate-350' : 'text-slate-655'} text-xs font-bold mt-1.5`}>
              {businessAddress || 'אבן גבירול 163, תל אביב'} • ניהול תורים, צלילי התראה חזקים ומעוצבים (שעון מעורר) וחריגות זמן
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Settings Trigger Button */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className={`${palette.isDark ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'} flex items-center gap-1.5 py-2.5 px-4 rounded-xl border shadow-xs transition-all cursor-pointer text-xs font-bold`}
            title="פתר פאנל הגדרות מערכת וצבעים"
          >
            <Settings className="w-4 h-4 ml-1 text-slate-500" />
            <span>הגדרות ⚙️</span>
          </button>

          {/* Sound Selector Dropdown */}
          <div className={`flex items-center gap-1.5 border rounded-xl px-3 py-1.5 shadow-xs ${palette.isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <Volume2 className="w-4 h-4 text-purple-600" />
            <label className="text-[10px] font-bold text-slate-500">צליל מעורר:</label>
            <select
              value={selectedSound}
              onChange={handleSoundChange}
              className={`text-xs font-bold bg-transparent border-0 focus:outline-none cursor-pointer pr-1 ${palette.isDark ? 'text-slate-300' : 'text-slate-700'}`}
            >
              {SOUND_PRESETS.map((preset) => (
                <option key={preset.id} value={preset.id} className={palette.isDark ? 'bg-slate-950 text-slate-300' : 'bg-white text-slate-750'}>
                  {preset.name}
                </option>
              ))}
            </select>
          </div>

          {/* Test Sound Button */}
          <button
            onClick={() => onTriggerSound(selectedSound)}
            className={`${palette.isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-655 hover:bg-slate-100'} flex items-center gap-1.5 py-2.5 px-4 rounded-xl border shadow-xs transition-all cursor-pointer text-xs font-bold`}
            title="השמע בדיקה לצליל שבחרת"
          >
            <span>השמע בדיקה 🔊</span>
          </button>

          <button
            onClick={() => navigate('/')}
            className={`${palette.isDark ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'} flex items-center gap-1.5 py-2.5 px-4 rounded-xl border shadow-sm transition-all cursor-pointer text-xs font-bold`}
          >
            <ArrowLeft className="w-4 h-4 ml-1.5" />
            <span>מעבר למסך ציבורי (טלוויזיה)</span>
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* RIGHT COLUMN: REGISTRATION & DEMO ACTIONS (4 cols) */}
        <div className="xl:col-span-4 space-y-6">
          
          {/* Register Card — collapsible */}
          <div className={`rounded-3xl border shadow-md overflow-hidden transition-all ${palette.isDark ? 'bg-slate-900/80 border-slate-850 text-slate-100' : 'bg-white border-slate-200/80 text-slate-800'}`}>
            {/* Toggle Header */}
            <button
              type="button"
              onClick={() => setIsFormOpen((v) => !v)}
              className={`w-full flex items-center justify-between px-6 py-4 transition-colors cursor-pointer ${
                isFormOpen
                  ? palette.isDark ? 'bg-purple-900/40' : 'bg-purple-50'
                  : palette.isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2 font-black text-base">
                <Plus className={`w-5 h-5 transition-transform duration-300 ${isFormOpen ? 'rotate-45 text-rose-400' : 'text-purple-500'}`} />
                <span>{isFormOpen ? 'סגור טופס' : 'הוסף כלב חדש'}</span>
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full transition-colors ${
                isFormOpen
                  ? 'bg-rose-100 text-rose-600'
                  : palette.isDark ? 'bg-purple-900/60 text-purple-300' : 'bg-purple-100 text-purple-600'
              }`}>
                {isFormOpen ? 'ביטול' : '+ רישום'}
              </span>
            </button>

            {/* Collapsible Form */}
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isFormOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="px-6 pb-6 pt-4 border-t border-slate-100/10">
            <h2 className="text-sm font-black pb-3 mb-4 flex items-center gap-2 text-slate-500">
              <span>פרטי הכלב והבעלים</span>
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
                  className={`w-full border rounded-xl px-4 py-2.5 placeholder-slate-400 focus:outline-none focus:border-purple-500 font-medium transition-all text-sm ${
                    palette.isDark
                      ? 'bg-slate-800/60 border-slate-750 text-slate-100 focus:bg-slate-800'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">שם הבעלים</label>
                <input
                  type="text"
                  placeholder="שם הבעלים..."
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className={`w-full border rounded-xl px-4 py-2.5 placeholder-slate-400 focus:outline-none focus:border-purple-500 font-medium transition-all text-sm ${
                    palette.isDark
                      ? 'bg-slate-800/60 border-slate-750 text-slate-100 focus:bg-slate-800'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">מספר טלפון</label>
                <input
                  type="tel"
                  placeholder="לדוגמה: 052-1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full border rounded-xl px-4 py-2.5 placeholder-slate-400 focus:outline-none focus:border-purple-500 font-mono font-medium transition-all text-sm text-left ${
                    palette.isDark
                      ? 'bg-slate-800/60 border-slate-750 text-slate-100 focus:bg-slate-800'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white'
                  }`}
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
                      className={`w-full border rounded-xl pr-4 pl-10 py-2.5 placeholder-slate-400 focus:outline-none focus:border-purple-500 font-medium transition-all text-sm ${
                        palette.isDark
                          ? 'bg-slate-800/60 border-slate-750 text-slate-100 focus:bg-slate-800'
                          : 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white'
                      }`}
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
                        ? `${palette.primaryBg} text-white cursor-pointer shadow-md`
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
                    <ul className={`absolute z-20 w-full mt-1.5 border rounded-xl shadow-xl max-h-52 overflow-y-auto divide-y ${palette.isDark ? 'bg-slate-900 border-slate-800 divide-slate-800' : 'bg-white border-slate-200 divide-slate-50'}`}>
                      {filteredBreeds.length === 0 ? (
                        <li className="p-3 text-xs text-slate-455 italic">
                          אין גזע תואם. הקלד גזע מותאם אישית...
                        </li>
                      ) : (
                        filteredBreeds.map((breed) => (
                          <li
                            key={breed}
                            onClick={() => handleSelectBreed(breed)}
                            className={`p-3 text-sm cursor-pointer flex items-center justify-between transition-colors ${palette.isDark ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-700 hover:bg-purple-50 hover:text-purple-700'}`}
                          >
                            <span>{breed}</span>
                            {breedInput === breed && <Check className="w-4 h-4 text-purple-650" />}
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
                  className={`w-full border rounded-xl px-4 py-2.5 placeholder-slate-400 focus:outline-none focus:border-purple-500 font-medium transition-all text-sm resize-none ${
                    palette.isDark
                      ? 'bg-slate-800/60 border-slate-750 text-slate-100 focus:bg-slate-800'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white'
                  }`}
                />
              </div>

              <button
                type="submit"
                className={`w-full ${palette.primaryBg} text-white font-bold py-3.5 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-sm mt-6`}
              >
                <Plus className="w-4 h-4" />
                <span>רשום והמתן לתספורת</span>
              </button>
            </form>
              </div>
            </div>
          </div>

          {/* Demo Actions */}
          <div className={`rounded-3xl border p-6 shadow-md ${palette.isDark ? 'bg-slate-900/80 border-slate-855 text-slate-100' : 'bg-white border-slate-200/80 text-slate-800'}`}>
            <h2 className="text-sm font-black border-b border-slate-100/10 pb-2 flex items-center gap-1.5 mb-3">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>סימולציות דמו מהירות לטלוויזיה ולתור</span>
            </h2>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  setAcknowledged15MinAlerts([]);
                  setActive15MinAlertDog(null);
                  setPlayedWaitingAlerts([]);
                  setPlayedActiveAlerts([]);
                  onLoadDemo();
                }}
                className="bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 p-2.5 rounded-lg font-bold transition-all cursor-pointer text-center"
              >
                טען סימולציה מלאה
              </button>
              <button
                onClick={() => {
                  setAcknowledged15MinAlerts([]);
                  setActive15MinAlertDog(null);
                  setPlayedWaitingAlerts([]);
                  setPlayedActiveAlerts([]);
                  onClearAll();
                }}
                className="bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 p-2.5 rounded-lg font-bold transition-all cursor-pointer text-center"
              >
                נקה את כל הנתונים
              </button>
            </div>
          </div>
        </div>

        {/* LEFT COLUMN: QUEUES (8 cols) */}
        <div className="xl:col-span-8 space-y-6">
          
          {/* Waiting Queue */}
          <div className={`rounded-3xl border p-6 shadow-md ${palette.isDark ? 'bg-slate-900/80 border-slate-855 text-slate-100' : 'bg-white border-slate-200/80 text-slate-800'}`}>
            <h2 className="text-lg font-black border-b border-slate-100/10 pb-3 mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>תור הממתינים לתספורת ({waitingDogs.length})</span>
              </span>
              <span className="text-xs font-semibold text-slate-400">לובי המתנה</span>
            </h2>

            {waitingDogs.length === 0 ? (
              <p className="text-slate-400 text-sm italic py-8 text-center">אין כלבים ממתינים כרגע</p>
            ) : (
              <div className="divide-y divide-slate-150/10 overflow-y-auto max-h-72 pr-1 space-y-3.5">
                {waitingDogs.map((dog) => {
                  const waitMinutes = getWaitingTimeMinutes(dog.arrivalTime);
                  const isAlert = waitMinutes >= 20;

                  return (
                    <div
                      key={dog.id}
                      className={`flex flex-col p-4 rounded-2xl border transition-all duration-300 gap-3 ${
                        isAlert
                          ? 'bg-rose-500/10 border-rose-500/30 shadow-xs'
                          : palette.isDark
                          ? 'bg-slate-950/60 border-slate-850'
                          : 'bg-slate-50/50 border-slate-150'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-base">{dog.dogName}</span>
                            <span className={`text-xs font-bold py-0.5 px-2 rounded-lg border ${palette.isDark ? 'bg-indigo-950/50 border-indigo-900/60 text-indigo-300' : 'bg-indigo-50 border-indigo-100 text-indigo-700'}`}>
                              {dog.breed}
                            </span>
                            {isAlert && (
                              <span className="flex items-center gap-1 bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[10px] font-black py-0.5 px-2 rounded-md animate-pulse">
                                <AlertCircle className="w-3 h-3" />
                                <span>המתנה חריגה! ({waitMinutes} דק')</span>
                              </span>
                            )}
                          </div>
                          
                          <div className={`text-xs mt-1 font-medium space-x-2 space-x-reverse ${palette.isDark ? 'text-slate-400' : 'text-slate-550'}`}>
                            <span>בעלים: {dog.ownerName || 'לא צוין'}</span>
                            <span>•</span>
                            <span className="font-mono">{dog.phone || 'אין טלפון'}</span>
                            <span>•</span>
                            <span className="font-mono text-slate-450">הגעה: {formatTimeOfDay(dog.arrivalTime)} ({waitMinutes} דק' במספרה)</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 justify-end shrink-0">
                          {/* Edit button */}
                          <button
                            onClick={() => setEditingDog(dog)}
                            className={`p-2 rounded-xl transition-all cursor-pointer ${palette.isDark ? 'text-slate-450 hover:text-indigo-400 hover:bg-slate-800' : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-100'}`}
                            title="ערוך פרטי כלב"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          {/* Delete button (Requires admin password) */}
                          <button
                            onClick={() => setDeletingDogId(dog.id)}
                            className={`p-2 rounded-xl transition-all cursor-pointer ${palette.isDark ? 'text-slate-455 hover:text-red-400 hover:bg-slate-800' : 'text-slate-400 hover:text-red-655 hover:bg-red-50'}`}
                            title="מחק כרטיס (דורש סיסמה)"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          {dog.phone && (
                            /* Send tracking link button */
                            <button
                              onClick={() => handleSendTrackingLink(dog)}
                              className={`p-2.5 rounded-xl border transition-all shadow-xs flex items-center justify-center cursor-pointer gap-1 text-xs font-bold ${
                                palette.isDark
                                  ? 'bg-slate-900 border-slate-800 text-indigo-400 hover:bg-slate-800'
                                  : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
                              }`}
                              title="שלח קישור מעקב לייב ללקוח"
                            >
                              <Eye className="w-4 h-4" />
                              <span>מעקב</span>
                            </button>
                          )}

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
                            className={`text-white font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 ${palette.primaryBg}`}
                          >
                            <Scissors className="w-3.5 h-3.5 rotate-45" />
                            <span>הכנס לטיפול (לטלוויזיה)</span>
                          </button>
                        </div>
                      </div>

                      {dog.notes && (
                        <div className={`text-xs rounded-xl py-2 px-3 flex items-start gap-1.5 mt-0.5 border ${
                          palette.isDark 
                            ? 'bg-slate-950/80 border-slate-850 text-indigo-200' 
                            : 'bg-indigo-50/50 border-indigo-100/50 text-indigo-950'
                        }`}>
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
          <div className={`rounded-3xl border p-6 shadow-md ${palette.isDark ? 'bg-slate-900/80 border-slate-855 text-slate-100' : 'bg-white border-slate-200/80 text-slate-800'}`}>
            <h2 className="text-lg font-black border-b border-slate-100/10 pb-3 mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span>טיפולים פעילים על מסך הטלוויזיה ({activeDogs.length})</span>
              </span>
              <span className="text-xs font-semibold text-slate-400">לוח ציבורי פעיל</span>
            </h2>

            {activeDogs.length === 0 ? (
              <p className="text-slate-400 text-sm italic py-8 text-center">אין כלבים בטיפול כרגע</p>
            ) : (
              <div className="divide-y divide-slate-150/10 overflow-y-auto max-h-80 pr-1 space-y-3.5">
                {activeDogs.map((dog) => {
                  const totalGroomingMinutes = getWaitingTimeMinutes(dog.arrivalTime);
                  return (
                    <div
                      key={dog.id}
                      className={`flex flex-col p-4 border rounded-2xl gap-3 ${
                        palette.isDark ? 'bg-slate-950/60 border-slate-855' : 'bg-slate-50/50 border-slate-150'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-base">{dog.dogName}</span>
                            <span className={`text-xs font-bold py-0.5 px-2 rounded-lg border ${palette.isDark ? 'bg-indigo-950/50 border-indigo-900/60 text-indigo-300' : 'bg-indigo-50 border-indigo-100 text-indigo-700'}`}>
                              {dog.breed}
                            </span>
                          </div>
                          <div className={`text-xs mt-1 font-medium space-x-2 space-x-reverse ${palette.isDark ? 'text-slate-400' : 'text-slate-550'}`}>
                            <span>בעלים: {dog.ownerName || 'לא צוין'}</span>
                            <span>•</span>
                            <span className="font-mono">{dog.phone || 'אין טלפון'}</span>
                            <span>•</span>
                            <span className="font-mono text-slate-450">התחלה: {formatTimeOfDay(dog.startTime)} (סך הכל במספרה: {totalGroomingMinutes} דק')</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 justify-end shrink-0 text-left">
                          <div className={`font-mono font-bold px-3 py-2.5 rounded-lg border text-xs ${
                            palette.isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-200/60 border-slate-250 text-slate-700'
                          }`}>
                            {formatActiveTime(dog.startTime)}
                          </div>

                          {/* Edit button */}
                          <button
                            onClick={() => setEditingDog(dog)}
                            className={`p-2 rounded-xl transition-all cursor-pointer ${palette.isDark ? 'text-slate-450 hover:text-indigo-455 hover:bg-slate-800' : 'text-slate-400 hover:text-indigo-655 hover:bg-slate-100'}`}
                            title="ערוך פרטי כלב"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          {/* Delete button (Requires admin password) */}
                          <button
                            onClick={() => setDeletingDogId(dog.id)}
                            className={`p-2 rounded-xl transition-all cursor-pointer ${palette.isDark ? 'text-slate-455 hover:text-red-455 hover:bg-slate-800' : 'text-slate-400 hover:text-red-655 hover:bg-red-50'}`}
                            title="מחק כרטיס (דורש סיסמה)"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          {dog.phone && (
                            /* Send tracking link button */
                            <button
                              onClick={() => handleSendTrackingLink(dog)}
                              className={`p-2.5 rounded-xl border transition-all shadow-xs flex items-center justify-center cursor-pointer gap-1 text-xs font-bold ${
                                palette.isDark
                                  ? 'bg-slate-900 border-slate-800 text-indigo-400 hover:bg-slate-800'
                                  : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
                              }`}
                              title="שלח קישור מעקב לייב ללקוח"
                            >
                              <Eye className="w-4 h-4" />
                              <span>מעקב</span>
                            </button>
                          )}

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
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-md shadow-emerald-55"
                          >
                            סיום תספורת 🏁
                          </button>
                        </div>
                      </div>

                      {dog.notes && (
                        <div className={`text-xs rounded-xl py-2 px-3 flex items-start gap-1.5 mt-0.5 border ${
                          palette.isDark 
                            ? 'bg-slate-950/80 border-slate-855 text-indigo-200' 
                            : 'bg-indigo-50/50 border-indigo-100/50 text-indigo-950'
                        }`}>
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
        <div className={`rounded-3xl border p-6 shadow-md ${palette.isDark ? 'bg-slate-900/80 border-slate-855 text-slate-100' : 'bg-white border-slate-200/80 text-slate-800'}`}>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between border-b border-slate-150/15 pb-4 mb-6 gap-4">
            <h2 className="text-lg font-black flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-500" />
              <span>ארכיון טיפולים והיסטוריית תספורות מלאה ({filteredHistory.length})</span>
            </h2>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="חיפוש חופשי / הערה..."
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  className={`border rounded-xl pr-9 pl-3 py-1.5 text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500 w-48 font-medium transition-all ${
                    palette.isDark
                      ? 'bg-slate-800/80 border-slate-750 text-slate-100'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
                <Search className="absolute right-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
              </div>

              <div className="relative flex items-center">
                <select
                  value={historyBreedFilter}
                  onChange={(e) => setHistoryBreedFilter(e.target.value)}
                  className={`border rounded-xl px-2.5 py-1.5 text-xs font-bold focus:outline-none focus:border-indigo-500 transition-all cursor-pointer ${
                    palette.isDark
                      ? 'bg-slate-800 border-slate-750 text-slate-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <option value="" className={palette.isDark ? 'bg-slate-900 text-slate-300' : 'bg-white text-slate-700'}>כל הגזעים ({uniqueBreedsInHistory.length})</option>
                  {uniqueBreedsInHistory.map((breed) => (
                    <option key={breed} value={breed} className={palette.isDark ? 'bg-slate-900 text-slate-300' : 'bg-white text-slate-700'}>{breed}</option>
                  ))}
                </select>
              </div>

              <div className={`flex items-center gap-1.5 border rounded-xl px-2 py-1 ${palette.isDark ? 'bg-slate-800 border-slate-750' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[10px] font-bold text-slate-455">סינון תאריך:</span>
                <input
                  type="date"
                  value={historyDateFilter}
                  onChange={(e) => setHistoryDateFilter(e.target.value)}
                  className={`text-xs bg-transparent border-0 focus:outline-none font-sans font-bold cursor-pointer ${palette.isDark ? 'text-slate-300' : 'text-slate-700'}`}
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
            <div className="text-center py-10 text-slate-450 italic text-sm">
              {history.length === 0 ? 'ארכיון הטיפולים ריק כרגע.' : 'לא נמצאו טיפולים התואמים את מסנני החיפוש.'}
            </div>
          ) : (
            <div className={`overflow-x-auto rounded-xl border ${palette.isDark ? 'border-slate-850' : 'border-slate-100'}`}>
              <table className="w-full text-right border-collapse text-xs">
                <thead>
                  <tr className={`border-b font-black ${palette.isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-550'}`}>
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
                <tbody className={`divide-y font-medium ${palette.isDark ? 'divide-slate-855 text-slate-350' : 'divide-slate-100 text-slate-700'}`}>
                  {filteredHistory.map((item) => (
                    <tr key={item.id} className={`transition-colors ${palette.isDark ? 'hover:bg-slate-950/40' : 'hover:bg-slate-50/50'}`}>
                      <td className={`p-4 font-bold ${palette.isDark ? 'text-slate-100' : 'text-slate-900'}`}>{item.dogName}</td>
                      <td className="p-4">
                        <span className={`font-bold px-2 py-0.5 rounded border ${palette.isDark ? 'bg-indigo-950/40 border-indigo-900 text-indigo-300' : 'bg-indigo-50 border-indigo-100 text-indigo-700'}`}>
                          {item.breed}
                        </span>
                      </td>
                      <td className="p-4">{item.ownerName || 'לא צוין'}</td>
                      <td className="p-4 text-left font-mono">{item.phone || 'אין'}</td>
                      <td className="p-4">{formatDate(item.endTime)}</td>
                      <td className="p-4 font-mono text-slate-450">
                        {formatTimeOfDay(item.startTime)} - {formatTimeOfDay(item.endTime)}
                      </td>
                      <td className="p-4 text-indigo-500 font-bold">{formatDuration(item.durationSeconds)}</td>
                      <td className={`p-4 max-w-[220px] truncate font-semibold italic ${palette.isDark ? 'text-slate-400' : 'text-slate-550'}`} title={item.notes}>
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
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              palette.isDark ? 'text-slate-500 hover:text-red-400 hover:bg-slate-800' : 'text-slate-400 hover:text-red-655 hover:bg-red-50'
                            }`}
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

      {/* Settings Modal (Popup) */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4" dir="rtl" onClick={() => setIsSettingsOpen(false)}>
          <div 
            className={`rounded-3xl border max-w-lg w-full p-6 shadow-2xl space-y-5 animate-fade-in text-right max-h-[95vh] overflow-y-auto ${
              palette.isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100/10 pb-3">
              <h2 className="text-lg font-black flex items-center gap-1.5">
                <Settings className="w-5 h-5 text-slate-500" />
                <span>הגדרות המערכת והטלוויזיה</span>
              </h2>
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className={`text-xl font-bold p-1 cursor-pointer ${palette.isDark ? 'text-slate-455 hover:text-slate-255' : 'text-slate-400 hover:text-slate-850'}`}
              >
                ×
              </button>
            </div>

            {/* TV Sound Toggle */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500">שמע והתראות בטלוויזיה</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onTvSoundToggle(true)}
                  className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-extrabold transition-all cursor-pointer text-center ${
                    tvSoundEnabled
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-xs font-black'
                      : palette.isDark
                      ? 'bg-slate-800 border-slate-750 text-slate-400'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  🔊 סאונד מופעל
                </button>
                <button
                  type="button"
                  onClick={() => onTvSoundToggle(false)}
                  className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-extrabold transition-all cursor-pointer text-center ${
                    !tvSoundEnabled
                      ? 'bg-rose-500/20 border-rose-500 text-rose-455 shadow-xs font-black'
                      : palette.isDark
                      ? 'bg-slate-800 border-slate-750 text-slate-400'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  🔇 טלוויזיה שקטה
                </button>
              </div>
            </div>

            {/* Business Logo File Upload option */}
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-bold text-slate-500">העלאת לוגו למספרה</label>
              
              <div className={`flex items-center gap-4 p-3 rounded-2xl border ${palette.isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                {/* Logo Preview */}
                <div className="w-16 h-16 bg-white rounded-xl border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                  <img
                    src={logoUrl || "/logo.jpg"}
                    className="w-full h-full object-contain"
                    alt="Logo Preview"
                    onError={(e) => {
                      e.target.src = "/logo.jpg";
                    }}
                  />
                </div>

                <div className="flex-1 space-y-1.5 text-right">
                  <label className={`inline-block border text-xs font-black py-2 px-3 rounded-xl cursor-pointer transition-all ${
                    palette.isDark 
                      ? 'bg-purple-950/40 border-purple-900 text-purple-300 hover:bg-purple-900/60' 
                      : 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700'
                  }`}>
                    <span>בחר קובץ תמונה 📁</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                  
                  {logoUrl !== '/logo.jpg' && (
                    <button
                      type="button"
                      onClick={() => onLogoUrlChange('/logo.jpg')}
                      className="block text-[10px] text-red-500 hover:text-red-400 font-extrabold cursor-pointer"
                    >
                      שחזר לוגו מקורי של JOY & POLA
                    </button>
                  )}
                </div>
              </div>
              <p className="text-[10px] text-slate-450 leading-tight">
                מומלץ להעלות תמונה ריבועית עם רקע לבן. התמונה תידחס ותישמר במערכת באופן אוטומטי.
              </p>
            </div>

            {/* Business Address input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-500">כתובת המספרה</label>
              <input
                type="text"
                placeholder="הקלד את כתובת המספרה להצגה..."
                value={businessAddress}
                onChange={(e) => onBusinessAddressChange(e.target.value)}
                className={`w-full border rounded-xl px-3 py-2.5 text-xs placeholder-slate-450 focus:outline-none focus:border-purple-500 font-medium transition-all ${
                  palette.isDark
                    ? 'bg-slate-800/80 border-slate-750 text-slate-100 focus:bg-slate-800'
                    : 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white'
                }`}
              />
            </div>

            {/* WhatsApp message template textarea */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-500">נוסח הודעת וואטסאפ אוטומטית</label>
              <textarea
                rows="3"
                placeholder="נוסח הודעת וואטסאפ לסיום תספורת..."
                value={whatsappTemplate}
                onChange={(e) => onWhatsappTemplateChange(e.target.value)}
                className={`w-full border rounded-xl px-3 py-2.5 text-xs placeholder-slate-455 focus:outline-none focus:border-purple-500 font-medium transition-all resize-none leading-relaxed ${
                  palette.isDark
                    ? 'bg-slate-800/80 border-slate-750 text-slate-100 focus:bg-slate-800'
                    : 'bg-slate-50 border-slate-200 text-slate-855 focus:bg-white'
                }`}
              />
              <p className="text-[10px] text-slate-450 leading-tight">
                השתמש ב- <span className="font-bold">{'{owner}'}</span> עבור שם הבעלים, וב- <span className="font-bold">{'{dog}'}</span> עבור שם הכלב.
              </p>
            </div>

            {/* Alert Threshold Selector */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-slate-500 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                זמן המתנה לפני התראת חריגה
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[10, 15, 20, 25, 30, 45].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => handleAlertThresholdChange(mins)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-extrabold transition-all cursor-pointer text-center ${
                      alertThresholdMinutes === mins
                        ? 'bg-red-500/20 border-red-500 text-red-400 shadow-xs'
                        : palette.isDark
                        ? 'bg-slate-800 border-slate-750 text-slate-400 hover:bg-slate-750'
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {mins} דק׳
                  </button>
                ))}
              </div>
              <p className={`text-[10px] leading-tight ${ palette.isDark ? 'text-slate-450' : 'text-slate-400'}`}>
                כרגע: התראה אחרי <span className="font-black text-red-400">{alertThresholdMinutes} דקות</span> המתנה בלובי ללא תחילת טיפול
              </p>
            </div>

            {/* Color Palette Selector */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-slate-500">בחר פלטת צבעים למספרה</label>
              <div className="grid grid-cols-1 gap-2">
                {PALETTES_PREVIEW.map((p) => {
                  const isSelected = p.id === palette.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => onPaletteChange(p.id)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer text-right ${
                        isSelected
                          ? `bg-purple-650/15 font-black shadow-xs ${palette.isDark ? 'border-purple-500 text-purple-300' : 'border-purple-600 text-purple-900'}`
                          : palette.isDark
                          ? 'border-slate-800 hover:bg-slate-800 text-slate-300'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="text-xs">{p.name}</span>
                      
                      {/* Color pills preview */}
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-350/20" style={{ backgroundColor: p.color1 }} />
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-350/20" style={{ backgroundColor: p.color2 }} />
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-350/20" style={{ backgroundColor: p.color3 }} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer / Close */}
            <div className="pt-3 border-t border-slate-100/10 flex justify-end">
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className={`py-2 px-6 text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer ${palette.primaryBg}`}
              >
                סגור שמירה 🏁
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Edit Dog Card Modal (Popup Overlay) */}
      {editingDog && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4" dir="rtl" onClick={() => setEditingDog(null)}>
          <div 
            className={`rounded-3xl border max-w-md w-full p-6 shadow-2xl space-y-4 animate-fade-in text-right ${
              palette.isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent close on inner clicks
          >
            <h2 className="text-lg font-black border-b border-slate-100/10 pb-3 flex items-center gap-1.5">
              <Edit2 className="w-5 h-5 text-indigo-500" />
              <span>עריכת כרטיס כלב</span>
            </h2>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">שם הכלב *</label>
                <input
                  type="text"
                  required
                  value={editingDog.dogName}
                  onChange={(e) => setEditingDog({ ...editingDog, dogName: e.target.value })}
                  className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-purple-500 ${
                    palette.isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">גזע</label>
                <input
                  type="text"
                  value={editingDog.breed}
                  onChange={(e) => setEditingDog({ ...editingDog, breed: e.target.value })}
                  className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-purple-500 ${
                    palette.isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">שם הבעלים</label>
                <input
                  type="text"
                  value={editingDog.ownerName}
                  onChange={(e) => setEditingDog({ ...editingDog, ownerName: e.target.value })}
                  className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-purple-500 ${
                    palette.isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">מספר טלפון</label>
                <input
                  type="tel"
                  value={editingDog.phone}
                  onChange={(e) => setEditingDog({ ...editingDog, phone: e.target.value })}
                  className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-purple-500 text-left font-mono ${
                    palette.isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">הערות לטיפול</label>
                <textarea
                  rows="2"
                  value={editingDog.notes || ''}
                  onChange={(e) => setEditingDog({ ...editingDog, notes: e.target.value })}
                  className={`w-full border rounded-xl px-3 py-2 text-xs resize-none focus:outline-none focus:border-purple-500 ${
                    palette.isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100/10 flex items-center gap-2 justify-end">
              <button
                type="button"
                onClick={() => setEditingDog(null)}
                className={`py-2 px-4 border text-xs font-bold rounded-xl hover:bg-slate-100 transition-all cursor-pointer ${
                  palette.isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-550'
                }`}
              >
                ביטול
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!editingDog.dogName.trim()) return;
                  onUpdateDog(editingDog);
                  setEditingDog(null);
                }}
                className={`py-2 px-6 text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer ${palette.primaryBg}`}
              >
                שמור שינויים 💾
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Dog Authorization Modal (Popup Overlay) */}
      {deletingDogId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4" dir="rtl" onClick={() => {
          setDeletingDogId(null);
          setDeletePassword('');
          setDeleteError('');
        }}>
          <div 
            className={`rounded-3xl border max-w-sm w-full p-6 shadow-2xl space-y-4 animate-fade-in text-right ${
              palette.isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent close on inner clicks
          >
            <div className="flex items-center gap-2 text-red-500 border-b border-slate-100/10 pb-3">
              <Lock className="w-5 h-5" />
              <h2 className="text-lg font-black">מחיקת כרטיס כלב מהתור</h2>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              מחיקת כרטיס כלב מהמערכת היא פעולה לצמיתות. אנו דורשים להזין את סיסמת המנהל לאישור המחיקה:
            </p>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-500">סיסמת מנהל *</label>
              <input
                type="password"
                placeholder="הזן סיסמת מנהל..."
                value={deletePassword}
                onChange={(e) => {
                  setDeletePassword(e.target.value);
                  setDeleteError('');
                }}
                className={`w-full border rounded-xl px-4 py-2.5 text-center font-mono font-bold focus:outline-none ${
                  palette.isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-100 focus:border-red-500'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-red-500'
                }`}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleConfirmDelete();
                }}
              />
              {deleteError && (
                <p className="text-red-500 text-[10px] font-bold flex items-center gap-1 animate-pulse">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{deleteError}</span>
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100/10 flex items-center gap-2 justify-end">
              <button
                type="button"
                onClick={() => {
                  setDeletingDogId(null);
                  setDeletePassword('');
                  setDeleteError('');
                }}
                className={`py-2 px-4 border text-xs font-bold rounded-xl hover:bg-slate-100 transition-all cursor-pointer ${
                  palette.isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-550'
                }`}
              >
                ביטול
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="py-2 px-6 bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer shadow-md shadow-red-100"
              >
                אשר מחיקה 🗑️
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Waiting Alert Popup (Urgent blocking overlay) */}
      {active15MinAlertDog && (
        <div className="fixed inset-0 bg-red-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" dir="rtl">
          <div className={`rounded-3xl border-2 p-8 shadow-2xl space-y-5 animate-bounce-short text-center max-w-md w-full ${
            palette.isDark ? 'bg-slate-900 border-red-900 text-slate-100' : 'bg-white border-red-400 text-slate-800'
          }`}>
            <div className="relative mx-auto w-20 h-20 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center animate-pulse mb-2">
              <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
            
            <h2 className="text-xl font-black text-red-500">התראת המתנה חריגה! 🚨</h2>
            
            <div className="space-y-2">
              <p className="text-sm font-semibold">
                הכלב <span className="font-black text-base underline decoration-red-500">{active15MinAlertDog.dogName}</span> (של {active15MinAlertDog.ownerName || 'לקוח'})
              </p>
              <p className="text-xs text-slate-450 leading-relaxed font-bold">
                ממתין בלובי כבר <span className="text-red-500 font-extrabold text-sm">{getWaitingTimeMinutes(active15MinAlertDog.arrivalTime)} דקות</span> ללא תחילת טיפול!
              </p>
              <p className="text-[10px] text-slate-400">
                (סף ההתראה מוגדר ל-<span className="font-black">{alertThresholdMinutes} דקות</span> בהגדרות)
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100/10">
              <button
                type="button"
                onClick={handleAcknowledgeAlert}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-extrabold rounded-xl transition-all cursor-pointer shadow-lg shadow-red-500/20"
              >
                אישור קבלת התראה 👍
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`mt-12 pt-6 border-t ${palette.borderCol} flex justify-between text-slate-400 text-xs font-semibold`}>
        <div>JOY 🐶 POLA • {businessAddress || 'אבן גבירול 163, תל אביב'}</div>
        <div>מחובר למאגר מקומי (LocalStorage)</div>
      </footer>
    </div>
  );
}
