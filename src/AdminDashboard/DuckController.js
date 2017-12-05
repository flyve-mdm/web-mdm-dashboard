import GetMode from '../Utils/GetMode'
import ItemList from './ItemList'
import Routers from './Routers'
import * as api from './Api'
import WinJS from 'winjs'

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
    currentItem: null,
    endpoint: null,
    dataSource: { itemList: new WinJS.Binding.List([]), sort: true},
    isLoading: true,
    isError: false,
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
const CHANGE_ENDPOINT = 'flyve-mdm-web-ui/AdminDashboard/changeEndpoint'
const CHANGE_ITEM_LIST = 'flyve-mdm-web-ui/AdminDashboard/changeItemList'
const CHANGE_ACTION_LIST = 'flyve-mdm-web-ui/AdminDashboard/changeActionList'
const CHANGE_CURRENT_ITEM = 'flyve-mdm-web-ui/AdminDashboard/changeCurrentItem'
const FETCHING_DATA = 'flyve-mdm-web-ui/AdminDashboard/fetchingData'
const FETCHING_DATA_SUCCESS = 'flyve-mdm-web-ui/AdminDashboard/fetchingDataSuccess'
const FETCHING_DATA_FAILURE = 'flyve-mdm-web-ui/AdminDashboard/fetchingDataFailure'

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
        
        case CHANGE_ENDPOINT:
            return {
                ...state,
                endpoint: action.newEndpoint
            }
        
        case CHANGE_ITEM_LIST:
            return {
                ...state,
                dataSource: action.newDataSource
            }
        
        case CHANGE_ACTION_LIST:
            return {
                ...state,
                actionList: action.newActionList
            }
        
        case CHANGE_CURRENT_ITEM:
            return {
                ...state,
                currentItem: action.newCurrentItem
            }
        case FETCHING_DATA:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case FETCHING_DATA_SUCCESS:
            return {
                ...state,
                data: action.newData,
                dataSource: { itemList: ItemList(state.endpoint, action.newData.data), sort: true } 
            }
        case FETCHING_DATA_FAILURE:
            return {
                ...state,
                error: action.newError
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
export function changeEndpoint(newEndpoint) {
    return {
        type: CHANGE_ENDPOINT,
        newEndpoint
    }
}
export function changeItemList(location, newDataSource) {
    return {
        type: CHANGE_ITEM_LIST,
        newDataSource,
        location: location[0].toLowerCase()
    }
}
export function changeActionList(newActionList) {
    return {
        type: CHANGE_ACTION_LIST,
        newActionList

    }
}
export function changeCurrentItem(newCurrentItem) {
    return {
        type: CHANGE_CURRENT_ITEM,
        newCurrentItem

    }
}
export function fetchingData(bool) {
    return {
        type: FETCHING_DATA,
        isLoading: bool
    }
}
export function fetchDataSuccess(data) {
    return {
        type: FETCHING_DATA_SUCCESS,
        newData: data,
    }
}
export function fetchDataFailure() {
    return {
        type: FETCHING_DATA_FAILURE
    }
}
export function fetchData(endpoint) {
    return (dispatch) => {
        dispatch(changeEndpoint(endpoint))
        dispatch(fetchingData(true))
        api[endpoint.toLowerCase()].getAll()
        .then(([response, json]) => {
            dispatch(fetchDataSuccess(json))
            dispatch(fetchingData(false))
        })
        .catch((error) => {
            dispatch(fetchDataFailure())
            dispatch(fetchingData(false))
        })
    }
}