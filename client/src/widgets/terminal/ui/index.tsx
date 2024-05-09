import { Allotment } from 'allotment';
import { TerminalInfoWindow } from './info';
import { TerminalStdoutWindow } from './stdout';

import styles from './terminal.module.scss';

export const Playground = () => {
  return (
    <section className={styles.terminalContainer}>
      <Allotment vertical className={styles.terminalContainer}>
        <Allotment.Pane>
          <TerminalStdoutWindow />
        </Allotment.Pane>
        <Allotment.Pane>
          <TerminalInfoWindow />
        </Allotment.Pane>
      </Allotment>
    </section>
  );
};
