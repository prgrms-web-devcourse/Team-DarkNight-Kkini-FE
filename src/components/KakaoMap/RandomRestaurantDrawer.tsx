import { Box, CloseButton, Flex, Heading, Stack } from '@chakra-ui/react';
import BottomDrawer from 'components/common/BottomDrawer';
import Button from 'components/common/Button';
import Category from 'components/common/Category';
import { BiRightArrowCircle } from 'react-icons/bi';
import { RandomRestaurantType } from 'types/kakaoMap';

type RandomRestaurantDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  randomRestaurant: RandomRestaurantType;
};

const RandomRestaurantDrawer = ({
  isOpen,
  onClose,
  randomRestaurant,
}: RandomRestaurantDrawerProps) => {
  return (
    <BottomDrawer
      isOpen={isOpen}
      onClose={onClose}
      header={
        <>
          <Stack direction='row' paddingBottom='0.5rem'>
            {randomRestaurant.categories?.map((category) => (
              <Category key={category}>{category}</Category>
            ))}
          </Stack>
          <Flex alignItems='center' justifyContent='space-between'>
            <Flex alignItems='end' gap='0.5rem'>
              <Heading
                size='lg'
                cursor='pointer'
                _hover={{
                  textDecoration: 'underline',
                }}>
                {/* To Do: 특정 아이콘 클릭 시 가게 이름 복사되도록 clipboard api 이용해서 구현 by 승준 */}
                <a
                  href={randomRestaurant.kakaoPlaceUrl}
                  target='_blank'
                  rel='noreferrer noopener'>
                  {randomRestaurant.placeName}
                </a>
              </Heading>
              <BiRightArrowCircle size='1.1rem' cursor='pointer' />
            </Flex>
            <Box>
              <CloseButton onClick={onClose} />
            </Box>
          </Flex>
        </>
      }
      body={
        <>
          <Box>{randomRestaurant.roadAddressName}</Box>
          <Box>{randomRestaurant.phoneNumber}</Box>
          <Button width='100%'>밥모임 참여하기</Button>
        </>
      }
    />
  );
};

export default RandomRestaurantDrawer;
