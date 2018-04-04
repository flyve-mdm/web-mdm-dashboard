export default (path, position = 3) => {
    let id
    if (process.env.PUBLIC_URL !== "") {
        id = path.split(process.env.PUBLIC_URL)[1].split("/")[position]
    } else {
        id = path.split("/")[position]
    }
    return id
}