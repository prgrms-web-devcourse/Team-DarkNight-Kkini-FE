export const getPhotoUrlsString = (photoUrls: string[]) => {
  return photoUrls.join(',');
};

export const getPhotoUrlsArray = (photoUrls: string) => {
  return photoUrls.split(',');
};

export const getCategoryArray = (category: string) => {
  return category.split('>').map((category) => category.trim());
};
