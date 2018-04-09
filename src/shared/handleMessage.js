import config from '../config/config.json'

export default ({type='info', message}) => {
    let response = {
        type: type,
        title: config.appName,
        body: message ? message.statusText : ''
    }
    if (message) {
        switch (true) {
            case (message.status === 0):
                response.title = message.data[0][0]
                response.body = 'No Internet Connection'
                break
            case (message.status === 401):
                response.title = message.data[0][0]
                response.body = message.data[0][1] !== '' ? message.data[0][1] : message.statusText
                break
            case (message.status === 404):
                response.title = message.data[0][0]
                response.body = message.data[0][1] !== '' ? message.data[0][1] : message.statusText
                break
            case (message.status >= 400 && message.status < 500 && message.status !== 401):
                response.title = message.data[0]
                response.body = message.data[0][1] ? message.data[0][1] : message.statusText
                break
            default:
                break
        }
    }
    return response
}