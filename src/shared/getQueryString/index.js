/**
 * Get queryString of the history
 * @function getQueryString
 * @param {object} history
 * @return {object}
 */
export default (history) => {
    let search = history.location.search.split('&')
    search[0] = search[0].substring(1)
    let queryString = {}
    search.forEach(element => {
        const query = element.split('=')
        queryString = {
            ...queryString,
            [query[0]]: query[1]
        }
    })
    return queryString
}