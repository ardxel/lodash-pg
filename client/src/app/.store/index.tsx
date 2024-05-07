import { createContext, useContext } from 'react';
import { PlaygroundStore } from '@/entities/playground';

const GlobalStore = {
  playgroundStore: new PlaygroundStore(),
};

const AppContext = createContext(GlobalStore);

export const useAppStore = () => useContext(AppContext);
