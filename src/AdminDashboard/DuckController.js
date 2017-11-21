import GetMode from '../Utils/GetMode'
import ItemList from './ItemList'
import Routers from './Routers'

const INITIAL_STATE = {
    splitViewId: 'rootSplitView',
    paneOpened: false,
    mode: GetMode(),
    index: 0,
    location: [Routers[0].label],
    router: Routers,
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
    actionList: null,
    devices: { itemList: ItemList("Devices"), sort: true},
    fleets: { itemList: ItemList("Fleets"), sort: true},
    files: { itemList: ItemList("Files"), sort: true},
    applications: { itemList: ItemList("Applications"), sort: true},
    users: { itemList: ItemList("Users"), sort: true}
}

// Constants
const HANDLE_TOGGLE_PANE = 'flyve-mdm-web-ui/AdminDashboard/handleTogglePane'
const CLOSE_PANE = 'flyve-mdm-web-ui/AdminDashboard/closePane'
const CHANGE_MODE = 'flyve-mdm-web-ui/AdminDashboard/changeMode'
const CHANGE_LOCATION = 'flyve-mdm-web-ui/AdminDashboard/changeLocation'
const CHANGE_INDEX = 'flyve-mdm-web-ui/AdminDashboard/changeIndex'
const HANDLE_BACK = 'flyve-mdm-web-ui/AdminDashboard/handleBack'
const CHANGE_ITEM_LIST = 'flyve-mdm-web-ui/AdminDashboard/changeItemList'
const CHANGE_ACTION_LIST = 'flyve-mdm-web-ui/AdminDashboard/changeActionList'

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
        
        case CHANGE_INDEX:
            return {
                ...state,
                index: action.newIndex
            }

        case HANDLE_BACK:
            return {
               ...state,
               location: [...state.location.slice(0, 1)]
            }
        
        case CHANGE_ITEM_LIST:
            return {
                ...state,
                [action.location]: action.newItemList
            }
        
        case CHANGE_ACTION_LIST:
            return {
                ...state,
                actionList: action.newActionList
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
export function changeIndex (newIndex) {
    return { 
        type: CHANGE_INDEX,
        newIndex
      }
  }
export function handleBack () {
  return { 
      type: HANDLE_BACK
    }
}
export function changeItemList(location, newItemList) {
    return {
        type: CHANGE_ITEM_LIST,
        newItemList,
        location: location[0].toLowerCase()
    }
}
export function changeActionList(newActionList) {
    return {
        type: CHANGE_ACTION_LIST,
        newActionList

    }
}