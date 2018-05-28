import calc100PercentMinus from '../index.js'

describe('calc100PercentMinus', () => {
  it('should return "100%"', () => {
     expect(calc100PercentMinus('0')).toEqual('100%')
  })

  it('should return a CSS calc', () => {
    expect(calc100PercentMinus('320')).toEqual('calc(100% - 320px)')
 })
})