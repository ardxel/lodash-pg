'use client';

import { useAppStore } from '@/app/.store';
import styles from './terminal.module.scss';
import { observer } from 'mobx-react-lite';

const Playground = observer(() => {
  const { playgroundStore } = useAppStore();

  return (
    <div className={styles.terminalContainer}>
      <section>
        <h1 className={styles.terminalHeader}>Stdout:</h1>
        <div className={styles.terminalTests}>
          {!playgroundStore.isLoading && playgroundStore.error ? <p>{playgroundStore.error.message}</p> : null}
        </div>
      </section>
      <section>
        <h1 className={styles.terminalHeader}>Description:</h1>
      </section>
    </div>
  );
});

export default Playground;
