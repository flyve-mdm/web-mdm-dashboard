import React from "react"
import Loading from "./index"

describe('Loading', () => {
    it('renders the loader', () => {
        const wrapper = shallow(<Loading />)
        expect(wrapper.find('.loader')).to.have.length(1)
    })
    it('renders the small loader', () => {
        const wrapper = shallow(<Loading small />)
        expect(wrapper.find('.small-loader')).to.have.length(1)
    })
})