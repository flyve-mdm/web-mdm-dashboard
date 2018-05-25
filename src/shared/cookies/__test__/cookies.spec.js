import { setCookie, getCookie, eraseCookie } from '../index.js'

describe('cookies', () => {
  it('should create, get and delete a cookie', () => {
    setCookie('myCookie', 'cookie', '1')
    expect(getCookie('myCookie')).toEqual('cookie')
    setCookie('myCookie', 'new cookie', '5')
    expect(getCookie('myCookie')).toEqual('new cookie')    
    eraseCookie('myCookie')
    expect(getCookie('myCookie')).toEqual(null)
  })
})