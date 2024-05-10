'use client';

import 'allotment/dist/style.css';
import 'prismjs/themes/prism-tomorrow.css';
import styles from './page.module.scss';
import './separator-line.scss';

import { Allotment } from 'allotment';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const CodeEditor = dynamic(() => import('@/widgets/codeEditor'), { ssr: false });
const Terminal = dynamic(() => import('@/widgets/terminal'), { ssr: false });

export default function PlaygroundPage() {
  return (
    <main className={styles.wrapper}>
      <Allotment className={styles.inner}>
        <Allotment.Pane minSize={100}>
          <CodeEditor />
        </Allotment.Pane>
        <Allotment.Pane minSize={100}>
          <Terminal />
        </Allotment.Pane>
      </Allotment>
    </main>
  );
}
