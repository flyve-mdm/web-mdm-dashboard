import Data from './FakeData'
var WinJS = require('winjs')

export default function () {
    var groupKey = function (data) {
        return data.name[0].toUpperCase()
    }

    var groupData = function (data) {
        return { title: groupKey(data) }
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

    return new WinJS.Binding.List(Data)
        .createSorted(sorter)
        .createGrouped(groupKey, groupData)
}