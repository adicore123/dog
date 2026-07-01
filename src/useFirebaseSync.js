import { useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './firebase';

export function useFirebaseSync(
  setDogs,
  setHistory,
  setIsSystemDisabled,
  setActivePaletteId,
  setTvSoundEnabled,
  setBusinessAddress,
  setLogoUrl,
  setWhatsappTemplate,
  triggerSound
) {
  useEffect(() => {
    const unsubDogs = onValue(ref(database, 'dogs'), (snapshot) => {
      const data = snapshot.val() || [];
      setDogs(data);
      localStorage.setItem('grooming_dogs_queue', JSON.stringify(data));
    });

    const unsubHistory = onValue(ref(database, 'history'), (snapshot) => {
      const data = snapshot.val() || [];
      setHistory(data);
      localStorage.setItem('grooming_history', JSON.stringify(data));
    });

    const unsubSystem = onValue(ref(database, 'systemDisabled'), (snapshot) => {
      const disabled = snapshot.val() === true;
      setIsSystemDisabled(disabled);
      localStorage.setItem('grooming_system_disabled', disabled ? 'true' : 'false');
    });

    const unsubSettings = onValue(ref(database, 'settings'), (snapshot) => {
      const data = snapshot.val() || {};
      if (data.activePaletteId) {
        setActivePaletteId(data.activePaletteId);
        localStorage.setItem('grooming_active_palette', data.activePaletteId);
      }
      if (data.tvSoundEnabled !== undefined) {
        setTvSoundEnabled(data.tvSoundEnabled);
        localStorage.setItem('grooming_tv_sound_enabled', data.tvSoundEnabled);
      }
      if (data.businessAddress) {
        setBusinessAddress(data.businessAddress);
        localStorage.setItem('grooming_business_address', data.businessAddress);
      }
      if (data.logoUrl) {
        setLogoUrl(data.logoUrl);
        localStorage.setItem('grooming_logo_url', data.logoUrl);
      }
      if (data.whatsappTemplate) {
        setWhatsappTemplate(data.whatsappTemplate);
        localStorage.setItem('grooming_whatsapp_template', data.whatsappTemplate);
      }
    });

    const unsubSound = onValue(ref(database, 'triggerSoundEvent'), (snapshot) => {
      const eventData = snapshot.val();
      if (eventData && eventData.id) {
        const isTv = window.location.pathname !== '/admin';
        const soundEnabledSetting = localStorage.getItem('grooming_tv_sound_enabled') !== 'false';
        if (!isTv || soundEnabledSetting) {
          triggerSound(eventData.id);
        }
      }
    });

    return () => {
      unsubDogs();
      unsubHistory();
      unsubSystem();
      unsubSettings();
      unsubSound();
    };
  }, []); // Run once on mount
}
