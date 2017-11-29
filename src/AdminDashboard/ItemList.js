import * as DATA from './Data'
import WinJS from 'winjs'

export default function (name, list, sort = true) {

    const groupKey = function (data) {
        switch (name) {
            case "Devices":
                return data["PluginFlyvemdmAgent.Computer.User.realname"][0].toUpperCase()
            case "Fleets":
                return data["PluginFlyvemdmFleet.name"][0].toUpperCase()
            case "Files":
                return data["PluginFlyvemdmFile.name"][0].toUpperCase()
            case "Applications":
                return data["PluginFlyvemdmPackage.name"][0]
            case "Users":
                return data['User.name'][0].toUpperCase()
            case "Invitations":
                return data['PluginFlyvemdmInvitation.User.name'][0].toUpperCase()
            case "InvitationsLog":
                return data['PluginFlyvemdmInvitationLog.PluginFlyvemdmInvitationlog.date_creation']
            default:
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

    const sorter = (a, b) => {
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