import 'dotenv/config' ;

import { ConfigContext } from 'expo/config' ;
import { MyExpoConfig } from '@customTypes/expoConfig' ;
import manifest from './package.json' ;

const IS_DEV = process.env.APP_ENV === 'development' ;

const VERSION = manifest.version ;
const PACKAGE = 'nc.domainFinder.app' + (IS_DEV ? '.dev' : '') ;

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
    },
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
  icon: ICON,
  ios: {
    bundleIdentifier: PACKAGE,
    infoPlist: {
      LSApplicationQueriesSchemes: [ 'itms-apps' ],
    },
    supportsTablet: true,
  },
  jsEngine: 'hermes',
  name: 'NC Domain Finder' + (IS_DEV ? ' (dev)' : ''),
  orientation: 'portrait',
  platforms: [
    'android',
    'ios',
  ],
  plugins: [
    [
      'expo-build-properties', {
        android: {
          allowBackup: false,
          enableProguardInReleaseBuilds: true,
          extraProguardRules: '-keep public class com.dylanvann.fastimage.* {*;}\n' +
            '-keep public class com.dylanvann.fastimage.** {*;}\n' +
            '-keep public class * implements com.bumptech.glide.module.GlideModule\n' +
            '-keep public class * extends com.bumptech.glide.module.AppGlideModule\n' +
            '-keep public enum com.bumptech.glide.load.ImageHeaderParser$** {\n' +
            '  **[] $VALUES;\n' +
            '  public *;\n' +
            '}',
        },
      },
    ],
    'expo-community-flipper',
    'sentry-expo',
  ],
  primaryColor: BG_COLOR,
  runtimeVersion: {
    policy: 'appVersion',
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
  },
  userInterfaceStyle: 'automatic',
  version: VERSION,
}) ;
