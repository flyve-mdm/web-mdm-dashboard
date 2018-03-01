/**
 * Actions Pattern for Form SignIn Data Flow
 * 
 */

export const changeInput = (ctx, input) => {
  ctx.setState({
      [input.name]: input.value
  })
}

export const changePhase = (ctx, newPhase) => {
  ctx.setState({
      phase: newPhase
  })
}

export const handleFormSubmit = (ctx, event) => {
  event.preventDefault()

  ctx.props.actions.fetchSignIn(
      ctx.state.username,
      ctx.state.password
  )
}
