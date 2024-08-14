require('dotenv').config()

const app = require('./src/app')
const { database, initDatabase } = require('./src/database/dbConfig')

const PORT = process.env.PORT

app.listen(PORT, async () => { 
    console.log(`Servidor corre en el PORT http://127.0.0.1:${PORT}`)
    await (initDatabase())
    
})