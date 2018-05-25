import getMode from '../index.js'

describe('getMode', () => {
  it('should return "large"', () => {
    window.innerWidth = 1024
    expect(getMode()).toEqual('large')
  })

  it('should return "medium"', () => {
    window.innerWidth = 772
    expect(getMode()).toEqual('medium')
  })
})