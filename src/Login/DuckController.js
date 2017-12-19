import * as api from '../AdminDashboard/Api'

const INITIAL_STATE = {
    email: '',
    isLoading: false,
    isError: false,
    endpoint: null,
    isLoggedIn: false
}

// Constants
const CHANGE_LOADING = 'flyve-mdm-web-ui/Login/changeLoading'
const CHANGE_EMAIL = 'flyve-mdm-web-ui/Login/changeEmail'
const LOGIN_SUCCESS = 'flyve-mdm-web-ui/Login/loginSuccess'
const FAILURE = 'flyve-mdm-web-ui/Login/failure'
const CHANGE_ENDPOINT = 'flyve-mdm-web-ui/Login/changeEndpoint'

// Reducers
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        case CHANGE_LOADING:
            return {
               ...state,
               isLoading: action.isLoading
            }
        
        case CHANGE_EMAIL:
            return {
               ...state,
               email: action.newEmail
            }
        case CHANGE_ENDPOINT:
            return {
                ...state,
                endpoint: action.newEndpoint
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true
            }
        case FAILURE:
            return {
                ...state,
                error: action.newError
            }
        
        default: return state
    }
}

// Action Creators
export function changeLoading (isLoading) {
    return { 
        type: CHANGE_LOADING,
        isLoading
    }
}
export function changeEmail (newEmail) {
    return {
        type: CHANGE_EMAIL,
        newEmail
    }
}
export function changeEndpoint(newEndpoint) {
    return {
        type: CHANGE_ENDPOINT,
        newEndpoint
    }
}
export function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    }
}
export function failure(newError) {
    return {
        type: FAILURE,
        newError
    }
}
export function login(user, password) {
    return (dispatch) => {
        dispatch(changeEndpoint('login'))
        dispatch(changeLoading(true))
        api.login.singUp(user, password)
        .then(([response, json]) => {
            dispatch(loginSuccess())
            dispatch(changeLoading(false))
        })
        .catch((error) => {
            dispatch(failure(error))
            dispatch(changeLoading(false))
        })
    }
}
export function recoverPassword(user) {
    return (dispatch) => {
        dispatch(changeEndpoint('login'))
        dispatch(changeLoading(true))
        api.login.recoverPassword(user)
        .then(([response, json]) => {
            dispatch(changeLoading(false))
        })
        .catch((error) => {
            dispatch(failure(error))
            dispatch(changeLoading(false))
        })
    }
}
