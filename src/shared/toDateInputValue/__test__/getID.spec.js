import toDateInputValue from '../index.js'

describe('toDateInputValue', () => {
  it('should convert date correctly', () => {
     expect(toDateInputValue(new Date('06-10-2018'))).toEqual('2018-06-10')
  })
})