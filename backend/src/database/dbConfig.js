require ('dotenv').config()
const { Pool } = require('pg') 

const {DB_USER,DB_HOST,DB_PASS,DB_DBASE} = process.env

const database = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_DBASE,
    allowExitOnIdle: true  
})

database.connect(function(error){
    if(error){
        throw error
    }else{
        console.log('Connecting Database')
    }
})
// dsource.end()
module.exports = {database}