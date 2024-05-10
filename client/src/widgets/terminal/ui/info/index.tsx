'use client';

import { usePlaygroundStore } from '@/app/.store';
import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';
import terminalStyles from '../terminal.module.scss';

import ReactPrismjs from '@uiw/react-prismjs';
import 'prismjs/themes/prism.css';
import styles from './info.module.scss';

type InfoWindowPanelType = 'desc' | 'testcase';

const clsx = (...classNames: any[]): string => classNames.filter(Boolean).join(' ');

export const TerminalInfoWindow = () => {
  const [selectedPanel, setSelectedPanel] = useState<InfoWindowPanelType>('desc');

  return (
    <section className={`${terminalStyles.section} ${terminalStyles.sectionInfo}`}>
      <div className={styles.panel}>
        <button
          className={clsx(styles.btn, selectedPanel === 'desc' && styles.selected)}
          onClick={() => setSelectedPanel('desc')}>
          Description
        </button>
        <button
          className={clsx(styles.btn, selectedPanel === 'testcase' && styles.selected)}
          onClick={() => setSelectedPanel('testcase')}>
          Test Cases
        </button>
      </div>
      {selectedPanel === 'desc' ? <TerminalDescription /> : <TerminalTestCases />}
    </section>
  );
};

const TerminalDescription = observer(() => {
  const { desc, codeExamples, selectedLodashFn } = usePlaygroundStore();

  return (
    <div className={styles.description}>
      <a className={styles.linkDocs} target="_blank" href={`https://lodash.com/docs/#${selectedLodashFn}`}>
        View Original
      </a>
      <p className={styles.paragraph}>{desc}</p>
      {codeExamples.map((code, index) => (
        <ReactPrismjs language="javascript" className={styles.prismjs} source={code} key={index} />
      ))}
    </div>
  );
});

const TerminalTestCases = observer(() => {
  const { inputExamples } = usePlaygroundStore();

  const parseInput = useCallback((input: any) => {
    if (typeof input === 'string') {
      if (input.includes('function')) return input;
      return `"${input}"`;
    }

    if (Array.isArray(input) || (typeof input === 'object' && input !== null))
      return <pre>{JSON.stringify(input)}</pre>;

    return input;
  }, []);

  return (
    <div className={styles.testCases}>
      {inputExamples.map((input, index) => (
        <div className={styles.case} key={index}>
          <h3 className={styles.caseTitle}>Case {index + 1}</h3>
          <div className={styles.arguments}>
            {(input as any[]).map((child, i) => {
              return (
                <div className={styles.argWrapper} key={i}>
                  <h5 className={styles.argTitle}>arg {i + 1}:</h5>
                  <span className={styles.arg}>{parseInput(child)}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
});
