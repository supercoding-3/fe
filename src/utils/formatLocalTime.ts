export const formatLocalTime = (isoString) => {
  const date = new Date(isoString);

  return date.toLocaleString('ko-KR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
};
