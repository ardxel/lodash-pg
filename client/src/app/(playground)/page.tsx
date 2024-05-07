'use client';

import styles from './page.module.scss';
import 'allotment/dist/style.css';
import './separator-line.scss';

import AppEditor from '@/widgets/codeEditor';
import Terminal from '@/widgets/terminal';
import { Allotment } from 'allotment';

export default function PlaygroundPage() {
  return (
    <main className={styles.wrapper}>
      <Allotment className={styles.inner}>
        <Allotment.Pane minSize={400}>
          <AppEditor />
        </Allotment.Pane>
        <Allotment.Pane minSize={200}>
          <Terminal />
        </Allotment.Pane>
      </Allotment>
    </main>
  );
}
