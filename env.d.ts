declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_KAKAO_MAP_API_KEY: string;
    readonly NEXT_PUBLIC_GOOGLE_MAP_API_KEY: string;

    readonly NEXT_PUBLIC_OAUTH_REDIRECT_URL: string;
  }
}
