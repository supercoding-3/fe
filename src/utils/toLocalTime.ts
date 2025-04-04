const toLocalTime = (isoString: string) => {
  const date = new Date(isoString);

  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

export default toLocalTime;
