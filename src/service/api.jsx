
const HOST_URL = 'http://localhost:1337'

const api = () => {
    const timestape = new Date().getTime()
    const fetchData = (apiUrl) => {
        let responseClone;

        return fetch(HOST_URL + apiUrl)
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
        return fetchData('/api/getPromoList'+ `?t=${timestape}`)
    }

    const getLangList = (slug) => {
        return fetchData(`/api/getLocaleList/${slug}`+ `?t=${timestape}`)
    }

    const getPageData = (slug, locale) => {
        return fetchData(`/api/getPromo/${slug}?locale=${locale}`+ `&t=${timestape}`)
    }

    return { getPageData, getLangList, getPromoList, HOST_URL }
}

export default api;