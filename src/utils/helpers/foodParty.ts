export const getPhotoUrlsString = (photoUrls: string[]) => {
  return photoUrls.join(',');
};

export const getPhotoUrlsArray = (photoUrls: string) => {
  return photoUrls.split(',');
};

export const getCategoryArray = (category: string) => {
  return category.split('>').map((category) => category.trim());
};

export const templatePromiseDate = (year: number, month: number, day: number) => {
  return `${year}년 ${month}월 ${day}일`;
};

export const templatePromiseTime = (hour: number, minute: number) => {
  return `${hour}:${String(minute).padStart(2, '0')}`;
};
