export const initializeObject = <T, K extends string>(
  keys: K[],
  defaultValue: T
): Record<K, T> => {
  return keys.reduce((acc, key) => {
    acc[key] = defaultValue;
    return acc;
  }, {} as Record<K, T>);
};
