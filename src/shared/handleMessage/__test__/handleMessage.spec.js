import handleMessage from '../index.js'

describe('handleMessage', () => {
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
})