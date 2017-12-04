import 'isomorphic-fetch'
const URL = "http://localhost:3004/devices"

export function getDevices() {
    return fetch(URL, { method: 'GET' })
        .then(response => Promise.all([response, response.json()]));
}