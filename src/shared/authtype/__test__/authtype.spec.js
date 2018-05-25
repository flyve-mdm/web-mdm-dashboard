import authtype from '../index.js'

describe('authtype', () => {
  it('should return "glpi_internal_database"', () => {
    expect(authtype(1)).toEqual('glpi_internal_database')
  })

  it('should return "mail_server"', () => {
    expect(authtype(2)).toEqual('mail_server')
  })
})