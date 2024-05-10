'use client';

import { usePlaygroundStore } from '@/app/.store';
import { useIsMounted } from '@/shared/lib';
import { observer } from 'mobx-react-lite';

import Select from 'react-select';
import { SelectorOption, useLodashSelector } from '../lib';
import styles from './header.module.scss';
import { selectStyles } from './selectorOptions';
import { ExecuteCodeButton } from '@/features/execute';

export const Header = observer(() => {
  const pg = usePlaygroundStore();
  const isMounted = useIsMounted();
  const [selected, setSelected] = useLodashSelector();

  return (
    <header className={styles.header}>
      <ExecuteCodeButton />
      {isMounted && (
        <Select
          styles={selectStyles}
          className={styles.selectFn}
          isSearchable={false}
          value={selected}
          onChange={(option) => setSelected(option as SelectorOption)}
          options={pg.implementedLodashMethodKeys.map((key) => ({ value: key, label: key }))}
        />
      )}
    </header>
  );
});
