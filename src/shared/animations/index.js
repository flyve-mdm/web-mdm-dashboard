import { AnimateFrom } from '@microsoft/fast-animation'

const animate = () => localStorage.getItem('display') ? JSON.parse(localStorage.getItem('display')).animations : {}

const slideTop = element => {
    const animation = new AnimateFrom(element, { y: 20 }, { duration: 150 })
    if (!animate()) animation.play = () => {}
    return animation
}

const splitview = (element, expanded) => {
    const animation = element.animate({
        width: expanded ? ['0px', '200px'] : ['200px', '0px']
    }, 150)
    if (!animate()) animation.play = () => {}
    return animation 
}

const slideLeft = element => {
    const animation = new AnimateFrom(element, { x: 60 }, { duration: 100 })
    if (!animate()) animation.play = () => {}
    return animation
}

const slideRight = element => {
    const animation = new AnimateFrom(element, { x: -60 }, { duration: 100 })
    if (!animate()) animation.play = () => {}
    return animation
}

export {
    slideTop,
    splitview,
    slideLeft,
    slideRight
}