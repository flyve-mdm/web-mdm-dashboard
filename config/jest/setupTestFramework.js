const storage = {
  getItem: function (key) {
    return this[key]
  },
  setItem: function (key, value) {
    this[key] = value
  },
  removeItem: function(key) {
    delete storage[key]
  }
}

window.localStorage = window.sessionStorage = storage

window.appConfig = {
  glpiApiLink: "your_URL",
  demoToken: "your_token",
  pluginToken: "your_token",
  appName: "MDM Dashboard",
  bugsnag: "your_bugsnag_key",
}

const xhrMockClass = () => ({
  open: jest.fn(),
  send: jest.fn(),
  setRequestHeader: jest.fn(),
})

window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass)
