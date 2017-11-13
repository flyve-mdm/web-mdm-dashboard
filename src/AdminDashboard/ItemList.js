import * as DATA from './Data'
var WinJS = require('winjs')

export default function (name, list, sort) {
    var groupKey = function (data) {
        return data.name[0].toUpperCase()
    }

    var groupData = function (data) {
        return { title: groupKey(data) }
    }

    var groupSorted = function (a, b) {
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

    var sorter = function (a, b) {
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