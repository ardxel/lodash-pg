'use client';

import { useAppStore } from '@/app/.store';
import { Editor } from '@monaco-editor/react';
import { observer } from 'mobx-react-lite';
import styles from './editor.module.css';
import './monaco-editor-styles.css';

const EditorLoading = () => {
  return (
    <div className={styles.editorLoading}>
      <div className="dot-loader" style={{ background: 'blue' }}></div>
    </div>
  );
};

const CodeEditor = observer(() => {
  const { playgroundStore } = useAppStore();

  return (
    <div className={styles.editorWrap}>
      <Editor
        loading={<EditorLoading />}
        value={playgroundStore.code}
        onChange={(value) => (value ? playgroundStore.changeCode(value) : null)}
        options={{
          lineNumbersMinChars: 1,
          defaultColorDecorators: false,
          overviewRulerLanes: 0,
          scrollbar: {
            vertical: 'hidden',
            horizontal: 'hidden',
          },
          minimap: { enabled: false },
        }}
        height={'100%'}
        width={'100%'}
        defaultLanguage="javascript"
      />
      ;
    </div>
  );
});

export default CodeEditor;
