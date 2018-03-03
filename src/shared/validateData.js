const validateData = (data, specialReturn) => {
    let value

    if (!data && (specialReturn || specialReturn === '')) value = specialReturn
    else if (!data && data !== 0) value = ""
    else value = data
    
    if (Array.isArray(value)) return value
    return value.toString()
}

export default validateData;