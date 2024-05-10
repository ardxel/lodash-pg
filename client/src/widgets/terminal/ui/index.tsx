import { Allotment } from 'allotment';
import { TerminalInfoWindow } from './info';
import { TerminalResultWindow } from './result';

import styles from './terminal.module.scss';

export const Playground = () => {
  return (
    <div className={styles.terminalContainer}>
      <Allotment vertical className={styles.terminalContainer}>
        <Allotment.Pane>
          <TerminalResultWindow />
        </Allotment.Pane>
        <Allotment.Pane>
          <TerminalInfoWindow />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
};
