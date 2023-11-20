import React, { useCallback } from 'react';

export default function useToggle(defaultOnValue: boolean | null = null) {
  const [value, setValue] = React.useState(defaultOnValue ?? false);

  const toggleValue = useCallback(() => setValue((v) => !v), []);
  return { value, toggleValue };
}
