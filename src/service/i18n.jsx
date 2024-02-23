import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../assets/i18n/en-US.json';
import cn from '../assets/i18n/zh-CN.json';

const resources = {
    'en-US': {
        translation: en,
    },
    'zh-CN': {
        translation: cn,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en-US',            //預設語言
    fallbackLng: 'en-US',     //如果當前切換的語言沒有對應的翻譯則使用這個語言，
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;