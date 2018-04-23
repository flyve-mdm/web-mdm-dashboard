import WinJS from 'winjs'
import { AnimateFrom } from '@microsoft/fast-animation'

const animate = () => localStorage.getItem('display') ? JSON.parse(localStorage.getItem('display')).animations : {}

export default function (isAnimate = animate()) {
    if (isAnimate) {
        WinJS.UI.enableAnimations()
    } else {
        WinJS.UI.disableAnimations()
    }
}

const slideTop = (element) => {
    const animation = new AnimateFrom(element, { y: 20 }, { duration: 100 })
    if (!animate()) animation.play = () => {}
    return animation
}

export {
    slideTop
}