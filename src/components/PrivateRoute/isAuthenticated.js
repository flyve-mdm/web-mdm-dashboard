// Replace this with Redux and delete it

const isAuthenticated = () => {
  if (localStorage.getItem('sessionToken') && localStorage.getItem('sessionToken') !== undefined ) {
      return true
  } else {
      return false
  }
}

export default isAuthenticated