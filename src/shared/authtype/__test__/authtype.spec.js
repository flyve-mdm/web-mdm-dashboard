import authtype from '../index.js'

describe('authtype', () => {
  it('should return "glpi_internal_database"', () => {
    expect(authtype(1)).toEqual('glpi_internal_database')
  })

  it('should return "mail_server"', () => {
    expect(authtype(2)).toEqual('mail_server')
  })

  it('should return "ldap_directory"', () => {
    expect(authtype(3)).toEqual('ldap_directory')
  })

  it('should return "other"', () => {
    expect(authtype(4)).toEqual('other')
  })

  it('should return "cas"', () => {
    expect(authtype(5)).toEqual('cas')
  })

  it('should return "certificate_authentication"', () => {
    expect(authtype(6)).toEqual('certificate_authentication')
  })

  it('should return "api"', () => {
    expect(authtype(7)).toEqual('api')
  })

  it('should return "cookie"', () => {
    expect(authtype(8)).toEqual('cookie')
  })

  it('should return "not_yet_authenticated"', () => {
    expect(authtype(0)).toEqual('not_yet_authenticated')
  })

  it('should return "not_available"', () => {
    expect(authtype(-1)).toEqual('not_available')
  })
})