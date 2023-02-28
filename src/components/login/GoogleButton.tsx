import { Flex, Text } from '@chakra-ui/react';
import Button from 'components/common/Button';
import { FcGoogle } from 'react-icons/fc';

const GoogleButton = () => {
  return (
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
  );
};

export default GoogleButton;
