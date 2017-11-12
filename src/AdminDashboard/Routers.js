import { devices, fleets, files, applications, users } from './Data'

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
        data: devices
    },
    {
        type: "list",
        label: "Fleets",
        icon: "gotostart",
        style: {},
        data: fleets
    },
    {
        type: "list",
        label: "Files",
        icon: "copy",
        style: {},
        data: files
    },
    {
        type: "list",
        label: "Applications",
        icon: "switchapps",
        style: {},
        data: applications
    },
    {
        type: "list",
        label: "Users",
        icon: "people",
        style: {},
        data: users
    },
    {
        type: "content",
        label: "Settings",
        icon: "settings",
        style: { position: 'absolute', bottom: 48, width: '100%' },
        data: []
    },
    {
        type: "content",
        label: "About",
        icon: "contactinfo",
        style: { position: 'absolute', bottom: 0, width: '100%' },
        data: []
    }
]

export default routers