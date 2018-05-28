import logout from '../index.js'
import history from '../../history'
import glpi from '../../glpiApi'

describe('logout', () => {
  beforeEach(() => {
    localStorage.setItem('currentUser', 'my user data')
    localStorage.setItem('sessionToken', '12345678')
    sinon.stub(history, 'push').returns({})
    sinon.stub(glpi, 'killSession').returns({})
    glpi.sessionToken = 12345678
  })

  afterEach(() => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('sessionToken')
    history.push.restore()
    glpi.killSession.restore()
  })

  it('should close the session', async () => {
    logout()
    expect(localStorage.getItem('currentUser')).toBeUndefined()
    expect(localStorage.getItem('sessionToken')).toBeUndefined()
    expect(history.push.called).toEqual(true)
    expect(glpi.killSession.called).toEqual(true)
  })
})