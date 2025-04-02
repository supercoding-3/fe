/**
 * 한국 표준 시간 형식으로 변환
 * @param isoString
 * @returns 1999-12-31 23:59:59
 */
const toLocalTime = (isoString: string) => {
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

export default toLocalTime;
