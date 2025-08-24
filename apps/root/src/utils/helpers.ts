export const debounce = <T extends (...args: unknown[]) => unknown>(
  callback: T,
  wait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  let timeoutId: number | undefined = undefined;

  const debouncedFn = (...args: Parameters<T>) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };

  debouncedFn.cancel = () => {
    window.clearTimeout(timeoutId);
  };

  return debouncedFn;
};
