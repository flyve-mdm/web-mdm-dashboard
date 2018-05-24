import handleMessage from '../index.js'
import history from '../../history'

describe('handleMessage', () => {

  beforeEach(() => {
    sinon.stub(history, 'push').returns({})
  })

  afterEach(() => {
    history.push.restore()
  })

  it('should set a generic error message', () => {
     expect(handleMessage({ type: 'alert', message: 'error message' }))
      .toEqual(
        {body: "error message", title: "error", type: "alert"}
      )
  })

  it('should set a generic message', () => {
    expect(handleMessage({message: 'message' }))
    .toEqual(
      {"body": "message", "title": "info", "type": "info"}
    )
  })

  it('should set a "no internet connection" message', () => {
    expect(
      handleMessage({
        type: 'alert', 
        message: { status: 0 } 
      })
    ).toEqual(
      {body: "no_internet_connection", title: "error", type: "alert"}
    )
  })

  it('should set a 401 error message', () => {
    expect(
      handleMessage({
        type: 'alert', 
        message: {
          status: 401,
          data: [["ERROR_SESSION_TOKEN_INVALID","session_token seems invalid"]]
        } 
      })
    ).toEqual(
      {body: "session_token seems invalid", title: "error", type: "alert"}
    )
  })
}) 