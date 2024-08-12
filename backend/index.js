require('dotenv').config()

const app = require('./src/app')
const PORT = process.env.PORT

app.listen(PORT,console.log(`Servidor corre en el PORT http://127.0.0.1:${PORT}`))