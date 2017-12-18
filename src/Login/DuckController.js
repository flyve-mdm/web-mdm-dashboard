const INITIAL_STATE = {
    email: '',
    isLoading: false
}

// Constants
const CHANGE_LOADING = 'flyve-mdm-web-ui/Login/changeLoading'
const CHANGE_EMAIL = 'flyve-mdm-web-ui/Login/changeEmail'

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