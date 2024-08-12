import Bodypublic from "../view/Bodypublic/Bodypublic";
import Login from "../view/Login/Login";
import Crearuser from "../view/Crearuser/Crearuser";
import Footer from "../componets/Footer/Footer";
import Headerpublic from "../componets/Headerpublic/Headerpublic";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RouterSecurity from "./RouterSecurity";
import { MicarContext } from "../context/MicarProvider";
import { useContext } from "react";
import Bodyprivate from "../view/Bodyprivate/Bodyprivate";
import Menu from "../componets/Menu/Menu";
import Ventas from "../view/Venta/Venta";
import Misproductos from "../view/Misproductos/Misproductos";
import Agregarproducto from '../view/Agregarproducto/Agregarproducto';
import Carrito from '../view/Carrito/Carrito';
import User from '../view/User/User';
import Actualizarproducto from '../view/Actualizarproducto/Actualizarproducto';

const RouterLink = () => {
  const { userSession, isLoggedIn } = useContext(MicarContext);

  return (
    <>
      <BrowserRouter>
      <Headerpublic />
      <Menu />
        <Routes>
            <Route path="/" index element={<Bodypublic />} />
            <Route path="/login" element={<Login title='Login'/>} />
            <Route path="/crear-recuperar" element={<Crearuser title='Usuario'/>} />
          <Route
            element={
              <RouterSecurity
                isAllowed={userSession.role.includes("admin") && isLoggedIn}
              />
            }
          >     
            <Route path="/home-private" element={<Bodyprivate title='Productos'/>} />
            <Route path="/home-private/tienda" element={<Bodyprivate title='Nuestros Productos'/>} />
            <Route path="/home-private/agregar" element={<Agregarproducto title='Agregar Producto'/>} />
            <Route path="/home-private/mi-tienda" element={<Misproductos title='Mis Producto'/>} />
            <Route path="/home-private/actualizar/:producto" element={<Actualizarproducto title='Actualizar Producto'/>} />
            <Route path="/home-private/venta" element={<Ventas title='Ventas'/>} />
            <Route path="/home-private/carrito" element={<Carrito title='Mi Carrito'/>} />
            <Route path="/home-private/mi-perfil" element={<User title='Mi Perfil'/>} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default RouterLink;
