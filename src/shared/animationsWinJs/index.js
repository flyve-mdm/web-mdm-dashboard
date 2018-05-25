import WinJS from 'winjs'

export default function (isAnimate) {
    if (isAnimate) {
        WinJS.UI.enableAnimations()
    } else {
        WinJS.UI.disableAnimations()
    }
}
