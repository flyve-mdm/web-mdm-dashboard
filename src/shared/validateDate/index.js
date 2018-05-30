export default (value, min, max) => {
    if (value instanceof Date && min instanceof Date && max instanceof Date) {
        value.setHours(0)
        min.setHours(0)
        max.setHours(1)
        return (value.getTime() >= min && value.getTime() <= max)
    } 
    return false
}