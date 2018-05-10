import validateData from '../index.js'

describe('validateData', () => {
    it('should validate correct data', () => {
        expect(validateData('example test')).toEqual('example test')
    })
    it('should validate undefined data', () => {
        expect(validateData(undefined)).toEqual('')
    })
    it('should validate special return', () => {
        expect(validateData(undefined, 'example test')).toEqual('example test')
    })
})