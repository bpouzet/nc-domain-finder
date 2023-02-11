import i18next from 'i18next' ;
import { initReactI18next } from 'react-i18next' ;

import { initLanguageDetector } from '@config/languageDetector' ;

import en from './translations/en.json' ;
import fr from './translations/fr.json' ;

export const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
} as const ;

void i18next
  .use(initReactI18next)
  .use(initLanguageDetector)
  .init({
    //language to use if translations in user language are not available
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    react: {
      useSuspense: false,
    },
    resources,
    returnNull: false,
    supportedLngs: [ 'en', 'fr' ],
  }) ;

export default i18next ;
