import { useSearchParams } from 'react-router-dom';
import api from './api.jsx';


const locale = () => {

    // 瀏覽器預設語系
    const getDefaultLang = () => {
        let defaultLang = ''
        switch (navigator.language.substring(0, 2)) {
            case 'zh':
                defaultLang = 'zh-CN'
                break;
            case 'id':
                defaultLang = 'id-ID'
                break;
            case 'th':
                defaultLang = 'th-TH'
                break;
            case 'vi':
                defaultLang = 'vi-VN'
                break;
            case 'ms':
                defaultLang = 'ms-MY'
                break;
            case 'ko':
                defaultLang = 'ko-KR'
                break;
            default:
                defaultLang = 'en-US'
        }

        return defaultLang;
    }

    // 語系對應名詞
    const localeName = (locale) => {
        switch (locale) {
            case 'en-US': return 'English';
            case 'zh-CN': return '简体中文';
            case 'vi-VN': return 'Tiếng Việt';
            case 'th-TH': return 'ไทย';
            case 'id-ID': return 'Bhs Indonesia';
            case 'ms-MY': return 'Melayu';
            case 'ko-KR': return '한국어';
            default: return null;
        }
    }

    return { getDefaultLang }
}

export default locale;