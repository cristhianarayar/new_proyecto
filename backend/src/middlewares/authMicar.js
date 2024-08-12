require('dotenv').config()
const jwt = require('jsonwebtoken');
const { queryMicar } = require('../database/querys/Micarquerys')

const authMicar = async (req, res, next) => {

    try {
        const Authorization = req.header("Authorization")

        const token = Authorization.split("Bearer ")[1]
        
        jwt.verify(token, process.env.JWT_JOB)

        const  {rut}  = jwt.decode(token)

        console.log('token--> ',rut)
        
        req.user =  { rut } 

        next()

    } catch (error) {
        next(error)
    }
}

module.exports = {
    authMicar
}