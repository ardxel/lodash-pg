import { usePlaygroundStore } from '@/app/.store';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export type SelectorOption = { value: string; label: string };

export const useLodashSelector = (): [SelectorOption, (newValue: SelectorOption) => void] => {
  const pg = usePlaygroundStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pg.implementedLodashMethodKeys.length) {
      pg.getImplementedLodashMethodKeys();
    }

    const selectedLodashFn = searchParams.get('lodash_fn');

    if (selectedLodashFn) {
      pg.selectLodashFn(selectedLodashFn);
      pg.getEntity();
    }
  }, []);

  const handleSelectLodashFn = useCallback((newValue?: { value: string; label: string }, changeQuery = true) => {
    if (!newValue) return;

    pg.selectLodashFn(newValue.value);
    pg.getEntity();

    if (changeQuery) {
      const updatedSearchParams = new URLSearchParams(searchParams);
      updatedSearchParams.set('lodash_fn', newValue.value);
      router.push('playground/?' + updatedSearchParams.toString());
    }
  }, []);

  const asOption = { value: pg.selectedLodashFn, label: pg.selectedLodashFn };

  return [asOption, handleSelectLodashFn];
};
