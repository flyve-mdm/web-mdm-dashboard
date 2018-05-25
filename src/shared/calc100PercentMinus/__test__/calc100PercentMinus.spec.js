import calc100PercentMinus from '../index.js'

describe('calc100PercentMinus', () => {
  it('should return "100%"', () => {
     expect(calc100PercentMinus('0')).toEqual('100%')
  })
})