/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SERVER_WEBSOCKET_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}