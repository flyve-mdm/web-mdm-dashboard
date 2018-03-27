import WinJS from 'winjs'

const display = localStorage.getItem('display') ? JSON.parse(localStorage.getItem('display')) : {}

export default function (animate = display.animate) {
    if (animate) {
        WinJS.UI.enableAnimations()
    } else {
        WinJS.UI.disableAnimations()
    }
}