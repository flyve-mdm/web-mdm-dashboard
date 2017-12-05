import 'isomorphic-fetch'
const URL = "http://localhost:3004/invitations"

const invitations = {
    getAll: () => {
        return fetch(URL, { method: 'GET' })
            .then(response => Promise.all([response, response.json()]));
    }
}

export default invitations