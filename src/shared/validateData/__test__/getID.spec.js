import validateData from '../index.js'

describe('validateData', () => {
    it('should validate correct data', () => {
        expect(validateData('example test')).to.equal('example test')
    })
    it('should validate undefined data', () => {
        expect(validateData(undefined)).to.equal('')
    })
    it('should validate special return', () => {
        expect(validateData(undefined, 'example test')).to.equal('example test')
    })
})