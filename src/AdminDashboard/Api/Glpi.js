import 'isomorphic-fetch'
const URL = "https://dev.flyve.org/glpi/apirest.php/"
// const URL = "http://glpis42.local/apirest.php/"
const userToken = "zq6xxHdUwJfh1pnTcKi66sLvX978KKGVvOFK9LBS"
const headersInitSession = new Headers({
    "Content-Type": "application/json",
    "Authorization": "user_token " + userToken
})

const glpi = {
    initSession: () => {
        return fetch(URL+"initSession/", {
            method: 'POST',
            headers: headersInitSession
        })
        .then(response => Promise.all([response, response.json()]))
    },
    register: (payload, options) => {
        return fetch(URL+"User/", {
            method: 'POST',
            headers: options,
            body: JSON.stringify(payload)
        })
        .then(response => Promise.all([response, response.json()]))
    }
}

export default glpi