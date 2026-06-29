import React, { useState, useEffect } from 'react';
import TvDisplay from './components/TvDisplay';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  // Simple client-side state-based router
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

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

  // State for active queue (waiting and active treatments)
  const [dogs, setDogs] = useState(() => {
    try {
      const savedDogs = localStorage.getItem('grooming_dogs_queue');
      return savedDogs ? JSON.parse(savedDogs) : [];
    } catch (e) {
      console.error('Failed to parse grooming_dogs_queue', e);
      return [];
    }
  });

  // State for completed haircut history
  const [history, setHistory] = useState(() => {
    try {
      const savedHistory = localStorage.getItem('grooming_history');
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (e) {
      console.error('Failed to parse grooming_history', e);
      return [];
    }
  });

  // Sync queues to localStorage
  useEffect(() => {
    localStorage.setItem('grooming_dogs_queue', JSON.stringify(dogs));
  }, [dogs]);

  // Sync history to localStorage
  useEffect(() => {
    localStorage.setItem('grooming_history', JSON.stringify(history));
  }, [history]);

  // Real-time synchronization across browser tabs using HTML5 Storage Events
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'grooming_dogs_queue') {
        try {
          setDogs(e.newValue ? JSON.parse(e.newValue) : []);
        } catch (err) {
          console.error('Failed to sync grooming_dogs_queue from another tab', err);
        }
      }
      if (e.key === 'grooming_history') {
        try {
          setHistory(e.newValue ? JSON.parse(e.newValue) : []);
        } catch (err) {
          console.error('Failed to sync grooming_history from another tab', err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Add new dog to waiting queue
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

  // Move dog from waiting to active treatment
  const handleStartTreatment = (id) => {
    setDogs((prev) =>
      prev.map((dog) =>
        dog.id === id
          ? { ...dog, status: 'active', startTime: Date.now() }
          : dog
      )
    );
  };

  // Complete treatment: calculate duration, move to history log, remove from active queue
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
      notes: targetDog.notes || '', // propagate notes
      arrivalTime: targetDog.arrivalTime,
      startTime: targetDog.startTime || targetDog.arrivalTime,
      endTime,
      durationSeconds
    };

    setHistory((prev) => [completedSession, ...prev]);
    setDogs((prev) => prev.filter((dog) => dog.id !== id));
  };

  // Remove history item
  const handleDeleteHistoryItem = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear all data
  const handleClearAll = () => {
    setDogs([]);
    setHistory([]);
  };

  // Load complete simulated database
  const handleLoadDemo = () => {
    const now = Date.now();
    
    // Active Queue: some waiting, some active
    const demoDogs = [
      {
        id: 'demo-wait-1',
        dogName: 'לקי',
        ownerName: 'יוסי כהן',
        phone: '052-1234567',
        breed: 'שיצו',
        notes: 'להיזהר על קשרים מאחורי האוזניים',
        status: 'waiting',
        arrivalTime: now - 8 * 60 * 1000, // 8 mins ago (normal waiting)
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
        arrivalTime: now - 25 * 60 * 1000, // 25 mins ago (Alert: > 20 mins)
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
        startTime: now - 15 * 60 * 1000 // In treatment for 15 mins (Green)
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
        startTime: now - 65 * 60 * 1000 // In treatment for 65 mins (Amber)
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
        startTime: now - 95 * 60 * 1000 // In treatment for 95 mins (Rose + Pulse)
      }
    ];

    // Completed History List
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
        durationSeconds: 60 * 60 // 1 hour duration
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
        durationSeconds: 35 * 60 // 35 min duration
      }
    ];

    setDogs(demoDogs);
    setHistory(demoHistory);
  };

  // Render path-specific page
  if (currentPath === '/admin') {
    return (
      <AdminDashboard
        dogs={dogs}
        history={history}
        onRegisterDog={handleRegisterDog}
        onStartTreatment={handleStartTreatment}
        onFinishTreatment={handleFinishTreatment}
        onDeleteHistoryItem={handleDeleteHistoryItem}
        onLoadDemo={handleLoadDemo}
        onClearAll={handleClearAll}
        navigate={navigate}
      />
    );
  }

  // Default is Public TV Display
  return (
    <TvDisplay 
      dogs={dogs.filter((dog) => dog.status === 'active')} 
      navigate={navigate}
    />
  );
}
