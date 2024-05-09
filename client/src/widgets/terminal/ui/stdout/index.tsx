'use client';

import { useAppStore } from '@/app/.store';
import { observer } from 'mobx-react-lite';

import terminalStyles from '../terminal.module.scss';
import styles from './stdout.module.scss';

export const TerminalStdoutWindow = observer(() => {
  const { playgroundStore } = useAppStore();

  return (
    <section className={terminalStyles.section}>
      <h1 className={terminalStyles.terminalHeader}>Stdout:</h1>
      <div className={styles.terminalTests}>
        {!playgroundStore.isLoading && playgroundStore.error ? <p>{playgroundStore.error.message}</p> : null}
      </div>
    </section>
  );
});
