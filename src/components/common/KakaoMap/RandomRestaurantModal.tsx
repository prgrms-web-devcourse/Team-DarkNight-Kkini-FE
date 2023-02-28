import { Box, CloseButton, Flex, Heading, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import { forwardRef } from 'react';
import { BiRightArrowCircle } from 'react-icons/bi';
import { RandomRestaurantType } from 'types/kakaoMap';

import Button from '../Button';
import Category from '../Category';

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
          <Stack direction='row' paddingBottom='0.5rem'>
            <Category>{randomRestaurant.isOpen ? '영업 중' : '영업 종료'}</Category>
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
              {randomRestaurant.placeName}
            </Heading>
            <BiRightArrowCircle size='1.1rem' cursor='pointer' />
          </Flex>
          <Box>
            <CloseButton onClick={onClose} />
          </Box>
        </Flex>
        {/* To Do: 별점 by 승준 */}
        <Box>{randomRestaurant.roadAddressName}</Box>
        <Box>{randomRestaurant.phoneNumber}</Box>
        {/* To Do: 넓이/높이(aspect ratio)랑 스크롤바 스타일링 필요 by 승준 */}
        <Flex overflowX='auto' gap='1rem'>
          {randomRestaurant.photoUrls?.map((photoUrl) => (
            <Image
              priority
              key={photoUrl}
              src={photoUrl}
              width={120}
              height={90}
              alt='음식점 사진'
            />
          ))}
        </Flex>
        <Button width='100%'>밥모임 참여하기</Button>
      </Box>
    );
  }
);

export default RandomRestaurantModal;
