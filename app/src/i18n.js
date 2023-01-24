import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationsDanish from './translations/dk.json';
import translationsEnglish from './translations/en.json';

const isDeployed = process.env.REACT_APP_LOGIN_URL?.includes('vercel');

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: !isDeployed,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: translationsEnglish
      },
      dk: {
        translation: translationsDanish
      }
    }
  });

export default i18n;