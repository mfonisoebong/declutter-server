const {Router} = require('express')

const testRouter = Router()
const {testMessage} = require('./controllers')

testRouter.get('/', testMessage)

module.exports = {
    testRouter
}