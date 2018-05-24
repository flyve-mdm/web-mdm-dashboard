import handleMessage from '../index.js'

describe('handleMessage', () => {
  it('should set a generic error message', () => {
     expect(handleMessage({ type: 'alert', message: 'error message' }))
      .toEqual(
        {body: "error message", title: "error", type: "alert"}
      )
  })
})