import React, { useState, useCallback } from 'react';

export const useInput = <T>(initialValue: T): [{ state: T, setState: React.Dispatch<React.SetStateAction<T>> }, reset: () => void] => {
  const [state, setState] = useState(initialValue);

  const reset = useCallback(() => setState(initialValue), [initialValue]);

  return [
    {
      state,
      setState,
    },
    reset
  ];
};
