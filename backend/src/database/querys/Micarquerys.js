const { database } = require("../dbConfig");
const { encryptHashPassword } = require("../../util/util");
const { query } = require("express");
// const format = require('pg-format')

const registrarProducto = async (categoria,rut,producto,descripcion,cantidad,valor,image,likes) => {
  try {
    const sql = "INSERT INTO producto (id_prod,pro_id_cat,id_per_rut,pro_nom,pro_desc,pro_cant,pro_val,pro_img,pro_like) VALUES (DEFAULT, $1,$2,$3,$4,$5,$6,$7,$8) RETURNING*;";
    const values = [parseInt(categoria),rut,producto,descripcion,parseInt(cantidad),parseInt(valor),image,parseInt(likes)];
    const {rowCount} = await database.query(sql,values)
    console.log(rowCount)
    if (rowCount){
      return {message: "Se ha registrado un prodcuto sin problemas",
        code:200}
      }else{
        return {message: "No se ha podido registrar un producto",
          code:201
        }
      }
    } catch (error) {
      throw error;
  }
}

const registraPerfil = async (rut,nombre,apellido,edad,fono,email,direccion,region,ciudad,comuna,image) => {
    try{
        const sql = "INSERT INTO perfil (id_per,per_rut,per_nom,per_ape,per_edad,per_fono,per_correo,per_direc,per_id_region,per_id_ciudad,per_id_comuna,per_url) values (DEFAULT,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING*;";
        const values = [rut,nombre,apellido,edad,fono,email,direccion,parseInt(region),parseInt(ciudad),parseInt(comuna),image];
        const { rowCount } = await database.query(sql, values);  
        if(rowCount){
            return { message: "El usuario ha sido registrado",
              code:200
             };
        }else{
            console.log('ya no registre el perfil')
            const sql2 = "DELETE FROM login WHERE per_rut = $1 RETURNING*;";
            const values2 = [rut];
            const { rowCount2 } = await database.query(sql2, values2); 
            if(rowCount2){
                return { message: "Ha ocurrido un error al registrar el usuario",
                  code:403
                };
            }
        } 
    }catch (error) {
        throw error;
    }
}

const registraLogin = async (rut,password) => {
  try {
    console.log(rut)
    const passEncrypt = await encryptHashPassword(String(password));
    const sql = "INSERT INTO login (per_rut,lg_pass) values ($1,$2) RETURNING*;";
    const values = [rut, passEncrypt];
    const { rowCount } = await database.query(sql, values);
    if (rowCount) {
        return { message: "El usuario ha sido registrado se debe esperar segunda confirmación", code:200 };
    } else {
      return {
        message: "Hubo un problema al registrar usuario o el usuario ya existe, favor de intentar nuevamente",
        code: 404
      };
    }
  } catch (error) {
    throw error;
  }
};

const verificaCredencial = async (rut) => {

  try {

    const consulta = "SELECT * FROM login WHERE per_rut = $1";
    let values = [rut];
    const { rows } = await database.query(consulta, values);
    if (rows.length) {
      const user = rows[0];
      return user.lg_pass;
    } else {
      return {
        code: 404,
        message: "No se encontró ningún usuario con estas credenciales",
      };
    }
  } catch (error) {
    next(error);
  }
};

const mostrarUsuario = async (rut) => {
  try {
    const consulta = "SELECT p.per_rut, p.per_nom, p.per_ape, p.per_edad, p.per_fono, p.per_correo, r.region, r.id_reg, ci.ciudad, ci.id_ciudad, c.comuna, c.id_comuna, p.per_direc, p.per_url FROM perfil p INNER JOIN region r ON p.per_id_region = r.id_reg INNER JOIN ciudad ci ON p.per_id_ciudad = ci.id_ciudad INNER JOIN comuna c ON p.per_id_comuna = c.id_comuna WHERE p.per_rut = $1";
    let values = [rut];
    const { rows } = await database.query(consulta, values);

    if (rows.length) {
      const user = rows[0];

      return user;
    } else {
      return { msg: "No existe el usuario" };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const mostrarRegion = async () => {
    try {
        const sql = "SELECT id_reg, region FROM region;"
        const { rows } = await database.query(sql) 
        const reg = rows

        return reg
    } catch (error) {
        throw error;
    }
}

const mostrarCiudad = async (id_reg) => {
    try {
        const sql = "SELECT id_ciudad, ciudad FROM ciudad WHERE id_reg = $1;"
        let value = [parseInt(id_reg)]
        const { rows } = await database.query(sql,value) 
        const ciu = rows
        return ciu

    } catch (error) {
        throw error;
    }
}

const mostrarComuna = async (id_ciudad) => {
    try {
        const sql = "SELECT id_comuna, comuna FROM comuna WHERE id_ciudad = $1;"
        let value = [parseInt(id_ciudad)]
        const { rows } = await database.query(sql,value) 
        const com = rows
        return com
    } catch (error) {
        throw error;
    }
}

const mostrarTiendaUser = async (rut) => {
    try {
      const consulta = "SELECT p.id_prod, p.id_per_rut, p.pro_nom, p.pro_desc, p.pro_cant, c.cat_nom, p.pro_like, p.pro_img FROM producto p INNER JOIN categoria c ON p.pro_id_cat = c.id_cat WHERE p.pro_cant > 0 AND p.id_per_rut = $1;";
      let values = [rut];
      const { rows } = await database.query(consulta, values);
  
      if (rows.length) {
        const user = rows;
  
        return user;
      } else {
        return { message: "No ha cargado productos este usuario",
            code: 201
         };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const mostrarTienda = async () => {
    try {
      const consulta = "SELECT p.id_prod, p.id_per_rut, p.pro_nom, p.pro_desc, p.pro_cant, c.cat_nom, p.pro_val, p.pro_like, p.pro_img FROM producto p INNER JOIN categoria c ON p.pro_id_cat = c.id_cat WHERE p.pro_cant > 0;";
      const { rows } = await database.query(consulta);
  
      if (rows.length) {
        const user = rows;
  
        return user;
      } else {
        return { message: "No existe productos cargados",
            code: 201
        };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const mostrarCategoria = async () => {
    try {
      const consulta = "SELECT * FROM categoria";
      const { rows } = await database.query(consulta);
  
      if (rows.length) {
        const user = rows[0];
  
        return user;
      } else {
        return { message: "No existe productos cargados",
            code: 201
        };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const buscaProd = async (rut,producto) => {
      try {
        const {produ} = producto
        const consulta = "SELECT * FROM producto where id_per_rut = $1 and pro_nom LIKE '"+[produ]+"%' "
        const values = [rut]
        
        const { rows } = await database.query(consulta,values)
      
        if(rows.length){
          const prod = rows[0]
          return prod
        }else{
          return {message:"El producto buscado no existe o la referencia es incorrecta",
            code:403
          }
        }
      } catch (error) {
        console.log(error)
        throw error
      }
  }

  const actualizaProducto = async (id,categoria,producto,descripcion,cantidad,valor,image,likes) => {
      try {
        const udtprod = "UPDATE producto	SET pro_id_cat=$1, pro_desc=$2, pro_cant=$3, pro_val=$4, pro_like=$5, pro_nom=$6, pro_img=$7 WHERE id_prod = $8 RETURNING *;"
        const values = [categoria,descripcion,cantidad,valor,likes,producto,image,id]
        const {rowCount} = await database.query(udtprod,values)
        if (rowCount){
          return {message: "El producto fue actualizado", code:200 }          
        }else{
          return {message: "El producto no se actualizó", code:403 } 
        }
    
      } catch (error) {
        console.log(error)
        throw error
      }    
  }

  const actualizaPerfil = async (rut,nombre,apellido,edad,fono,email,direccion,region,ciudad,comuna,image) => {
    try {
      const updt = "UPDATE perfil SET per_nom = $1,per_ape = $2,per_edad = $3,per_fono = $4,per_correo = $5,per_direc = $6,per_id_region = $7,per_id_ciudad = $8,per_id_comuna = $9,per_url = $10 WHERE per_rut = $11 RETURNING *;"
      const values = [nombre,apellido,edad,fono,email,direccion,region,ciudad,comuna,image,rut]
      const { rowCount }= await database.query(updt,values);
      if ( rowCount ) {
           return   { message: "El usuario fue actualizado", code:200 };
      } else {
           return  { message: "No pudo se encontro o no se pudo actualizar el usuario", code: 404}
      }  
    } catch (error) {
      console.log(error)
      throw error
    }    
}

const actualizaPass = async (password,rut) => {
  try {
      const passEncrypt = await encryptHashPassword(String(password))
      const updtpass = "UPDATE login SET lg_pass = $1 WHERE per_rut = $2 RETURNING *;"
      const values = [passEncrypt,rut]
      const {rowCount}= await database.query(updtpass,values)
      if (rowCount){
          return  { message: "Se ha actualizado la contraseña", code:200 };
      } else {
          return  { message: "No pudo se encontro o no se pudo actualizar la contraseña", code: 404 }
      }
  } catch (error) {
    console.log(error)
    throw error
  }
}

const detalleProd = async (id) => {
  try {
    
    const detail = "SELECT p.id_prod, p.id_per_rut, u.per_nom ||' '|| u.per_ape nombre, p.pro_nom, p.pro_desc, p.pro_cant, c.cat_nom, p.pro_val, p.pro_like, p.pro_img FROM producto p INNER JOIN categoria c ON p.pro_id_cat = c.id_cat INNER JOIN perfil u ON p.id_per_rut = u.per_rut WHERE p.pro_cant > 0 AND p.id_prod = $1"
    const values = [parseInt(id)]
    const { rows } = await database.query(detail,values)
    if (rows.length){

      const detpro = rows[0]
      return(detpro)

    }else{

      return {message:"No se encontro el producto", code:404}

    }
  } catch(error) {
    console.log(error)
    throw error
  }
}

const registraCarrito = async (id_detalle,per_rut,id_producto,cantidad,total) => {
  try {
    const instCarrito = "INSERT INTO detalle_venta (id_det, per_rut, id_prod, det_cant, det_total) values ($1,$2,$3,$4,$5) RETURNING *;"
    const values = [id_detalle,per_rut,id_producto,cantidad,total]
    const  {rowCount} =await database.query(instCarrito,values)
    if ( rowCount ){
      return {message:'Se ha agregado al Carrito', code:200}
    }else{
      return {message:'No se a podido agregar', code:403}
    }

  } catch(error) {
    console.log(error)
    throw error    
  }
}

const listarCarrito = async (rut) => {
  try {
    const listCarrito = "SELECT id_det, p.pro_nom, p.pro_desc, p.pro_img, d.det_cant, d.det_total FROM detalle_venta d INNER JOIN producto p ON d.id_prod = p.id_prod WHERE d.per_rut = $1;"
    const value = [rut]
    const { rows } = await database.query(listCarrito,value)
    if (rows.length){
      const lista = rows
      return (lista)
    }else{
      return {message:'No se encontraron productos en el carrito', code:404}
    }
  } catch(error) {
    console.log(error)
    throw error     
  }

} 

const actualizaCarrito = async (id_producto, cantidad, total, id_detalle, per_rut) =>{
  try {
    const actCarrito = "UPDATE detalle_venta	SET det_cant = $1, det_total = $2	WHERE id_prod = $3 and id_det = $4 and per_rut = $5 RETURNING *;"
    const values = [cantidad, total,id_producto, id_detalle, per_rut]
    const {rowCount} = await database.query(actCarrito,values)
    if (rowCount){
      return {message:'Se actualiza carrito sin problema', code:200}
    }else{
      return {message:'No se actualiza carrito', code:403}
    }

  } catch(error) { 
    console.log(error)
    throw error      
  }

}

const instVentas = async (id_detalle, region, comuna, ciudad, direccion, banco, cuenta, total, num_cuenta, fecha, pago) => {
  try {
    const instVta = "INSERT INTO ventas(id_ventas, id_det, id_reg_ven, id_com_ven, id_ciu_ven, vent_dir, id_bco, id_cta, ven_tot,ven_numcta, ven_fec, ven_pagado) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;"
    const values = [id_detalle, region, comuna, ciudad, direccion, banco, cuenta, total, num_cuenta, fecha]
    const  {rowCount} =await database.query(instVta,values)
    if ( rowCount ){
      return {message:'Se inserto venta sin problemas', code:200}
    }else{
      return {message:'No se a podido insertar venta', code:403}
    }
  } catch(error) {
    console.log(error)
    throw error      
  }
}

const datosVentas = async (id,rut,id_v,vta) => {
  try {
    const datoVenta = "SELECT distinct(u.per_rut), u.per_nom||' '|| u.per_ape Nombre, u.per_fono, u.per_correo, v.vent_dir, r.region, ci.ciudad, co.comuna, b.bco_nom, ct.tpo_cta, v.ven_numcta FROM ventas v INNER JOIN detalle_venta d  ON v.id_det = d.id_det INNER JOIN banco b ON v.id_bco = b.id_bco INNER JOIN cuenta ct ON v.id_cta = ct.id_cta INNER JOIN region r ON v.id_reg_ven = r.id_reg INNER JOIN ciudad ci ON v.id_ciu_ven = ci.id_ciudad INNER JOIN comuna co ON v.id_com_ven = co.id_comuna INNER JOIN perfil u ON d.per_rut = u.per_rut WHERE d.id_det = $1 AND u.per_rut = $2 AND v.id_ventas = $3 AND v.ven_pagado = $4;"
    const values = [id,rut,id_v,vta]
    const {rows} = await database.query(datoVenta,values)
    if(rows.length){
      const datos = rows
      return (datos)
    }else{
      return {message:'No existe venta', code:404}
    }
  } catch(error) {
    console.log(error)
    throw error       
  }
  
}

const mostVentas = async (id,rut,id_v,vta) => {
  try {
    const mostrarVenta = "SELECT p.pro_nom, c.cat_nom,d.det_cant, p.pro_val, d.det_total,v.ven_numcta, v.ven_fec FROM ventas v INNER JOIN detalle_venta d  ON v.id_det = d.id_det INNER JOIN producto p ON p.id_prod = d.id_prod INNER JOIN categoria c ON p.pro_id_cat = c.id_cat WHERE  d.id_det = $1 AND d.per_rut = $2 AND v.id_ventas = $3 AND v.ven_pagado = $4"
    const values = [id,rut,id_v,vta]
    const {rows} = await database.query(mostrarVenta,values)
    if(rows.length){
      const venta = rows
      return (venta)
    }else{
      return {message:'No existe venta', code:404}
    }
  } catch(error) {
    console.log(error)
    throw error       
  }
  
}
const queryMicar = { actualizaPass, verificaCredencial, registraLogin, registraPerfil, mostrarUsuario, mostrarRegion,
    mostrarTiendaUser, mostrarCiudad, mostrarComuna, mostrarTienda, registrarProducto, mostrarCategoria, registraCarrito,
    buscaProd, actualizaProducto, actualizaPerfil, detalleProd, listarCarrito, actualizaCarrito, instVentas, mostVentas, datosVentas };

module.exports = { queryMicar };