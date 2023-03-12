import {
  Avatar,
  Box,
  Flex,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderTrack,
  Text,
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import MyPageButton from 'components/User/MyPageButton';
import MyPageCount from 'components/User/MyPageCount';
import MyPageItem from 'components/User/MyPageItem';
import { motion } from 'framer-motion';
import { useGetSpecificUser } from 'hooks/query/useUser';
import { useRouter } from 'next/router';

const MyPage = () => {
  const router = useRouter();

  const { userId } = router.query;

  const { data, isLoading, error } = useGetSpecificUser(userId as string);

  if (isLoading) return <div></div>;
  if (error) return <div>{error.toString()}</div>;

  return (
    <motion.div
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.75 }}
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-color: #f9f9f9;
      `}>
      <Flex
        direction='column'
        bgColor='white'
        w='90%'
        h='95%'
        borderRadius={8}
        p='1rem 1.5rem'>
        <Flex w='100%' py='0.5rem'>
          <Heading fontSize='2xl'>내 프로필</Heading>
        </Flex>
        <Flex h='5rem' align='center'>
          <Avatar src={data?.profileImgUrl} width='65' height='65' mr='0.5rem' />
          <Flex flex='1' justify='space-between' align='center' px='2.2rem'>
            <MyPageCount name='방장 횟수' value={data?.leaderCount}></MyPageCount>
            <MyPageCount name='밥모임 횟수' value={data?.crewCount}></MyPageCount>
          </Flex>
        </Flex>
        <MyPageItem name='닉네임'>
          <Box>{data?.nickname}</Box>
        </MyPageItem>
        <MyPageItem name='매너점수'>
          <Slider
            aria-label='slider-ex-2'
            colorScheme={(data?.mannerScore as number) >= 36.5 ? 'cyan' : 'orange'}
            defaultValue={data?.mannerScore}
            max={60}
            isDisabled>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderMark
              value={data?.mannerScore as number}
              textAlign='center'
              border='1px solid gray.800'
              borderRadius='8px'
              bg='blue.500'
              color='white'
              mt='3'
              ml='-7'
              px='1'
              w='15'>
              {data?.mannerScore} &#8451;
            </SliderMark>
          </Slider>
        </MyPageItem>
        <MyPageItem name='맛잘알 점수'>
          <Box textAlign='center' w='100%' h='2rem'>
            <Text fontSize='2xl'>{data?.tasteScore} 점</Text>
          </Box>
        </MyPageItem>
        <MyPageItem name='한줄소개'>
          <Box textAlign='center' w='100%' h='2rem'>
            <Text fontSize='md'>{data?.introduction} </Text>
          </Box>
        </MyPageItem>
        <MyPageButton buttonText='정보 수정하기' />
        <MyPageButton buttonText='로그아웃 하기' />
      </Flex>
    </motion.div>
  );
};

export default MyPage;
