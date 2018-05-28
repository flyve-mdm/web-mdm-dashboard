import publicURL from '../publicURL'

export default function (title, body, icon = `${publicURL}/images/dashboard.png`) {
    let newNotification = null
    if (Notification && Notification.permission !== "denied") {
        Notification.requestPermission(permission => {
            newNotification = new Notification(title, { body, icon })
        })
    }
    return newNotification
} 