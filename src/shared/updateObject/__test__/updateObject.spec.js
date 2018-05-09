import { updateObject } from '../index.js'

describe('updateObject', () => {
    it('should update object', () => {
        expect(updateObject({ a: 'A1', b: 'B1'}, { a: 'A2', c: 'C1'})).deep.equal({a: 'A2', b: 'B1', c: 'C1'})
    })
})