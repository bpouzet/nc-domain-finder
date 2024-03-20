import 'dotenv/config'

import { ConfigContext } from 'expo/config' ;
import { MyExpoConfig } from '@customTypes/expoConfig' ;
import manifest from './package.json' ;

const IS_DEV = process.env.APP_ENV === 'development' ;
const IS_STAGING = process.env.APP_ENV === 'staging'

const VERSION = manifest.version ;
const PACKAGE = 'nc.domainFinder.app' + (IS_STAGING ? '.staging' : IS_DEV ? '.dev' : '') ;

const SPLASH = './assets/images/splash.png' ;
const ICON = './assets/images/' + (IS_DEV ? 'dev_' : '') + 'icon.png' ;
const ADAPTIVE_ICON = './assets/images/' + (IS_DEV ? 'dev_' : '') + 'adaptive-icon.png' ;

const BG_COLOR = '#194544' ;

export default ({ config }: ConfigContext): MyExpoConfig => ({
  ...config,
  android: {
    adaptiveIcon: {
      backgroundColor: BG_COLOR,
      foregroundImage: ADAPTIVE_ICON,
      monochromeImage: './assets/images/adaptive-monochrome-icon.png'
    },
    blockedPermissions: [
      'android.permission.READ_CALENDAR',
      'android.permission.WRITE_CALENDAR',
      'android.permission.SYSTEM_ALERT_WINDOW',
      'android.permission.READ_EXTERNAL_STORAGE',
      'android.permission.WRITE_EXTERNAL_STORAGE',
      'android.permission.VIBRATE',
    ],
    package: PACKAGE,
    permissions: [],
    softwareKeyboardLayoutMode: 'pan',
  },
  androidNavigationBar: {
    backgroundColor: BG_COLOR,
    barStyle: 'light-content',
  },
  androidStatusBar: {
    backgroundColor: BG_COLOR,
    barStyle: 'light-content',
    translucent: false,
  },
  assetBundlePatterns: [
    'src/assets/**/*',
  ],
  extra: {
    api: {
      key: process.env.API_KEY,
    },
    eas: {
      projectId: '9df8db98-43eb-41f6-a9e8-04873f919754',
    },
    sentry: {
      dsn: process.env.SENTRY_DSN,
    },
  },
  icon: ICON,
  ios: {
    bundleIdentifier: PACKAGE,
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
      LSApplicationQueriesSchemes: [ 'itms-apps' ],
    },
    supportsTablet: true,
  },
  jsEngine: 'hermes',
  locales: {
    en: './assets/translations/en.json',
    fr: './assets/translations/fr.json',
  },
  name: 'NC Domain Finder' + (IS_STAGING ? ' (staging)' : IS_DEV ? '(dev)' : ''),
  orientation: 'portrait',
  platforms: [
    'android',
    'ios',
  ],
  plugins: [
    [
      '@sentry/react-native/expo',
      {
        organization: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        url: 'https://sentry.io/',
      },
    ],
    [
      'expo-build-properties', {
        android: {
          allowBackup: false,
          enableShrinkResourcesInReleaseBuilds: true,
          enableProguardInReleaseBuilds: true,
          //newArchEnabled: true,
        },
        ios: {
          //newArchEnabled: true,
        },
      },
    ],
    [
      'expo-font', {
        fonts: ['assets/fonts/SpaceMono.ttf'],
      },
    ],
    'expo-localization',
  ],
  primaryColor: BG_COLOR,
  runtimeVersion: {
    policy: 'sdkVersion',
  },
  scheme: 'nc-domain-finder',
  slug: 'nc-domain-finder',
  splash: {
    backgroundColor: BG_COLOR,
    image: SPLASH,
    resizeMode: 'contain',
  },
  updates: {
    fallbackToCacheTimeout: 0,
    url: 'https://u.expo.dev/9df8db98-43eb-41f6-a9e8-04873f919754',
  },
  //userInterfaceStyle: 'automatic',
  version: VERSION,
}) ;
