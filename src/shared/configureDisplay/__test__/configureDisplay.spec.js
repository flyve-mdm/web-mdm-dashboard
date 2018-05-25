import configureDisplay from '../index.js'

describe('configureDisplay', () => {
  beforeEach(() => {
    localStorage.removeItem('display')
  })
  
  afterEach(() => {
    localStorage.removeItem('display')
  })

  it('should get the default "display"', () => {
    const defaultValues = {
      animations: true,
      applicationsUploaded: true, 
      devicesByOperatingSystemVersion: true, 
      devicesByUsers: true, 
      devicesCurrentlyManaged: true, 
      filesUploaded: true, 
      fleetsCurrentlyManaged: true, 
      invitationsSent: true, 
      numberUsers: true, 
      pendingInvitations: true
    }

    expect(configureDisplay()).toEqual(defaultValues)
    expect(JSON.parse(localStorage.getItem('display'))).toEqual(defaultValues)
  })
})