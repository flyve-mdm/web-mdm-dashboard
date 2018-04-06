import location from './location'

export default function (title, body, icon = `${location.pathname}/images/dashboard.png`) {
    if (Notification && Notification.permission !== "denied") {
        Notification.requestPermission()
            .then((permission) => {
                new Notification(title, { 
                    body,
                    icon
                })
            })
    }
} 