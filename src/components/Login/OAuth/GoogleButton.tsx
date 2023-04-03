import { Flex, Text } from '@chakra-ui/react';
import Button from 'components/common/Button';
import { FcGoogle } from 'react-icons/fc';
import { RedirectUrlType } from 'types/auth';

const GoogleButton = ({ urlAfterLogin }: RedirectUrlType) => {
  return (
    <a
      href={`${process.env.NEXT_PUBLIC_API_END_POINT}/oauth2/authorization/google?redirect_uri=${process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URL}?urlAfterLogin=${urlAfterLogin}`}>
      <Button
        style={{
          color: '#777776',
          backgroundColor: '#F1F3F4',
          fontWeight: 600,
        }}>
        <Flex alignItems='center'>
          <FcGoogle style={{ marginRight: '10px' }} />
          <Text>구글 계정으로 로그인</Text>
        </Flex>
      </Button>
    </a>
  );
};

export default GoogleButton;
