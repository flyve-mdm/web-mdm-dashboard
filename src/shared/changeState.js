const changeState = (ctx, event) => {
  ctx.setState({
      [event.target.name]: event.target.value
  })
}

export default changeState