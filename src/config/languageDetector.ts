import * as Localization from 'expo-localization' ;
import * as Sentry from '@sentry/react-native' ;
import AsyncStorage from 'expo-sqlite/kv-store' ;
import type { LanguageDetectorAsyncModule } from 'i18next' ;

const STORE_LOCALE_KEY = 'settings.locale' ;

export const initLanguageDetector: LanguageDetectorAsyncModule = {
  async: true,
  cacheUserLanguage: async function (language: string) {
    try {
      //save a user's language choice in Async storage
      await AsyncStorage.setItem(STORE_LOCALE_KEY, language) ;
    } catch (error) {
      Sentry.captureException(error) ;
    }
  },
  detect: async function (callback: (lng: (string)) => undefined): Promise<string | undefined> {
    try {
      //get stored language from Async storage
      await AsyncStorage.getItem(STORE_LOCALE_KEY).then((language) => {
        if (language) {
          //if language was stored before, use this language in the app
          return callback(language) ;
        } else {
          let deviceLocale = 'en' ;

          try {
            //if language was not stored yet, use device's locale
            const locales = Localization.getLocales() ;
            if (locales.length > 0 && locales[0]?.languageCode) {
              deviceLocale = locales[0].languageCode ;
            }
          } catch (e) {
            Sentry.captureException(e) ;
          }

          return callback(deviceLocale) ;
        }
      }) ;
    } catch (error) {
      Sentry.captureException(error) ;
      return undefined ;
    }
  },
  type: 'languageDetector',
} ;
