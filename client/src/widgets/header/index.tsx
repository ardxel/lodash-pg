'use client';

import { useAppStore } from '@/app/.store';
import { useIsMounted } from '@/shared/lib';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import Select from 'react-select';
import styles from './header.module.scss';

const ArrowRightSvg = () => {
  return (
    <div className={styles.arrowRight}>
      <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 5v14l11-7z"></path>
      </svg>
    </div>
  );
};

const Header = observer(() => {
  const { playgroundStore } = useAppStore();
  const isMounted = useIsMounted();
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    if (!playgroundStore.implementedLodashMethodKeys.length) {
      playgroundStore.getImplementedLodashMethodKeys();
    }

    setOptions(playgroundStore.implementedLodashMethodKeys.map((key) => ({ value: key, label: key })));
  }, [playgroundStore.implementedLodashMethodKeys]);

  return (
    <header className={styles.header}>
      <button className={styles.btn} onClick={() => playgroundStore.executeCodeOnServer()}>
        START <ArrowRightSvg />
      </button>
      {isMounted && (
        <Select
          styles={{
            singleValue: (base) => ({
              ...base,
              font: 'var(--font-lato), sans-serif',
              fontSize: '16px',
              fontWeight: 300,
              color: 'white',
            }),
            option: (base, props) => ({
              ...base,
              font: 'var(--font-lato), sans-serif',
              fontWeight: 300,
              backgroundColor: props.isSelected ? 'var(--light-gray)' : 'inherit',
              color: props.isSelected ? 'black' : 'white',
              ':hover': {
                backgroundColor: props.isFocused ? 'gray' : 'inherit',
              },
            }),
            dropdownIndicator: (baseIndicatorStyles) => ({
              ...baseIndicatorStyles,
              color: 'white',
            }),
            placeholder: (basePlaceholderStyles) => ({
              ...basePlaceholderStyles,
              color: 'white',
              fontSize: '20px',
              fontWeight: 300,
            }),
            control: (baseControlStyles, props) => ({
              ...baseControlStyles,
              width: 200,
              borderRadius: 10,
              backgroundColor: 'rgba(233, 30, 99, 1)',
            }),
            menu: (baseMenuStyles) => ({
              ...baseMenuStyles,
              color: 'white',
              backgroundColor: 'rgba(233, 30, 99, 1)',
            }),
          }}
          className={styles.selectFn}
          isSearchable={false}
          onChange={(lodashFnKey) => playgroundStore.generateDefaultCodeByLodashFnKey(lodashFnKey!.value)}
          options={options}
        />
      )}
    </header>
  );
});

export default Header;
