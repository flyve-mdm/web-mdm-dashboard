import { slideTop, splitview, slideLeft, slideRight } from '../index.js'

describe('animations', () => {
  it('should the "slideTop" animation return something', () => {
    expect(slideTop(document.createElement("div"))).toBeDefined()
  })

  it('should the "slideLeft" animation return something', () => {
    expect(slideLeft(document.createElement("div"))).toBeDefined()
  })
})