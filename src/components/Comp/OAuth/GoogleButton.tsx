import { Flex, Text } from '@chakra-ui/react';
import Button from 'components/common/Button';
import { FcGoogle } from 'react-icons/fc';

const GoogleButton = () => {
  return (
    <a
      href={`http://ec2-3-35-95-125.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google?redirect_uri=${process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URL}`}>
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
