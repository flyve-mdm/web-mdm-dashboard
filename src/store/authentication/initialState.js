const initialState = { // TODO: Refactor
  username: '',
  email: '',
  isLoading: true,
  isError: false,
  endpoint: null,
  selfRegistration: true,
  configurationPassword: {},
  notificationMessage: undefined,
  currentUser: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : {},
}

export default initialState;