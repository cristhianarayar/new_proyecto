const express = require('express')
const routes = require('./routes/route')
const cors = require('cors')
const morgan = require('morgan')
const { HandleDatabaseLogs } = require ('../src/middlewares/logsMicar')

const app = express()

app.use(express.json())

app.use(morgan('dev'))

 app.use(cors({
     origin:'http://localhost:5173'
 }))

 app.use('/',HandleDatabaseLogs,routes)

module.exports = app