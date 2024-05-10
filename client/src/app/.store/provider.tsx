'use client';
import { PropsWithChildren } from 'react';
import { AppContext, GlobalStore } from './store';

export const AppStoreProvider = ({ children }: PropsWithChildren) => {
  return <AppContext.Provider value={GlobalStore}>{children}</AppContext.Provider>;
};
