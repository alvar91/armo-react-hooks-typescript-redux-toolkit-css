export const normalizeDateString = (initDate: string): string => {
  const parsed = initDate.split(/[.-/]/);
  if (parsed.length === 3) {
    const [d, m, y] = parsed;
    return `${y}-${m}-${d}`;
  }

  return initDate;
};
