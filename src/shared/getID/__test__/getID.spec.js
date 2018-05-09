import getID from '../index.js'

describe('getID', () => {
  it('should get user id', () => {
     expect(getID('/app/users/34')).to.equal('34')
  })
})