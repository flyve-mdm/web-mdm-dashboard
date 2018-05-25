import bytesToSize from '../index.js'

describe('bytesToSize', () => {
  it('should return "1 KB"', () => {
     expect(bytesToSize(1024)).toEqual('1 KB')
  })
})