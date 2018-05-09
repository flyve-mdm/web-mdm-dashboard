import validateNotifications from '../index.js'

describe('validateNotifications', () => {
    before(() => {
        localStorage.setItem('showNotifications', 'true')
        localStorage.setItem('notificationType', 'Toast')
    })

    it('should validate notifications', () => {
        expect(validateNotifications()).deep.equal({show: true, type: "Toast"})
    })
})