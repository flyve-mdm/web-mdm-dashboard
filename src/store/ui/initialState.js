/**
 * Initial State for management the state of UI:
 * - Nofications, Error and Succes messages states
 * - Loading state for show / hiden Loaders, Sppiners etc.
 */

const initialState = {
  notification: '',
  error: '',
  success: '',
  loading: false,
}

export default initialState;