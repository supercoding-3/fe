export const formatLocaleString = (num: string | number) => {
  const formatted = Number(num).toLocaleString();
  return formatted;
};
