export const getTwoDigitNum = (beforeNum: number) => {
  return ('0' + beforeNum.toString()).slice(-2);
};
