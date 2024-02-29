
const DEFAULT_HOST = 'https://spade-event.com';
const ON_LOCALHOST = location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === ""
const HOST_URL = (ON_LOCALHOST ? DEFAULT_HOST : window.location.origin) + '/dev/data/';

const api = () => {
    const timestape = new Date().getTime()
    const fetchData = (apiUrl) => {
        let responseClone;

        return fetch(HOST_URL + apiUrl + `?t=${timestape}`)
            .then(response => {
                responseClone = response.clone();
                return responseClone.json()
            })
            .then(json => json)
            .catch((error) => {
                console.log('error :(', error)
                return error
            })
    }

    const getPromoList = () => {
        return fetchData('promoList.json')
    }

    const getLangList = (slug) => {
        return fetchData(`${slug}/localeList.json`)
    }

    const getPageData = (slug, locale) => {
        return fetchData(`${slug}/${locale}.json`)
    }

    return { getPageData, getLangList, getPromoList, HOST_URL }
}

export default api;