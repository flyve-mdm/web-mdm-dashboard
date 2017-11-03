import GetMode from '../Utils/GetMode'
import InitialPeople from './InitialPeople'

const INITIAL_STATE = {
    splitViewId: 'rootSplitView',
    paneOpened: false,
    mode: GetMode(),
    location: ['people'],
    splitViewConfigs: {
        small: {
            closedDisplayMode: 'none',
            openedDisplayMode: 'overlay'
        },
        medium: {
            closedDisplayMode: 'inline',
            openedDisplayMode: 'overlay'
        },
        large: {
            closedDisplayMode: 'inline',
            openedDisplayMode: 'inline'
        }
    },
    people: InitialPeople()
}

// Constants
const HANDLE_TOGGLE_PANE = 'flyve-mdm-web-ui/ContactBook/handleTogglePane'
const CLOSE_PANE = 'flyve-mdm-web-ui/ContactBook/closePane'
const CHANGE_MODE = 'flyve-mdm-web-ui/ContactBook/changeMode'
const CHANGE_LOCATION = 'flyve-mdm-web-ui/ContactBook/changeLocation'
const HANDLE_BACK = 'flyve-mdm-web-ui/ContactBook/handleBack'
const CHANGE_PEOPLE = 'flyve-mdm-web-ui/ContactBook/changePeople'

// Reducers
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        case HANDLE_TOGGLE_PANE:
            return {
               ...state,
               paneOpened: !state.paneOpened
            }

        case CLOSE_PANE:
            return {
               ...state,
               paneOpened: false
            }
        
        case CHANGE_MODE:
            return {
               ...state,
               mode: action.nexMode
            }
        
        case CHANGE_LOCATION:
            return {
               ...state,
               location: action.newLocation
            }

        case HANDLE_BACK:
            return {
               ...state,
               location: [...state.location.slice(0, 1)]
            }
        case CHANGE_PEOPLE:
            return {
               ...state,
               people: action.newPeople
            }

        default: return state
    }
}

// Action Creators
export function handleTogglePane () {
  return { 
      type: HANDLE_TOGGLE_PANE
    }
}
export function closePane () {
  return { 
      type: CLOSE_PANE
    }
}
export function changeMode (nexMode) {
  return { 
      type: CHANGE_MODE,
      nexMode
    }
}
export function changeLocation (newLocation) {
  return { 
      type: CHANGE_LOCATION,
      newLocation
    }
}
export function handleBack () {
  return { 
      type: HANDLE_BACK
    }
}
export function changePeople (newPeople) {
  return { 
      type: CHANGE_PEOPLE,
      newPeople
    }
}