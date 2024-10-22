declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      JWT_SECRET: string;
    }
  }
}
