import { SkeletonCircle } from '@chakra-ui/react';
import styled from '@emotion/styled';
import LoginButton from 'components/Login/LoginButton';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { isLoginState } from 'stores/auth';
import { LoginModal } from 'types/modal';
import ROUTING_PATHS from 'utils/constants/routingPaths';

const DynamicUserProfile = dynamic(() => import('../UserProfile'), {
  ssr: false,
  loading: () => <SkeletonCircle />,
});

const Header = ({ isOpen, onClose, onOpen }: LoginModal) => {
  const isLogin = useRecoilValue(isLoginState);

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
      {isLogin ? (
        <DynamicUserProfile />
      ) : (
        <LoginButton isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
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
