import { Box, CloseButton, Flex, Heading, Image, Stack } from '@chakra-ui/react';
import BottomDrawer from 'components/common/BottomDrawer';
import Button from 'components/common/Button';
import Category from 'components/common/Category';
import { BiRightArrowCircle } from 'react-icons/bi';
import { Restaurant } from 'types/restaurant';

type RestaurantBottomDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onClickJoinButton?: () => void;
  restaurant: Restaurant;
};

const RestaurantBottomDrawer = ({
  isOpen,
  onClose,
  onClickJoinButton,
  restaurant,
}: RestaurantBottomDrawerProps) => {
  return (
    <BottomDrawer
      isOpen={isOpen}
      onClose={onClose}
      header={
        <>
          <Stack direction='row' paddingBottom='0.5rem'>
            {restaurant.categories?.map((category) => (
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
                  href={restaurant.kakaoPlaceUrl}
                  target='_blank'
                  rel='noreferrer noopener'>
                  {restaurant.placeName}
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
          <Box>{restaurant.roadAddressName}</Box>
          <Box>{restaurant.phoneNumber}</Box>
          {restaurant.photoUrls && (
            // To Do: 스크롤 디자인 필요 by 승준
            <Flex gap='1rem' marginTop='0.5rem' overflowX='auto'>
              {restaurant.photoUrls.map((photoUrl) => (
                <Image
                  key={photoUrl}
                  referrerPolicy='no-referrer'
                  borderRadius={8}
                  boxSize='7rem'
                  objectFit='cover'
                  src={photoUrl}
                  alt={restaurant.placeName + '사진'}
                />
              ))}
            </Flex>
          )}
          {onClickJoinButton && (
            <Button
              onClick={onClickJoinButton}
              width='100%'
              style={{
                backgroundColor: 'primary',
                marginTop: '1rem',
                color: 'white',
                fontWeight: 700,
              }}>
              밥모임 참여하기
            </Button>
          )}
        </>
      }
    />
  );
};

export default RestaurantBottomDrawer;
