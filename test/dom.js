import { JSDOM } from 'jsdom'

const { window } = new JSDOM('<!doctype html><html><body></body></html>')

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {})
  Object.defineProperties(target, props)
}

window.localStorage = window.sessionStorage = {
    getItem: function (key) {
        return this[key]
    },
    setItem: function (key, value) {
        this[key] = value
    }
}

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js',
}


copyProps(window, global)