export const kbToGb = (kb: number): number => {
  return +(kb / 1024 / 1024).toFixed(3);
};
