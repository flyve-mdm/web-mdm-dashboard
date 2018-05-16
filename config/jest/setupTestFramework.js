const storage = {
    getItem: function (key) {
        return this[key]
    },
    setItem: function (key, value) {
        this[key] = value
    }
}

window.localStorage = window.sessionStorage = storage
