import type { ExpoConfig } from 'expo/config' ;

export interface MyExpoConfig extends Omit<ExpoConfig, 'extra'> {
  extra: {
    api: {
      key: string
    },
    eas: {
      projectId: string
    },
    sentry: {
      dsn: string
    }
  }
}
