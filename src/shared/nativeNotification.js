export default function (title, body, icon = '/images/dashboard.png') {
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