import * as api from '../AdminDashboard/Api'
import config from '../config.json'

const INITIAL_STATE = {
    email: '',
    isLoading: true,
    isError: false,
    endpoint: null,
    selfRegistration: config.self_registration,
    configurationPassword: {}
}

// Constants
const CHANGE_LOADING = 'flyve-mdm-web-ui/Login/changeLoading'
const CHANGE_EMAIL = 'flyve-mdm-web-ui/Login/changeEmail'
const FAILURE = 'flyve-mdm-web-ui/Login/failure'
const CHANGE_ENDPOINT = 'flyve-mdm-web-ui/Login/changeEndpoint'
const FETCHING_DATA_SUCCESS = 'flyve-mdm-web-ui/Login/fetchingDataSuccess'

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
        case FAILURE:
            return {
                ...state,
                error: action.newError
            }
        case FETCHING_DATA_SUCCESS: 
         return {
            ...state,
            [action.name]: action.newData             
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
export function failure(newError) {
    return {
        type: FAILURE,
        newError
    }
}
export function fetchDataSuccess(name, data) {
    return {
        type: FETCHING_DATA_SUCCESS,
        newData: data,
        name
    }
}
export function fetchData(endpoint) {
    return (dispatch) => {
        dispatch(changeEndpoint(endpoint))
        dispatch(changeLoading(true))
        api[endpoint].getAll()
        .then(([response, json]) => {
            dispatch(fetchDataSuccess(endpoint, json))
            dispatch(changeLoading(false))
        })
        .catch((error) => {
            dispatch(failure())
            dispatch(changeLoading(false))
        })
    }
}
export function login(user, password) {
    return (dispatch) => {
        dispatch(changeEndpoint('login'))
        dispatch(changeLoading(true))
        api.login.singUp(user, password)
        .then(([response, json]) => {
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
