import 'dotenv/config' ;

import { ConfigContext } from 'expo/config' ;
import { MyExpoConfig } from '@customTypes/expoConfig' ;
import manifest from './package.json' ;

const VERSION = manifest.version ;
const CODE = 1 ;
const PACKAGE = 'nc.domainFinder.app' ;

export default ({ config }: ConfigContext): MyExpoConfig => ({
  ...config,
  android: {
    adaptiveIcon: {
      backgroundColor: '#194544',
      foregroundImage: './assets/images/adaptive-icon.png',
    },
    package: PACKAGE,
    versionCode: CODE,
  },
  assetBundlePatterns: [
    'src/assets/**/*',
  ],
  extra: {
    api: {
      key: process.env.API_KEY,
    },
    eas: {
      projectId: process.env.EAS_PROJECT_ID,
    },
    sentry: {
      dsn: process.env.SENTRY_DSN,
    },
  },
  hooks: {
    postPublish: [
      {
        config: {
          authToken: process.env.SENTRY_AUTH_TOKEN,
          organization: process.env.SENTRY_ORG,
          project: process.env.SENTRY_PROJECT,
        },
        file: 'sentry-expo/upload-sourcemaps',
      },
    ],
  },
  icon: './assets/images/icon.png',
  ios: {
    buildNumber: CODE.toString(),
    bundleIdentifier: PACKAGE,
    infoPlist: {
      LSApplicationQueriesSchemes: [ 'itms-apps' ],
    },
    supportsTablet: true,
  },
  jsEngine: 'hermes',
  name: 'NC Domain Finder',
  orientation: 'portrait',
  plugins: [
    [
      'expo-build-properties', {
        android: {
          allowBackup: false,
          enableProguardInReleaseBuilds: true,
        },
      },
    ],
    'expo-community-flipper',
    'sentry-expo',
  ],
  scheme: 'nc-domain-finder',
  slug: 'nc-domain-finder',
  splash: {
    backgroundColor: '#194544',
    image: './assets/images/splash.png',
    resizeMode: 'contain',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  userInterfaceStyle: 'automatic',
  version: VERSION,
}) ;
