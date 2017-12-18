const INITIAL_STATE = {
    email: '',
    password: '',
    isLoading: false,
    phase: 1
}

// Constants
const CHANGE_LOADING = 'flyve-mdm-web-ui/Login/changeLoading'
const CHANGE_VALUE = 'flyve-mdm-web-ui/Login/changeValue'

// Reducers
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        case CHANGE_LOADING:
            return {
               ...state,
               isLoading: action.isLoading
            }
        
        case CHANGE_VALUE:
            return {
               ...state,
               [action.name]: action.value
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
export function changeValue (name, value) {
    return {
        type: CHANGE_VALUE,
        name,
        value
    }
}