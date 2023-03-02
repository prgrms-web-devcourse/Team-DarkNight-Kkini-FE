import { Box, CloseButton, Flex, Heading, Stack } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { BiRightArrowCircle } from 'react-icons/bi';
import { RandomRestaurantType } from 'types/kakaoMap';

import Button from '../common/Button';
import Category from '../common/Category';

type RandomRestaurantModalProps = {
  isOpen: boolean;
  onClose: () => void;
  randomRestaurant: RandomRestaurantType;
};

const RandomRestaurantModal = forwardRef<HTMLDivElement, RandomRestaurantModalProps>(
  ({ isOpen, onClose, randomRestaurant }, ref) => {
    return (
      <Box
        ref={ref}
        display={isOpen ? 'block' : 'none'}
        position='absolute'
        bottom={0}
        zIndex={11}
        width='100%'
        padding='1rem'
        borderRadius='0.5rem 0.5rem 0 0'
        backgroundColor='white'>
        {/* To Do: 가게 제목 누르면 해당 가게의 카카오 place url로 이동하게 만들자. by 승준 */}
        {/* To Do: 스타일링 다듬을 필요 있음. by 승준 */}
        {/* To Do: randomRestaurant의 속성들이 undefined일 경우가 많으니, undefined이면 안 보이게 처리 필요. by 승준 */}
        <Flex justifyContent='space-between'>
          <Stack direction='row' paddingBottom='0.5rem'>
            {/* To Do: 음식점 카테고리는 거르자. by 승준 */}
            {randomRestaurant.categories?.map((category) => (
              <Category key={category}>{category}</Category>
            ))}
          </Stack>
        </Flex>
        <Flex alignItems='center' justifyContent='space-between'>
          <Flex alignItems='end' gap='0.5rem'>
            <Heading
              size='lg'
              cursor='pointer'
              _hover={{
                textDecoration: 'underline',
              }}>
              {/* To Do: 특정 아이콘 클릭 시 가게 이름 복사되도록 clipboard api 이용해서 구현 by 승준 */}
              {randomRestaurant.placeName}
            </Heading>
            <BiRightArrowCircle size='1.1rem' cursor='pointer' />
          </Flex>
          <Box>
            <CloseButton onClick={onClose} />
          </Box>
        </Flex>
        <Box>{randomRestaurant.roadAddressName}</Box>
        <Box>{randomRestaurant.phoneNumber}</Box>
        {/* To Do: 넓이/높이(aspect ratio)랑 스크롤바 스타일링 필요 by 승준 */}
        <Button width='100%'>밥모임 참여하기</Button>
      </Box>
    );
  }
);

RandomRestaurantModal.displayName = 'RandomRestaurantModal';

export default RandomRestaurantModal;
