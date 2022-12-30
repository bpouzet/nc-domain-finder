import i18next from 'i18next' ;
import { initReactI18next } from 'react-i18next' ;

const { languageDetectorPlugin } = require('./config/languageDetector') ;

import en from './translations/en.json' ;
import fr from './translations/fr.json' ;

export const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  }
} as const ;

void i18next
  .use(initReactI18next)
  .use(languageDetectorPlugin)
  .init({
    resources,
    //language to use if translations in user language are not available
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    react: {
      useSuspense: false,
    },
    returnNull: false,
  }) ;

export default i18next ;
