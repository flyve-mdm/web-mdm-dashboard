import validateNotifications from '../index.js'

describe('validateNotifications', () => {
    afterEach(() => {
        localStorage.removeItem('showNotifications')
        localStorage.removeItem('notificationType')
    })

    it('should validate notifications without localstorage', () => {
        expect(validateNotifications()).toEqual({show: true, type: "Toast"})
    })

    it('should validate notifications', () => {
        localStorage.setItem('showNotifications', 'false')
        localStorage.setItem('notificationType', 'Native')
        expect(validateNotifications()).toEqual({show: false, type: "Native"})
    })
})