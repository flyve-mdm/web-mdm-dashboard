import validateData from '../index.js'

describe('validateData', () => {
    it('should validate correct data', () => {
        expect(validateData('example test')).toEqual('example test')
        expect(validateData(['text 1', 'text 2'])).toEqual(['text 1', 'text 2'])
    })
    it('should validate undefined data', () => {
        expect(validateData(undefined)).toEqual('')
    })
    it('should validate special return', () => {
        expect(validateData(undefined, 'example test')).toEqual('example test')
    })
})