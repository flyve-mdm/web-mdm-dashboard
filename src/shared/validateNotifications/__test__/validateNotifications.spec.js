import validateNotifications from '../index.js'

describe('validateNotifications', () => {
    beforeEach(() => {
        localStorage.setItem('showNotifications', 'true')
        localStorage.setItem('notificationType', 'Toast')
    })

    it('should validate notifications', () => {
        expect(validateNotifications()).toEqual({show: true, type: "Toast"})
    })
})