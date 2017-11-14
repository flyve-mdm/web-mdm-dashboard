export default () => {
    return (
        window.innerWidth >= 1024 ? 'large' :
        window.innerWidth >= 772 ? 'medium' :
        'small'
    )
}