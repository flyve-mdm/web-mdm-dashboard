import config from '../config/config.json'

export default ({type='info', error}) => {
    let message = {
        type: type,
        title: config.appName,
        body: error.statusText
    }
    switch (true) {
        case (error.status === 0):
            message.title = error.data[0][0]
            message.body = 'No Internet Connection'
            break;
        case (error.status === 401):
            message.title = error.data[0][0]
            message.body = error.data[0][1] !== '' ? error.data[0][1] : error.statusText
            break;
        case (error.status === 404):
            message.title = error.data[0][0]
            message.body = error.data[0][1] !== '' ? error.data[0][1] : error.statusText
            break;
        case (error.status >= 400 && error.status < 500 && error.status !== 401):
            message.title = error.data[0]
            message.body = error.data[1][0].message ? error.data[0][1] : error.statusText
            break;
        default:
            break;
    }
    return message
}