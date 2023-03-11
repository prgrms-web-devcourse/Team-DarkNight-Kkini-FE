import { Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import styled from '@emotion/styled';
import LoginButton from 'components/Login/LoginButton';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { isCheckingRefreshTokenState, isLoginState } from 'stores/auth';
import ROUTING_PATHS from 'utils/constants/routingPaths';

const ProfileSkeleton = () => {
  return (
    <Flex alignItems='center'>
      <Skeleton width='7rem' height='1.75rem' marginRight='0.5rem' />
      <SkeletonCircle size='10' />
    </Flex>
  );
};

const DynamicUserProfile = dynamic(() => import('../UserProfile'), {
  ssr: false,
  loading: () => <ProfileSkeleton />,
});

const Header = () => {
  const isLogin = useRecoilValue(isLoginState);
  const isCheckingRefreshToken = useRecoilValue(isCheckingRefreshTokenState);

  return (
    <Container>
      <Link href={ROUTING_PATHS.HOME}>
        <Image
          src='/images/kkini-logo.svg'
          alt='kkini-logo'
          width='200'
          height='100'
          style={{ marginLeft: '-40px' }}
        />
      </Link>
      {isCheckingRefreshToken ? (
        isLogin ? (
          <DynamicUserProfile />
        ) : (
          <LoginButton />
        )
      ) : (
        <ProfileSkeleton />
      )}
    </Container>
  );
};

export default Header;

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2rem;
  margin: 0.75rem;
`;
