import * as Data from './Data'

const routers = [
    {
        type: "content",
        label: "Dashboard",
        icon: "home",
        style: {},
        data: []
    },
    {
        type: "list",
        label: "Devices",
        icon: "cellphone",
        style: {},
        data: Data.Devices
    },
    {
        type: "list",
        label: "Invitations",
        icon: "mail",
        style: {},
        data: Data.Invitations
    },
    {
        type: "list",
        label: "Fleets",
        icon: "gotostart",
        style: {},
        data: Data.Fleets
    },
    {
        type: "list",
        label: "Files",
        icon: "copy",
        style: {},
        data: Data.Files
    },
    {
        type: "list",
        label: "Applications",
        icon: "switchapps",
        style: {},
        data: Data.Applications
    },
    {
        type: "list",
        label: "Users",
        icon: "people",
        style: {},
        data: Data.Users
    },
    {
        type: "content",
        label: "SearchEngine",
        icon: "find",
        style: {},
        data: []
    },
    {
        type: "list",
        label: "Settings",
        icon: "settings",
        style: {},
        data: []
    },
    {
        type: "list",
        label: "About",
        icon: "contactinfo",
        style: {},
        data: []
    }
]

export default routers