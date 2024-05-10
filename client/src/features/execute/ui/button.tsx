import { usePlaygroundStore } from '@/app/.store';
import styles from './button.module.scss';
import { observer } from 'mobx-react-lite';

export const ExecuteCodeButton = observer(() => {
  const pg = usePlaygroundStore();
  const globalLoading = pg.isExecutionLoading || pg.isLoading;

  console.log(pg.isExecutionLoading, pg.isLoading);

  return (
    <button disabled={globalLoading} className={styles.btn} onClick={() => pg.executeCodeOnServer()}>
      {globalLoading ? 'LOADING...' : 'START'}
      <div className={styles.arrow}>
        <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 5v14l11-7z"></path>
        </svg>
      </div>
    </button>
  );
});
