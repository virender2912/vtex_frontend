import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend) // Use the HTTP backend
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    backend: {
      // Path to translation files
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
