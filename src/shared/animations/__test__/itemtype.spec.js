import { slideTop, splitview, slideLeft, slideRight } from '../index.js'

describe('animations', () => {
  it('should the "slideTop" animation return something', () => {
    expect(slideTop(document.createElement("div"))).toBeDefined()
  })
})