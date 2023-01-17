declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      NODE_ENV: 'development' | 'production';
      EAS_PROJECT_ID: string;
      SENTRY_AUTH_TOKEN: string;
      SENTRY_DSN: string;
      SENTRY_ORG: string;
      SENTRY_PROJECT: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {} ;
