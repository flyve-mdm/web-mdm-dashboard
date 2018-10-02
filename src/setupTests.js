import enzyme from 'enzyme'
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16'
import '../public/config'

enzyme.configure({ adapter: new Adapter() })

global.sinon = sinon

global.mount = enzyme.mount
global.render = enzyme.render
global.shallow = enzyme.shallow

// const localStorageMock = (function () {
//   let store = {}
//   return {
//     getItem(key) {
//       return store[key] || null
//     },
//     setItem(key, value) {
//       store[key] = value.toString()
//     },
//     removeItem(key) {
//       delete store[key]
//     },
//     clear() {
//       store = {}
//     },
//   }
// }())

// global.localStorage = localStorageMock
// // Object.defineProperty(window, 'localStorage', {
// //   value: localStorageMock,
// // })
