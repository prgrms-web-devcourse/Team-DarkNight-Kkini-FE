import { useRecoilValue, useSetRecoilState } from 'recoil';
import { kakaoMapOptionsState } from 'stores/kakaoMap';
import { searchRestaurantList } from 'stores/Restaurant';

const useSearchRestaurant = () => {
  const kakaoMapOptions = useRecoilValue(kakaoMapOptionsState);
  const kakaoPlaces = new kakao.maps.services.Places();
  const setRestaurants = useSetRecoilState(searchRestaurantList);

  const getRestaurantPhoto = (address: string) => {
    const result: string[] = [];

    const googlePlacesService = new google.maps.places.PlacesService(
      document.createElement('div')
    );

    const isOk = (status: google.maps.places.PlacesServiceStatus) => {
      return status === google.maps.places.PlacesServiceStatus.OK;
    };

    googlePlacesService.textSearch(
      {
        query: address,
        type: 'restaurant',
      },
      (results, status) => {
        if (isOk(status)) {
          googlePlacesService.getDetails(
            { placeId: results?.[0].place_id as string, fields: ['photos'] },
            (results, status) => {
              if (isOk(status)) {
                const photos = results?.photos?.map((photo) => photo.getUrl());
                /* Todo 
                photos 비동기로 넣어주어야 잘 들어갈듯. 지금은 제대로 안들어감.
                */
              }
            }
          );
        }
      }
    );
    return result;
  };

  const searchByKeyword = (keyword: string) => {
    const { lng, lat } = kakaoMapOptions.center;

    const options = {
      category_group_code: 'FD6',
      x: lng,
      y: lat,
      radius: 1000,
    };

    kakaoPlaces.keywordSearch(
      keyword,
      (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const searchResult = result.map(
            ({ category_name, place_name, x, y, road_address_name }) => {
              const photos = getRestaurantPhoto(road_address_name);
              return {
                category_name,
                place_name,
                road_address_name,
                x: parseFloat(x),
                y: parseFloat(y),
                image_url: photos,
              };
            }
          );
          setRestaurants([...searchResult]);
        }
      },
      options
    );
  };

  return { searchByKeyword };
};

export default useSearchRestaurant;
