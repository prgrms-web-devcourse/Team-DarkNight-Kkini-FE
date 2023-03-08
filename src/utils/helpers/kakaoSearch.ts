import axios from 'axios';
import { AxiosPhotoResponseValue } from 'types/kakaoSearch';

const URL = 'https://dapi.kakao.com/v2/search/image';

export const getKeywordPhotos = async (
  address_name: string,
  keyword: string,
  count: number
) => {
  const data = await axios
    .get<AxiosPhotoResponseValue>(URL, {
      params: {
        query: `${address_name.split(' ')[2]} ${keyword}`,
        size: count,
      },
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_SEARCH_API_KEY}`,
      },
    })
    .then((response) => response.data);

  return data;
};
