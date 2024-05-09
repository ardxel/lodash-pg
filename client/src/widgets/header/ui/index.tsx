'use client';

import { useAppStore } from '@/app/.store';
import { useIsMounted } from '@/shared/lib';
import { observer } from 'mobx-react-lite';

import Select from 'react-select';
import { useLodashSelector } from '../lib';
import styles from './header.module.scss';
import { selectStyles } from './selectorOptions';

export const Header = observer(() => {
  const { playgroundStore } = useAppStore();
  const isMounted = useIsMounted();
  const [selected, setSelected] = useLodashSelector();

  return (
    <header className={styles.header}>
      <button className={styles.btn} onClick={() => playgroundStore.executeCodeOnServer()}>
        START
        <div className={styles.arrow}>
          <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7z"></path>
          </svg>
        </div>
      </button>
      {isMounted && (
        <Select
          styles={selectStyles}
          className={styles.selectFn}
          isSearchable={false}
          value={selected}
          onChange={(option) => setSelected(option)}
          options={playgroundStore.implementedLodashMethodKeys.map((key) => ({ value: key, label: key }))}
        />
      )}
    </header>
  );
});
