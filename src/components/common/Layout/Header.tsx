import { SkeletonCircle } from '@chakra-ui/react';
import styled from '@emotion/styled';
import LoginButton from 'components/Login/LoginButton';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { isLoginState } from 'stores/auth';
import { LoginModal } from 'types/modal';

const DynamicUserProfile = dynamic(() => import('../UserProfile'), {
  ssr: false,
  loading: () => <SkeletonCircle />,
});

const Header = ({ isOpen, onClose, onOpen }: LoginModal) => {
  const isLogin = useRecoilValue(isLoginState);

  return (
    <Container>
      <Link href='/'>
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
  align-items: center;
  justify-content: space-between;
  height: 2rem;
  margin: 0.75rem;
`;
