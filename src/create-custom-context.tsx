import { createContext } from 'react';

export const createCustomContext = <T,>(
  _useContextValue: () => T,
  defaultValue?: T
) => {
  const _Context = createContext<T | undefined>(defaultValue);
};
function _greet(name) {
  return `hello, ${name}`;
}
