import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { isLoginState } from 'stores/auth';
import { setAccessToken } from 'utils/apis/axios';

const OAuthLogin = () => {
  const router = useRouter();
  const setLoginState = useSetRecoilState(isLoginState);

  useEffect(() => {
    const token = router.query.accessToken as string;
    setAccessToken(token);
    setLoginState(true);
    router.push('/', undefined, { shallow: true });
  }, [router]);

  return <div>로그인 중..</div>;
};

export default OAuthLogin;
