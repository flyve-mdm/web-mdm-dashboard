export default () => {
    return (
        window.innerWidth >= 1366 ? 'large' :
        window.innerWidth >= 800 ? 'medium' :
        'small'
    )
}