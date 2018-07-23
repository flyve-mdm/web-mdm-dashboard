require('../tempPolyfills')
const enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
const sinon = require('sinon')

enzyme.configure({ adapter: new Adapter() })

process.on('unhandledRejection', (err) => {
  throw err
})

global.sinon = sinon

global.mount = enzyme.mount
global.render = enzyme.render
global.shallow = enzyme.shallow
