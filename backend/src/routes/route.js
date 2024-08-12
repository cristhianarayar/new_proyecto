const router = require('express').Router()
const filesRouter = require('./files/fileMicar')

router.use('/', filesRouter)

module.exports = router