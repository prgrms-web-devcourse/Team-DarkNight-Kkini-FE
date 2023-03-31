import { Flex, Text } from '@chakra-ui/react';
import Button from 'components/common/Button';
import { ImBubble } from 'react-icons/im';
import { RedirectUrlType } from 'types/auth';

const KakaoButton = ({ urlAfterLogin }: RedirectUrlType) => {
  return (
    <a
      href={`${process.env.NEXT_PUBLIC_API_END_POINT}/oauth2/authorization/kakao?redirect_uri=${process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URL}?urlAfterLogin=${urlAfterLogin}`}>
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
    </a>
  );
};

export default KakaoButton;
