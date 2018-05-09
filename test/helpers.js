import { expect } from 'chai'

process.on('unhandledRejection', err => {
    throw err
})

global.expect = expect
