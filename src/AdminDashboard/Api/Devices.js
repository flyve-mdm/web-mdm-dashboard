import 'isomorphic-fetch'
const URL = "http://localhost:3004/devices"

const devices = {
    getAll: () => {
        return fetch(URL, { method: 'GET' })
            .then(response => Promise.all([response, response.json()]));
    }
}

export default devices