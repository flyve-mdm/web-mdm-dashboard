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
})