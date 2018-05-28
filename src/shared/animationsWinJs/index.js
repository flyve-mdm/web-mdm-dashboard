import WinJS from 'winjs'

export default function (isAnimate) {
    if (isAnimate) {
        WinJS.UI.enableAnimations()
    } else {
        WinJS.UI.disableAnimations()
    }
}

const animate = () => localStorage.getItem('display') ? JSON.parse(localStorage.getItem('display')).animations : {}

const splitview = (element, expanded) => {
    const animation = element.animate({
        width: expanded ? ['0px', '200px'] : ['200px', '0px']
    }, 150)
    if (!animate()) animation.play = () => {}
    return animation 
}

export { splitview }