import publicURL from './publicURL'
export default (path, position = 3) => {
    let id
    if (publicURL !== "") {
        id = path.split(publicURL)[1].split("/")[position]
    } else {
        id = path.split("/")[position]
    }
    return id
}