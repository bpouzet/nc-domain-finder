import AsyncStorage from '@react-native-async-storage/async-storage' ;
import * as Localization from 'expo-localization' ;
import * as Sentry from 'sentry-expo' ;

const STORE_LOCALE_KEY = 'settings.locale' ;

const languageDetectorPlugin = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async function (callback: (lang: string) => void) {
    try {
      //get stored language from Async storage
      await AsyncStorage.getItem(STORE_LOCALE_KEY).then((language) => {
        if (language) {
          //if language was stored before, use this language in the app
          return callback(language) ;
        } else {
          //if language was not stored yet, use device's locale
          return callback(Localization.locale) ;
        }
      }) ;
    } catch (error) {
      Sentry.Native.captureException(error) ;
    }
  },
  cacheUserLanguage: async function (language: string) {
    try {
      //save a user's language choice in Async storage
      await AsyncStorage.setItem(STORE_LOCALE_KEY, language) ;
    } catch (error) {
      Sentry.Native.captureException(error) ;
    }
  },
} ;

module.exports = { languageDetectorPlugin } ;
