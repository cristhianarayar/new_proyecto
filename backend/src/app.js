require ('dotenv').config()
const express = require('express')
const routes = require('./routes/route')
const cors = require('cors')
const morgan = require('morgan')
const { HandleDatabaseLogs } = require ('../src/middlewares/logsMicar')


const app = express()

const {FRONT_URL} = process.env

app.use(express.json())

app.use(morgan('dev'))

 app.use(cors({
     origin: '*'
 }))

 app.use('/',HandleDatabaseLogs,routes)

module.exports = app