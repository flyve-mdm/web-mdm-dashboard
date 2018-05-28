export default function (title, body, icon = require('../../assets/images/logo2.png')) {
    let newNotification = null
    if (Notification && Notification.permission !== "denied") {
        Notification.requestPermission(permission => {
            newNotification = new Notification(title, { body, icon })
        })
    }
    return newNotification
} 