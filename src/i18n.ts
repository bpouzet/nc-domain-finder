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
    fallbackLng: 'en',
    //language to use if translations in user language are not available
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    react: {
      useSuspense: false,
    },
    resources,
    returnNull: false,
  }) ;

export default i18next ;
