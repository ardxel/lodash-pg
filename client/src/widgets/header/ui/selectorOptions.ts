import { StylesConfig } from 'react-select';

export const selectStyles: StylesConfig = {
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
  control: (baseControlStyles) => ({
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
};
