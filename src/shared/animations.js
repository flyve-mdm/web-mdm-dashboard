import WinJS from 'winjs'

export default function (bytes) {
    const display = localStorage.getItem('display') ? JSON.parse(localStorage.getItem('display')) : {}
    if (display.animations === false) {
        WinJS.UI.disableAnimations()
    } else {
        WinJS.UI.enableAnimations()
    }
}