import setGlpiCookie from '../index.js'
import { setCookie, getCookie, eraseCookie } from '../../cookies'
import glpi from '../../glpiApi'

describe('setGlpiCookie', () => {
  beforeEach(() => {
    setCookie("glpi_123", "123")
    glpi.sessionToken = 12345678
  })

  afterEach(() => {
    glpi.sessionToken = undefined
    eraseCookie("glpi_123")
  })

  it('should set glpi cookie', async () => {
    expect(await setGlpiCookie()).toEqual({glpi_123: 12345678})
    expect(getCookie('glpi_123')).toEqual("12345678")
  })
})