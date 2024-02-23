import api from "./api";
import i18n from "./i18n";

export const checkExpired = (time) => {
    let now = new Date();
    let expiredTime = new Date(time);
    return (expiredTime - now) < 0;
}

export const datePad = (num) => ('0' + num).slice(-2);

// AM/PM 轉換
export const formatAMPM = (time) => {
    return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}

// 月份轉換
export const formatMonth = (time, isShort = false) => {
    return time.toLocaleString(i18n.language, { month: isShort ? 'short' : 'long' });
}

// st, nd, rd, th 判定
export const getOrdinalSuffix = (num) => {
    let j = num % 10,
        k = num % 100;
    if (j == 1 && k != 11) {
        return "st";
    }
    if (j == 2 && k != 12) {
        return "nd";
    }
    if (j == 3 && k != 13) {
        return "rd";
    }
    return "th";
}

// htmlImg 處理
export const htmlImg = (htmlStr) => {
    if (!htmlStr) return null;
    const { HOST_URL } = api()
    let buffer = htmlStr.replace(/<img[^>]*>/g, function (match) {
        return match.replace(/<img\s+src="(?:https?:\/\/[^\/]+)?(\/[^"]+)"[^>]*>/g, '<img src="' + HOST_URL + '$1">');
    })

    return buffer
}

// 合併子陣列
export const mergedArray = (arr) => arr.reduce((accumulator, currentValue) => {
    return accumulator.concat(currentValue);
}, []);