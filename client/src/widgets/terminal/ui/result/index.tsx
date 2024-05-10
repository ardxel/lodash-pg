'use client';

import { usePlaygroundStore } from '@/app/.store';
import { observer } from 'mobx-react-lite';

import { FC } from 'react';
import terminalStyles from '../terminal.module.scss';
import styles from './result.module.scss';

export const TerminalResultWindow = observer(() => {
  const { isLoading, isExecutionLoading, output } = usePlaygroundStore();
  const isExecutionError = Boolean(output.error);

  if (isLoading || isExecutionLoading) {
    return (
      <section className={`${terminalStyles.section} ${terminalStyles.sectionResult}`}>
        <h1 className={terminalStyles.terminalHeader}>Test Result:</h1>
        <div className={styles.terminalTests}>
          <SkeletonResult />
        </div>
      </section>
    );
  }

  return (
    <section className={`${terminalStyles.section} ${terminalStyles.sectionResult}`}>
      <h1 className={terminalStyles.terminalHeader}>Test Result:</h1>
      <div className={styles.terminalTests}>
        {isExecutionError ? <ErrorDisplay error={output.error} /> : <ExecutionResultList result={output.testResuts} />}
      </div>
    </section>
  );
});

type ExecutionResultListProps = {
  result: Array<boolean | Error>;
};

const ExecutionResultList: FC<ExecutionResultListProps> = ({ result }) => {
  if (!result || !result.length) return null;

  return result.map((childResult, index) => (
    <div className={styles.result} key={index}>
      <div className={styles.resultIcon}>
        <SquareIndicator isCompleted={childResult === true} />
      </div>
      <h3>Test #{index}</h3>
    </div>
  ));
};

type ErrorDisplayProps = {
  error: Error | null;
};

const ErrorDisplay: FC<ErrorDisplayProps> = ({ error }) => {
  if (!error) return null;

  const stack = error.stack;

  return <div className={styles.errorContainer}>{stack && <pre className={styles.errorStack}>{stack}</pre>}</div>;
};

type SquareIndicatorProps = {
  isCompleted: boolean;
};

const SquareIndicator: FC<SquareIndicatorProps> = ({ isCompleted }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: isCompleted ? '#28a745' : '#dc3545',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid #000',
      }}>
      {isCompleted ? (
        <svg width="60" height="60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 50 L45 65 L70 35" fill="none" stroke="#ffffff" strokeWidth="8" />
        </svg>
      ) : (
        <svg width="60" height="60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 30 L70 70" fill="none" stroke="#ffffff" strokeWidth="8" />
          <path d="M70 30 L30 70" fill="none" stroke="#ffffff" strokeWidth="8" />
        </svg>
      )}
    </div>
  );
};

const SkeletonResult = () => {
  return new Array(3).fill(0).map((_, index) => (
    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
      <div className="skeleton-box" style={{ width: '60px', height: '56px', marginLeft: '20px' }}></div> <div></div>
      <div className="skeleton-box" style={{ width: '60px', height: '22px', marginLeft: '10px' }}></div>
    </div>
  ));
};
