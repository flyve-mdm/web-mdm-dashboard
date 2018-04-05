
const path = () => {
    var l = document.createElement("a")
    l.href = process.env.PUBLIC_URL
    return l
}

export default path()
