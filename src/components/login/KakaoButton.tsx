import { Flex, Text } from '@chakra-ui/react';
import Button from 'components/common/Button';
import { ImBubble } from 'react-icons/im';

const KakaoButton = () => {
  return (
    <Button
      style={{
        color: 'black',
        backgroundColor: '#FEE500',
        fontWeight: 600,
      }}>
      <Flex alignItems='center'>
        <ImBubble style={{ marginRight: '10px' }} />
        <Text>카카오 계정으로 로그인</Text>
      </Flex>
    </Button>
  );
};

export default KakaoButton;