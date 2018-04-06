export default ({notification, type='info', error}) => {
    console.log(error)
    console.log(type)
    notification({
        title: error.data[0][0],
        body: error.data[0][1],
        type: type
    })
}