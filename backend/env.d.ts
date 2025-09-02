declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    NODE_ENV?: 'development' | 'test' | 'production';
  }
}