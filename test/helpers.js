import { expect } from 'chai'
import { mount, render, shallow, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

process.on('unhandledRejection', err => {
    throw err
})

global.expect = expect

global.mount = mount
global.render = render
global.shallow = shallow