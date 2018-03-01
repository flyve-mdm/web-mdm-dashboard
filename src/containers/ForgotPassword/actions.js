export const handleRecover = (ctx, event) => {
  event.preventDefault()
  ctx.setState({
      isRecoverSent: true
  })
  ctx.props.actions.fetchRecoverPassword()
}