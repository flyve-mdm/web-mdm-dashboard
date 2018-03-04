const changeState = (e) => {
  this.setState({
      [e.target.name]: e.target.value
  })
}

export default changeState