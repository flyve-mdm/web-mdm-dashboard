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
