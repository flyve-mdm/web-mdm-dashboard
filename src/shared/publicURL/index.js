const path = () => {
    var location = document.createElement("a")
    location.href = process.env.PUBLIC_URL
    return (process.env.PUBLIC_URL !== '') ? location.pathname : ''
}

export default path()