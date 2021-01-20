const express = require('express')

const UserRouter =  require('./Routes/index')

const router = express.Router()

// User Routes
router.use('/auth', UserRouter)

module.exports = router
