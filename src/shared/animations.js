import WinJS from 'winjs'
import { AnimateFrom } from '@microsoft/fast-animation'

const display = localStorage.getItem('display') ? JSON.parse(localStorage.getItem('display')) : {}

export default function (animate = display.animate) {
    if (animate) {
        WinJS.UI.enableAnimations()
    } else {
        WinJS.UI.disableAnimations()
    }
}

const slideTop = element => new AnimateFrom(element, { y: 20 }, { duration: 100 })

export {
    slideTop
}