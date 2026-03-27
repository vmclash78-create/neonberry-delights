import React, { createContext, useContext } from 'react';
import { useStoreSettings, StoreSettingsRow } from '@/hooks/useStoreSettings';

interface StoreContextType {
  settings: StoreSettingsRow | null;
  isOpen: boolean;
  isLoading: boolean;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const { data: settings, isLoading } = useStoreSettings();

  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const isOpen = settings ? currentTime >= settings.opening_time && currentTime <= settings.closing_time : true;

  return (
    <StoreContext.Provider value={{ settings: settings || null, isOpen, isLoading }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
