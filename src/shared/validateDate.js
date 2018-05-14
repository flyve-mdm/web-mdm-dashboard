export default (value, min, max) => {
    value.setHours(0)
    min.setHours(0)
    max.setHours(1)
    return (value.getTime() >= min && value.getTime() <= max)
}