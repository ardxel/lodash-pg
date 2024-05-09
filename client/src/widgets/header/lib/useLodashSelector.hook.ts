import { useAppStore } from '@/app/.store';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export const useLodashSelector = () => {
  const { playgroundStore } = useAppStore();
  const [selected, setSelected] = useState<any>({});
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!playgroundStore.implementedLodashMethodKeys.length) {
      playgroundStore.getImplementedLodashMethodKeys();
    }

    const selectedLodashFn = searchParams.get('lodash_fn');
    if (selectedLodashFn) {
      setSelected(() => {
        playgroundStore.getEntity(selectedLodashFn);
        return { value: selectedLodashFn, label: selectedLodashFn };
      });
    }
  }, []);

  const selectLodashFn = useCallback((newValue?: { value: string; label: string }, changeQuery = true) => {
    if (!newValue) return;

    setSelected(newValue);
    playgroundStore.getEntity(newValue.value);

    if (changeQuery) {
      const updatedSearchParams = new URLSearchParams(searchParams);
      updatedSearchParams.set('lodash_fn', newValue.value);
      router.push('playground/?' + updatedSearchParams.toString());
    }
  }, []);

  return [selected, selectLodashFn];
};
