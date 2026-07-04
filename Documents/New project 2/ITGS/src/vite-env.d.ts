/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_API_KEY?: string;
  readonly VITE_CALENDLY_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.svg' {
  const content: string;
  export default content;
}
