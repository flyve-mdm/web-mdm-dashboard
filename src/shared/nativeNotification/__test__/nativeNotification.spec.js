import nativeNotification from '../index.js'
import publicURL from '../../publicURL'

describe('nativeNotification', () => {
  beforeEach(() => {
    global.Notification = sinon.spy(class Notification {
      permission = 'granted'
      static requestPermission = (callback) => {callback()}
    })
  })

  afterEach(() => {
    global.Notification = undefined
  })

  it('should create a new native notification', async () => {
    expect(nativeNotification('test', 'test body') instanceof Notification).toBeTruthy()
  })
})