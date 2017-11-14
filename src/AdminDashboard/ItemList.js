import * as DATA from './Data'
import WinJS from 'winjs'

export default function (name, list, sort) {
    const groupKey = function (data) {
        if (data.User) {
            return data.User.name[0].toUpperCase()
        } else {
            return data.name[0].toUpperCase()
        }
    }

    const groupData = function (data) {
        return { title: groupKey(data) }
    }

    const groupSorted = function (a, b) {
        if (sort) {
            if (a < b) {
                return -1
            } else if (a > b) {
                return 1
            } else {
                return 0
            }
        } else {
            if (a > b) {
                return -1
            } else if (a < b) {
                return 1
            } else {
                return 0
            }
        }
        
    }

    const sorter = function (a, b) {
        if (a.name < b.name) {
            return -1
        } else if (a.name > b.name) {
            return 1
        } else {
            return 0
        }
    }

    if (list) {
        return new WinJS.Binding.List(list)
            .createSorted(sorter)
            .createGrouped(groupKey, groupData, groupSorted)
    } else {
        return new WinJS.Binding.List(DATA[name])
            .createSorted(sorter)
            .createGrouped(groupKey, groupData)
    }
    
}