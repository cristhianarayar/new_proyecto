const { postCtrLogin,postCtrRegistro,getCtrPerfil,getCtrlTienda,getCrtlUsu,getCtrlTiendaUser,postCtrRegProd,getCtrlBuscarProd, putCtrlPerfil, putCtrlPass, getCtrlDetalleProd, putCtrlProducto, postCtrlCarrito, getCtrlCarrito, putCtrlCarrito, postCtrlVenta, getCtrlVenta, getCtrlRegion, getCtrlCiudad, getCtrlComuna} = require ("../../controller/controllerMicar")
const { validateLoginMiddleware } = require ('../../middlewares/loginMicar') 
const { authMicar } = require ('../../middlewares/authMicar')
const fileroute = require('express').Router()


fileroute.get("/",getCtrlTienda)
fileroute.get("/detalle/:id",getCtrlDetalleProd)
fileroute.get("/home-private",getCtrlTienda)
fileroute.get("/home-private/region",getCtrlRegion)
fileroute.get("/home-private/region/:id",getCtrlCiudad)
fileroute.get("/home-private/region/ciudad/:id",getCtrlComuna)

// ------> Post
fileroute.post("/login",validateLoginMiddleware,postCtrLogin)
fileroute.post("/crear-recuperar",postCtrRegistro)
fileroute.post("/home-private/agregar",postCtrRegProd)
fileroute.post("/home-private/carrito",postCtrlCarrito)
fileroute.post("/home-private/venta",postCtrlVenta)

// ------> Get
fileroute.get("/home-private/mi-perfil",authMicar,getCtrPerfil)
fileroute.get("/home-private/mi-perfil/:rut",getCrtlUsu)
fileroute.get("/home-private/mi-tienda",getCtrlTiendaUser)
fileroute.get("/home-private/actualizar",getCtrlBuscarProd)
fileroute.get("/home-private/detalle-producto/:id",getCtrlDetalleProd)
fileroute.get("/home-private/carrito/:rut",getCtrlCarrito)
fileroute.get("/home-private/venta",getCtrlVenta)

// ------> Put
fileroute.put("/home-private/mi-perfil/:rut",putCtrlPerfil)
fileroute.put("/home-private/mi-perfil/pass/:rut",putCtrlPass)
fileroute.put("/home-private/actualizar/:id",putCtrlProducto)
fileroute.put("/home-private/actualizar/carrito/:id_detalle",putCtrlCarrito)

module.exports = fileroute