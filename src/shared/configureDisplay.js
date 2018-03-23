export default () => {
    const currentDisplay = localStorage.getItem('display') ? JSON.parse(localStorage.getItem('display')) : {}
    const newtDisplay = {
        applicationsUploaded: currentDisplay.applicationsUploaded !== undefined ? currentDisplay.applicationsUploaded : true,
        devicesByOperatingSystemVersion: currentDisplay.devicesByOperatingSystemVersion !== undefined ? currentDisplay.devicesByOperatingSystemVersion : true,
        devicesByUsers: currentDisplay.devicesByUsers !== undefined ? currentDisplay.devicesByUsers : true,
        devicesCurrentlyManaged: currentDisplay.devicesCurrentlyManaged !== undefined ? currentDisplay.devicesCurrentlyManaged : true,
        filesUploaded: currentDisplay.filesUploaded !== undefined ? currentDisplay.filesUploaded : true,
        fleetsCurrentlyManaged: currentDisplay.fleetsCurrentlyManaged !== undefined ? currentDisplay.fleetsCurrentlyManaged : true,
        invitationsSent: currentDisplay.invitationsSent !== undefined ? currentDisplay.invitationsSent: true,
        numberUsers: currentDisplay.numberUsers !== undefined ? currentDisplay.numberUsers: true,
        animations: currentDisplay.animations !== undefined ? currentDisplay.animations : true 
    }
    if (currentDisplay !== newtDisplay) {
        localStorage.setItem('display', JSON.stringify(newtDisplay))    
    }
}