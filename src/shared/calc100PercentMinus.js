export default function calc100PercentMinus(n) {
    return n === '0' ?
        '100%' :
        `calc(100% - ${n}px)`
}