'use client';

import { createContext, useContext } from 'react';
import { PlaygroundStore } from '@/entities/playground';

export const GlobalStore = {
  playgroundStore: new PlaygroundStore(),
};

export const AppContext = createContext(GlobalStore);

export const useAppStore = () => useContext(AppContext);
export const usePlaygroundStore = () => useAppStore().playgroundStore;
