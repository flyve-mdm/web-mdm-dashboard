import React from "react"
import Loading from "../index"

describe('Loading', () => {
    it('renders the loader', () => {
        const wrapper = shallow(<Loading />)
        expect(wrapper.find('.loading')).toHaveLength(1)
        expect(wrapper.find('.loading--small')).toHaveLength(0)
        expect(wrapper.find('.loader')).toHaveLength(1)
        expect(wrapper.find('.circle')).toHaveLength(5)
    })
    it('renders the small loader', () => {
        const wrapper = shallow(<Loading small />)
        expect(wrapper.find('.loading')).toHaveLength(1)
        expect(wrapper.find('.loading--small')).toHaveLength(1)
        expect(wrapper.find('.loader')).toHaveLength(1)
        expect(wrapper.find('.circle')).toHaveLength(5)
    })
})