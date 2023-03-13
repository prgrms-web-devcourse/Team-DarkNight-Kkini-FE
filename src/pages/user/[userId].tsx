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
import UserPageButton from 'components/User/UserPageButton';
import UserPageCount from 'components/User/UserPageCount';
import UserPageItem from 'components/User/UserPageItem';
import { motion } from 'framer-motion';
import { useGetSpecificUser, useGetUser } from 'hooks/query/useUser';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { logout } from 'services/auth';
import ROUTING_PATHS from 'utils/constants/routingPaths';
import { isMyProfile } from 'utils/validations/user';

const UserPage = ({ userId }: { userId: string }) => {
  const router = useRouter();

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
    isSuccess && (
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
            <Avatar src={data.profileImgUrl} width='65' height='65' mr='0.5rem' />
            <Flex flex='1' justify='space-between' align='center' px='2.2rem'>
              <UserPageCount name='방장 횟수' value={data.leaderCount}></UserPageCount>
              <UserPageCount name='밥모임 횟수' value={data.crewCount}></UserPageCount>
            </Flex>
          </Flex>
          <UserPageItem name='닉네임'>
            <Box>{data.nickname}</Box>
          </UserPageItem>
          <UserPageItem name='매너점수'>
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
          </UserPageItem>
          <UserPageItem name='맛잘알 점수'>
            <Box textAlign='center' w='100%' h='2rem'>
              <Text fontSize='2xl'>{data.tasteScore} 점</Text>
            </Box>
          </UserPageItem>
          <UserPageItem name='한줄소개'>
            <Box textAlign='center' w='100%' h='2rem'>
              <Text fontSize='md'>{data.introduction} </Text>
            </Box>
          </UserPageItem>
          {isMyProfile(MyUserData?.id, userId) && (
            <>
              <UserPageButton
                buttonText='정보 수정하기'
                onClick={handleClickEditProfileButton}
              />
              <UserPageButton
                buttonText='로그아웃 하기'
                onClick={handleClickLogoutButton}
              />
            </>
          )}
        </Flex>
      </motion.div>
    )
  );
};

export default UserPage;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId } = context.query;

  return {
    props: {
      userId,
    },
  };
};
