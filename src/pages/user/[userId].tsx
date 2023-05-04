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
import GoHomeWhenErrorInvoked from 'components/common/GoHomeWhenErrorInvoked';
import UserProfileButton from 'components/User/UserProfileButton';
import UserProfileCount from 'components/User/UserProfileCount';
import UserProfileItem from 'components/User/UserProfileItem';
import { motion } from 'framer-motion';
import { useGetSpecificUser, useGetUser } from 'hooks/query/useUser';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { logout } from 'services/auth';
import ROUTING_PATHS from 'utils/constants/routingPaths';
import { isMyProfile } from 'utils/validations/user';

const UserPage = () => {
  const router = useRouter();
  const userId = router.query.userId as string;

  const { data: MyUserData } = useGetUser();
  const { data, isLoading, error, isSuccess } = useGetSpecificUser(userId);

  if (isLoading) return <div></div>;
  if (error) return <GoHomeWhenErrorInvoked />;

  const handleClickEditProfileButton = () => {
    router.push(ROUTING_PATHS.USER.EDIT_PROFILE);
  };

  const handleClickLogoutButton = () => {
    logout();
    window.location.replace(ROUTING_PATHS.HOME);
  };
  return (
    <>
      <Head>
        <title>나의 프로필</title>
      </Head>
      {isSuccess ? (
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
              <Heading fontSize='2xl'>프로필</Heading>
            </Flex>
            <Flex h='5rem' align='center'>
              <Avatar
                src={data.profileImgUrl}
                size='lg'
                mr='0.5rem'
                name={`${data.nickname} 아바타 사진`}
              />
              <Flex flex='1' justify='center' align='center' px='1.25rem' gap='1.5rem'>
                <UserProfileCount
                  name='방장 횟수'
                  value={data.leaderCount}></UserProfileCount>
                <UserProfileCount
                  name='밥모임 횟수'
                  value={data.crewCount}></UserProfileCount>
              </Flex>
            </Flex>
            <UserProfileItem name='닉네임'>
              <Box>{data.nickname}</Box>
            </UserProfileItem>
            <UserProfileItem name='매너점수'>
              <Slider
                aria-label='slider-ex-2'
                colorScheme={data.mannerScore >= 36.5 ? 'cyan' : 'orange'}
                defaultValue={data.mannerScore}
                max={60}
                isDisabled>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderMark
                  value={data.mannerScore}
                  textAlign='center'
                  border='1px solid gray.800'
                  borderRadius='8px'
                  bg='blue.500'
                  color='white'
                  mt='3'
                  ml='-7'
                  px='1'
                  w='15'>
                  {data.mannerScore} &#8451;
                </SliderMark>
              </Slider>
            </UserProfileItem>
            <UserProfileItem name='맛잘알 점수'>
              <Box textAlign='center' w='100%' h='2rem'>
                <Text fontSize='2xl'>{data.tasteScore} 점</Text>
              </Box>
            </UserProfileItem>
            <UserProfileItem name='한줄소개'>
              <Box textAlign='center' w='100%' h='2rem'>
                <Text fontSize='md'>{data.introduction} </Text>
              </Box>
            </UserProfileItem>
            {isMyProfile(MyUserData?.id, userId) && (
              <>
                <UserProfileButton
                  buttonText='정보 수정하기'
                  onClick={handleClickEditProfileButton}
                />
                <UserProfileButton
                  buttonText='로그아웃 하기'
                  onClick={handleClickLogoutButton}
                />
              </>
            )}
          </Flex>
        </motion.div>
      ) : (
        <GoHomeWhenErrorInvoked />
      )}
    </>
  );
};

export default UserPage;
