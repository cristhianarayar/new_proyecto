import { createContext, useState } from 'react';
import axios from 'axios';
import { decodeToken, handleCrypt, handleDecrypt } from '../helpers/helpers';
import * as dotenv from 'dotenv'

const { VITE_SERVER_URL, VITE_SERVER_URL_LOCAL, CRYPTO_SECRET } = import.meta
	.env;

export const MicarContext = createContext();

const MicarProvider = ({ children }) => {
	const [userSession, setUserSession] = useState(
		localStorage.getItem('session')
			? JSON.parse(handleDecrypt(localStorage.getItem('session')))
			: {
		role: '',
		rut: '', 
	});

	const [token, setToken] = useState(
		localStorage.getItem('token') ? localStorage.getItem('token') : null
	);

	const [isLoggedIn, setisLoggedIn] = useState(true);

	const logIn = async (userData) => {
		
		const response = await axios.post(`${VITE_SERVER_URL}/login`,userData) 
		const {token} = response.data
		return token
	};

	const logOut = () => {
	
		setUserSession({
			role: '',
			rut: '',
		});

		setToken(null);

		localStorage.removeItem('token');
		localStorage.removeItem('session');
	};

	const getPerfil = async () => {
		const rut = userSession.rut
		const response = await axios.get(`${VITE_SERVER_URL}/home-private/mi-perfil/${rut}`) 
		const usu = response.data
		return usu 
	}

	const putPerfil =  async () => {
		const rut = userSession.rut

		const nombre = document.getElementById("nom").value
		const apellido = document.getElementById("ape").value
		const edad = document.getElementById("edad").value
		const fono = document.getElementById("fono").value
		const email = document.getElementById("email").value
		const direccion = document.getElementById("dir").value
		const region = document.getElementById("region").value
		const ciudad = document.getElementById("ciudad").value
		const comuna = document.getElementById("comuna").value
		const image = "imagen-perfil-jpg"

		const userData = {
			nombre,
			apellido,
			edad,
			fono,
			email,
			direccion,
			region,
			ciudad,
			comuna,
			image,
		};

		alert(nombre+apellido+edad+email+direccion+region+ciudad+comuna+image)
		const response = await axios.put(`${VITE_SERVER_URL}/home-private/mi-perfil/${rut}`,userData) 
		const actUsu = response.data
		return actUsu 
	}

	const getDetPub = async (id) =>{

		const userData = await axios.get(`${VITE_SERVER_URL}/detalle/${id}`)
		const data = userData.data
		return data
	}

	const getDetPiv = async (id) =>{

		const userData = await axios.get(`${VITE_SERVER_URL}/home-private/detalle-producto/${id}`)
		const data = userData.data
		return data
	}

	const getTienda = async () => {
		const userData = await axios.get(`${VITE_SERVER_URL}/`)
		const data = userData.data
		return data
	}

	const getTiendaPrivate = async () => {
		const userData = await axios.get(`${VITE_SERVER_URL}/home-private`)
		const data = userData.data
		return data
	}

	const getMiTienda = async () => {
		const rut = userSession.rut
		const userData = await axios.get(`${VITE_SERVER_URL}/home-private/mi-tienda?rut=${rut}`)
		const data = userData.data
		return data
	}

	const getCarrito = async () => {
		const rut = userSession.rut
		const userData = await axios.get(`${VITE_SERVER_URL}/home-private/carrito/${rut}`)
		const data = userData.data
	return data
	}

	const getVenta = async () => {
		// const userData = await axios.get(`${VITE_SERVER_URL}/home-private/venta?id=1&rut=126643675&id_v=2&vta=true`)
		// const data = userData.data
		window.location.href = '/home-private/venta';
	return data
	}

	const getRegion = async () => {
		const userData = await axios.get(`${VITE_SERVER_URL}/home-private/region`)
		const data = userData.data
		return data
	}

	const getCiudad = async (id) => {
		const userData = await axios.get(`${VITE_SERVER_URL}/home-private/region/${id}`)
		const data = userData.data
		return data
	}

	const getComuna = async (id) => {
		const userData = await axios.get(`${VITE_SERVER_URL}/home-private/region/ciudad/${id}`)
		const data = userData.data
		return data
	}

	const getCategoria = async () => {
		const userData = await axios.get(`${VITE_SERVER_URL}/home-private/producto/categoria`)
		const data = userData.data
		return data
	}

	const postProducto = async () => {
		
		const rut = userSession.rut
		const categoria = document.getElementById("cat").value
		const producto = document.getElementById("pro").value
		const descripcion = document.getElementById("des").value
		const cantidad = document.getElementById("can").value
		const valor = document.getElementById("val").value
		const image = "imagen-perfil-jpg"
		const likes = 1
		const userData ={
			categoria,
			rut,
			producto,
			descripcion,
			cantidad,
			valor,
			image,
			likes,	
		};

		const response = await axios.post(`${VITE_SERVER_URL}/home-private/agregar`,userData)
		const {data} = response.data	
		return data

	}

	const postPerfil = async () => {

		const ruts = document.getElementById("rut").value.replaceAll(".","")
		const password = document.getElementById("pass").value
		const rut = ruts.replaceAll("-","")	
		const nombre = document.getElementById("nom").value
		const apellido = document.getElementById("ape").value
		const edad = document.getElementById("edad").value
		const fono = document.getElementById("fono").value
		const email = document.getElementById("email").value
		const direccion = document.getElementById("dir").value
		const region = document.getElementById("region").value
		const ciudad = document.getElementById("ciudad").value
		const comuna = document.getElementById("comuna").value
		const image = "imagen-perfil-jpg"

		const userData = {
			rut,
			nombre,
			apellido,
			edad,
			fono,
			email,
			direccion,
			region,
			ciudad,
			comuna,
			password,
			image,
		};

		 const response = await axios.post(`${VITE_SERVER_URL}/crear-recuperar`,userData)
		 const {data} = response.data	
		 return data

	}

	const postCarrito = async (data) => {
		const year = new Date().getFullYear()
		const {idpro,valor} = data
		const id_detalle = new Date().getFullYear()
		const per_rut = userSession.rut
		const id_producto = data[0]
		const cantidad = 1
		const total = data[1]

		const userData ={
			id_detalle,
			per_rut,
			id_producto,
			cantidad,
			total,	
		};

		const response = await axios.post(`${VITE_SERVER_URL}/home-private/carrito`,userData)
		const {datas} = response.data	
		return datas
	}

	const handleLoginSubmit = async (event) => {
		event.preventDefault();

		const ruts = document.getElementById("rut").value.replaceAll(".","")
		const password = document.getElementById("pass").value
		const rut = ruts.replaceAll("-","")

		const userData = {
			rut,
			password,
		};

		const token = await logIn(userData)
		const userSesion = decodeToken(token)

		setUserSession({
			role: 'admin',
			rut: userSesion.rut,
		});

		setisLoggedIn(true);

		localStorage.setItem('token', handleCrypt(token));

		localStorage.setItem(
			'session',
			handleCrypt(
				JSON.stringify({
					role: 'admin',
					rut: userSesion.rut,
				})
			)
		);

		setToken(handleCrypt(token));

		window.location.href = '/home-private';
	}

	return (
		<>
			<MicarContext.Provider
				value={{ 
					isLoggedIn, 
					userSession, 
					logOut, 
					logIn, 
					getTienda, 
					getTiendaPrivate,
					getMiTienda,
					getCarrito,
					getVenta,
					postPerfil,
					getRegion,
					getCiudad,
					getComuna,
					getDetPub,
					getDetPiv,
					getPerfil,
					putPerfil,
					postProducto,
					getCategoria,
					postCarrito,
					handleLoginSubmit 
				}}
			>
				{children}
			</MicarContext.Provider>
		</>
	);
};

export default MicarProvider