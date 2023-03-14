import { Flex } from '@chakra-ui/react';
import { setAccessToken } from 'apis/axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { isLoginState } from 'stores/auth';
import ROUTING_PATHS from 'utils/constants/routingPaths';

const OAuthLogin = () => {
  const router = useRouter();
  const setLoginState = useSetRecoilState(isLoginState);

  useEffect(() => {
    const token = router.query.accessToken as string;
    if (token) {
      setAccessToken(token);
      setLoginState(true);
      router.push(ROUTING_PATHS.HOME, undefined, { shallow: true });
    }
  }, [router]);

  return (
    <Flex height='100%' justifyContent='center' alignItems='center'>
      <Image src='/images/sausage.gif' alt='' width={480} height={480} />
    </Flex>
  );
};

export default OAuthLogin;
