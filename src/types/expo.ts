import { ExpoConfig } from 'expo/config' ;

export interface MyExpoConfig extends Omit<ExpoConfig, 'extra'> {
  extra: {
    eas: {
      projectId: string
    },
    sentry: {
      dsn: string
    }
  }
}
