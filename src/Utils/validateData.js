export default (data, specialReturn) => {

    let value

    if (!data && specialReturn) value = specialReturn
    else if (!data && data !== 0) value = "not available"
    else value = data

    return value.toString()
}