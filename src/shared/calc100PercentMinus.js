export default function (n) {
    return n === '0' ?
        '100%' :
        `calc(100% - ${n}px)`
}