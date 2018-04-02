/**
 * Initial State
 * - Username, email and data of User logged
 * - Configuration metadata (TODO: Is that needly?)
 */

const initialState = {
  configurationPassword: {},
  captcha: {},
  currentUser: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null,
}

export default initialState