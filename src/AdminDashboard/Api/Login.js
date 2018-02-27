import 'isomorphic-fetch'
const URL = "http://localhost:3004/login"

const login = {
    singUp: (user, password) => {
        return fetch(URL, { 
            method: 'POST',
            body: JSON.stringify({ user , password })
        })
            .then(response => Promise.all([response, response.json()]))
    },
    recoverPassword: (user) => {
        return fetch(URL, { 
            method: 'POST',
            body: JSON.stringify({ user })
        })
            .then(response => Promise.all([response, response.json()]))
    }
}

export default login