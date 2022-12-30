import 'dotenv/config' ;

import { ConfigContext } from 'expo/config' ;
import manifest from './package.json' ;
import { MyExpoConfig } from 'src/types/expo' ;

const VERSION = manifest.version ;
const CODE = 1 ;
const PACKAGE = 'nc.domainFinder.app' ;

export default ({ config }: ConfigContext): MyExpoConfig => ({
  ...config,
  name: 'NC Domain Finder',
  slug: 'nc-domain-finder',
  version: VERSION,
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'nc-domain-finder',
  userInterfaceStyle: 'automatic',
  jsEngine: 'hermes',
  runtimeVersion: {
    policy: 'nativeVersion'
  },
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#194544'
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    'src/assets/**/*'
  ],
  ios: {
    supportsTablet: true,
    infoPlist: {
      LSApplicationQueriesSchemes: ['itms-apps']
    },
    bundleIdentifier: PACKAGE,
    buildNumber: CODE.toString()
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#194544'
    },
    package: PACKAGE,
    versionCode: CODE
  },
  plugins: [
    [
      'expo-build-properties', {
        android: {
          allowBackup: false,
          enableProguardInReleaseBuilds: true
        }
      }
    ],
    'expo-community-flipper',
    'sentry-expo'
  ],
  hooks: {
    postPublish: [
      {
        file: 'sentry-expo/upload-sourcemaps',
        config: {
          organization: process.env.SENTRY_ORG,
          project: process.env.SENTRY_PROJECT,
          authToken: process.env.SENTRY_AUTH_TOKEN
        }
      }
    ]
  },
  extra: {
    eas: {
      projectId: process.env.EAS_PROJECT_ID
    },
    sentry: {
      dsn: process.env.SENTRY_DSN
    }
  }
}) ;
