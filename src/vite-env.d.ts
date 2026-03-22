/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  /** Время жизни access token в минутах */
  readonly VITE_ACCESS_TOKEN_LIFETIME: string;
  /** Время жизни refresh token в днях */
  readonly VITE_REFRESH_TOKEN_LIFETIME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}