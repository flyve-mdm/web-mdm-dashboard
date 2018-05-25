import bytesToSize from '../index.js'

describe('bytesToSize', () => {
  it('should return "1 KB"', () => {
     expect(bytesToSize(1024)).toEqual('1 KB')
  })

  it('should return "1 Bytes"', () => {
    expect(bytesToSize(1)).toEqual('1 Bytes')
  })

  it('should return "1 MB"', () => {
    expect(bytesToSize(1048576)).toEqual('1 MB')
  })
})