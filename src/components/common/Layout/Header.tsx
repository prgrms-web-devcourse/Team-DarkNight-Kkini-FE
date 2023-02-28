import { Avatar, Flex, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import LoginButton from 'components/login/LoginButton';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { isLogin } from 'stores/auth';
import { GangwonEduFont } from 'styles/fonts';

const Header = () => {
  const isLoginState = useRecoilValue(isLogin);

  return (
    <Container>
      <Link href='/'>
        <Flex alignItems='center'>
          <Image src='/assets/kkini-logo.svg' alt='kkini-logo' width='30' height='30' />
          <Text
            fontSize='1.6rem'
            marginLeft='0.5rem'
            className={GangwonEduFont.className}>
            끼니
          </Text>
        </Flex>
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
  align-items: center;
  justify-content: space-between;
  height: 2rem;
  margin: 0.75rem;
`;
