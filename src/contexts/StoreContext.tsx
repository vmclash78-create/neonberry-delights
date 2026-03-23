import React, { createContext, useContext } from 'react';
import { StoreSettings } from '@/types';
import { mockStoreSettings } from '@/data/mock-data';

interface StoreContextType {
  settings: StoreSettings;
  isOpen: boolean;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const settings = mockStoreSettings;

  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const isOpen = currentTime >= settings.opening_time && currentTime <= settings.closing_time;

  return (
    <StoreContext.Provider value={{ settings, isOpen }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
