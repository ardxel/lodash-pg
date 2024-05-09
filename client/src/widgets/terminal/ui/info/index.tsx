'use client';

import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/prism.js';

import 'prismjs/components/prism-javascript';

import { FC, PropsWithChildren, useState } from 'react';
import terminalStyles from '../terminal.module.scss';
import styles from './info.module.scss';
import { useAppStore } from '@/app/.store';
import { observer } from 'mobx-react-lite';

type InfoWindowPanelType = 'desc' | 'testcase';

export const TerminalInfoWindow = observer(() => {
  const pgStore = useAppStore().playgroundStore;
  const [selectedPanel, setSelectedPanel] = useState<InfoWindowPanelType>('desc');

  return (
    <section className={terminalStyles.section}>
      <div className={styles.panel}>
        <button className={styles.btn} onClick={() => setSelectedPanel('desc')}>
          Description
        </button>
        <button className={styles.btn} onClick={() => setSelectedPanel('testcase')}>
          Test Cases
        </button>
      </div>
      <div>
        {selectedPanel === 'desc' ? <TerminalDescription desc={pgStore.desc} examples={pgStore.codeExamples} /> : null}
      </div>
    </section>
  );
});

const TerminalDescription: FC<PropsWithChildren<{ desc: string; examples: string[] }>> = (props) => {
  console.log(props.examples);
  return (
    <div>
      <p>{props.desc}</p>
      <div>
        {props.examples.map((example, id) => (
          <pre key={id}>
            <code>{example}</code>
          </pre>
        ))}
      </div>
    </div>
  );
};
