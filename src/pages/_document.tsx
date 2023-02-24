import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

const Document = () => {
  return (
    <Html lang='ko'>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${
            process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY as string
          }&libraries=services,clusterer&autoload=false`}
          strategy='beforeInteractive'
        />
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${
            process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string
          }&libraries=services,clusterer&autoload=false`}
          strategy='beforeInteractive'
        />
      </body>
    </Html>
  );
};

export default Document;
