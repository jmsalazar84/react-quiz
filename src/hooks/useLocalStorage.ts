import { useState, useEffect } from 'react';

const getStorageValue = <T>(key: string, defaultValue: T) => {
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || defaultValue;
};

export function useLocalStorage<T>(key: string, defaultValue: T): [T, React.Dispatch<T>] {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
