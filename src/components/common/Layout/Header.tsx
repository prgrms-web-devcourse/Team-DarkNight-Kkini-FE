import { Avatar } from '@chakra-ui/react';
import styled from '@emotion/styled';
import LoginButton from 'components/login/LoginButton';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { isLogin } from 'stores/auth';

const Header = () => {
  const isLoginState = useRecoilValue(isLogin);

  return (
    <Container>
      <Link href='/'>
        <Image
          src='/assets/kkini-logo.svg'
          alt='kkini-logo'
          width='200'
          height='100'
          style={{ marginLeft: '-40px' }}
        />
      </Link>
      {isLoginState ? (
        <Avatar src='https://bit.ly/broken-link' size='sm' />
      ) : (
        <LoginButton />
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
