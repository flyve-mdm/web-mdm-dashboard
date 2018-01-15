import 'isomorphic-fetch'
const URL = "http://glpis42.local/apirest.php/"
const userToken = "MIjQRsCzLeBxnhisscm88H7LAu7xOsiNT7Ibgugx"
let sessionToken = ""
let headers = new Headers({
    "Content-Type": "application/json"
})

const glpi = {
    sessionToken: (token) => {
        sessionToken = token
    },
    initSession: () => {
        headers.append("Authorization", `user_token ${userToken}`)
        return fetch(`${URL}initSession/`, {
            method: 'GET',
            headers: headers
        })
        .then(response => Promise.all([response, response.json()]))
    },
    register: (payload, options) => {
        headers.append("Session-Token", sessionToken)
        return fetch(`${URL}User/`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        })
        .then(response => Promise.all([response, response.json()]))
    }, 
    killSession: () => {
        if (!headers.has("Session-Token")) {
            headers.append("Session-Token", sessionToken)
        }
        return fetch(`${URL}killSession/`, {
            method: 'GET',
            headers: headers
        })
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response)
            } else {
                return Promise.reject(new Error(response.statusText))
            }
        })
    }
}

export default glpi