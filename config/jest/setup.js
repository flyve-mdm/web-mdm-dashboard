require('../tempPolyfills')
let enzyme = require('enzyme')
let Adapter = require('enzyme-adapter-react-16')
let sinon = require('sinon')

enzyme.configure({ adapter: new Adapter() })

process.on('unhandledRejection', err => {
  throw err
})

global.sinon = sinon;

global.mount = enzyme.mount
global.render = enzyme.render
global.shallow = enzyme.shallow

