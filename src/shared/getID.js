import location from './location'
export default (path, position = 3) => {
    let id
    if (location.pathname !== "") {
        id = path.split(location.pathname)[1].split("/")[position]
    } else {
        id = path.split("/")[position]
    }
    return id
}