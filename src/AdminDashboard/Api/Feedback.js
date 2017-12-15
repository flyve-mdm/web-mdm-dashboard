import 'isomorphic-fetch'
const URL = "http://localhost:3004/feedback"

const feedback = {
    sendFeedback: () => {
        return fetch(URL, { method: 'POST' })
            .then(response => Promise.all([response, response.json()]));
    }
}

export default feedback