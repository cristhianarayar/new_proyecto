const { response, query } = require('express')
const  {queryMicar} = require ('../database/querys/Micarquerys')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const postCtrLogin = async (req,res,next) => {
    try {
        const token = req.token
        console.log({token})
        res.send({token})

    } catch (error) {
         console.log(error)
         res.status(error.code || 404).send(error)
    }
 
}

const postCtrRegistro = async (req,res,next) => {

    try {
    const {rut,nombre,apellido,edad,fono,email,direccion,region,ciudad,comuna,password,image} = req.body
    const responseLogin = await queryMicar.registraLogin(rut,password)
    if (responseLogin.code == 200){
        const response = await queryMicar.registraPerfil(rut,nombre,apellido,edad,fono,email,direccion,region,ciudad,comuna,image)
        res.send({response})
    }else{
        res.status(403).send('Usuario no creado')
    }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
        next(error)
    }
}

const getCrtlUsu = async (req,res,next) => {
    try {
        const rut = req.params.rut
        const user = await queryMicar.mostrarUsuario(rut)
        res.send (user)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
        next(error)        
    }
}

const getCtrPerfil = async (req,res,next) => {
    try {      
        const  {rut}  = req.user
        const user = await queryMicar.mostrarUsuario(rut)
        res.send ([user])

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
        next(error)
    }
    
}

const getCtrlTienda = async (req,res,next) => {
    try {
        const mostrarProd = await queryMicar.mostrarTienda()
        res.send (mostrarProd)
    } catch(error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
        next(error) 
    }
}

const getCtrlTiendaUser = async (req,res,next) => {
    try {
        const {rut} = req.query 
        const prodUser = await queryMicar.mostrarTiendaUser(rut)
        if(prodUser.code == 201){
            res.status(201).send([prodUser])
        }else{
            res.send(prodUser)
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
        next(error)         
    }
}

const postCtrRegProd = async (req,res,next) =>{
    try {
        const {categoria,rut,producto,descripcion,cantidad,valor,image,likes} = req.body
        const responseProd = await queryMicar.registrarProducto(categoria,rut,producto,descripcion,cantidad,valor,image,likes)
        if (responseProd.code == 200){
            res.status(200).send('Se ha registrado el producto sin problemas')
        }else{
            res.status(201).send('Producto ya se encontraba registrado')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
    }

}

const getCtrlDetalleProd = async (req,res,next) => {
    try {
        const id  = req.params.id
        const detail = await queryMicar.detalleProd(id)
        if(detail.code != 200){
            res.status(200).send(detail)
        }else{
            res.status(403).send('No existe detalle producto')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
        next(error) 
    }
}

const getCtrlRegion = async (req,res,next) => {
    try {
        const region = await queryMicar.mostrarRegion()
        res.status(200).send(region)
    } catch (error) {
        
    }
}

const getCtrlCiudad = async (req,res,next) => {
    try {
        const id = req.params.id
        const ciudad = await queryMicar.mostrarCiudad(id)
        res.status(200).send(ciudad)
    } catch (error) {
        
    }
}

const getCtrlComuna = async (req,res,next) => {
    try {
        const id = req.params.id
        const comuna = await queryMicar.mostrarComuna(id)
        res.status(200).send(comuna)
    } catch (error) {
        
    }
}

const getCtrlBuscarProd = async (req,res,next) => {
    try {
        const {rut,producto}  = req.query
        const buscaPro = await queryMicar.buscaProd(rut,producto)
        if(buscaPro.code == 403){
            res.status(403).send('No existe o no posee producto')
        }else{
            res.status(200).send([buscaPro])
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
        next(error) 
    }
}

const putCtrlPerfil = async (req,res,next) => {
try {
    const rut = req.params.rut
    const {nombre,apellido,edad,fono,email,direccion,region,ciudad,comuna,image} = req.body
    const updtPerfil = await queryMicar.actualizaPerfil(rut,nombre,apellido,edad,fono,email,direccion,region,ciudad,comuna,image)
    if (updtPerfil.code == 200){
        res.status(200).send('El usuario ha actualizado sus datos correctamente')
    }else{
        res.status(403).send('Usuario no encontrado o no actualizado')
    }
    
} catch (error) {
    console.log(error)
    res.status(500).json({message:'Internal Server Error'})
    next(error) 
}
}

const putCtrlPass = async (req,res,next) => {
    try {
        const rut = req.params.rut
        const {password} = req.body
        const updtPass = await queryMicar.actualizaPass(password,rut)
        if (updtPass.code == 200){
            res.status(200).send('Se han actualizado su contraseña correctamente')
        }else{
            res.status(403).send('Usuario no encontrado o contraseña no actualizado')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
        next(error) 
    }
}

const putCtrlProducto = async (req,res,next) => {
    try {
        const id = req.params.id
        const {categoria,producto,descripcion,cantidad,valor,image,likes} = req.body
        const updtprod = await queryMicar.actualizaProducto(id,categoria,producto,descripcion,cantidad,valor,image,likes)
        if (updtprod.code == 200){
            res.status(200).send('Se ha actualizado el producto satisfactoriamente')
        }else{
            res.status(403).send('Producto no encontrado o no actualizado')
        }
    } catch(error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
        next(error)        
    }
}

const postCtrlCarrito = async (req,res,next) => {
    try {
        const {id_detalle,per_rut,id_producto,cantidad,total} = req.body
        const instCarrito = await queryMicar.registraCarrito(id_detalle,per_rut,id_producto,cantidad,total)
        if(instCarrito.code == 200){
            res.status(200).send('Se agrego prdoucto al carrito')
        }else{
            res.status(403).send('No se ha agregado al carrito')
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
        next(error)   
    }
}

const getCtrlCarrito = async (req,res,next) => {
    try {
        const rut = req.params.rut
        const carrito = await queryMicar.listarCarrito(rut)
        if(carrito.code != 404){
            res.status(200).send(carrito)
        }else{
            res.status(404).send('No existen productos en el carrito')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
        next(error)         
    }
}

const putCtrlCarrito = async (req,res,next) => {
    try {
        const id_detalle = req.params.id_detalle
        const {id_producto, cantidad, total, per_rut}  = req.body
        const updtCarrito = await queryMicar.actualizaCarrito(id_producto, cantidad, total, id_detalle, per_rut)
        if (updtCarrito.code == 200){
            res.status(200).send('Se ha actualizado el carrito')
        }else{
            res.status(403).send('No se hA actualizado el carrito')
        }        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
        next(error) 
    }
}

const postCtrlVenta = async (req,res,next) => {
    try {
        const {id_detalle, region, comuna, ciudad, direccion, banco, cuenta, total, num_cuenta} = req.body
        const date = new Date()
        const pago = true
        const fecha = date.toLocaleDateString()
        const insertaVenta = await queryMicar.instVentas(id_detalle, region, comuna, ciudad, direccion, banco, cuenta, total, num_cuenta,fecha,pago)
        if(insertaVenta.code == 200){
            res.send('Se ha realizado su venta sin problemas')
        }else{
            res.status(403).send('Venta no ingresada')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
        next(error) 
    }
}

const getCtrlVenta = async (req,res,next) => {
    try {
        const {id,rut,id_v,vta} = req.query
        const datos = await queryMicar.datosVentas(id,rut,id_v,vta)
        const ventas = await queryMicar.mostVentas(id,rut,id_v,vta)
        if(ventas.code != 404){
            res.status(200).send({datos,ventas})
        }else{
            res.status(404).send('No existen ventas')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
        next(error)
    }
}

module.exports = {putCtrlPass, putCtrlPerfil, postCtrLogin,postCtrRegistro,getCtrPerfil, 
    getCtrlTienda, getCtrlTiendaUser, postCtrRegProd, getCtrlBuscarProd, getCtrlDetalleProd,
    getCtrlVenta, postCtrlVenta, putCtrlCarrito, getCtrlCarrito, postCtrlCarrito, putCtrlProducto,
    getCtrlRegion, getCtrlCiudad, getCtrlComuna,getCrtlUsu}