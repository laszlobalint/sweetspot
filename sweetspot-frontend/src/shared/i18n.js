import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(detector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'hu',
    fallbackLng: 'en',
    debug: false,
    nsSeparator: false,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true,
    },
    ns: ['translations'],
    defaultNS: 'translations',
    backend: {
      loadPath: 'i18n/{{ns}}/{{lng}}.json',
    },
  });

export default i18n;
