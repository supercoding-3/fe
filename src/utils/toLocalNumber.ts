const toLocalNumber = (num: string | number) => {
  const formatted = Number(num).toLocaleString();
  return formatted;
};

export default toLocalNumber;
