import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "./User.css"
import { useContext, useEffect, useState } from "react";
import { MicarContext } from "../../context/MicarProvider";



function User(props) {

  const { putPerfil, getPerfil, getRegion, getCiudad, getComuna} = useContext(MicarContext);
  
  const [region,setRegion] = useState([])
  const [ciudad,setCiudad] = useState([])
  const [comuna,setComuna] = useState([])
  const [usuario,setUsuario] = useState({})

  const getUsuario = async () => {
    const usu = await getPerfil()
    setUsuario(usu)
  }


  const getRegiones = async () => {
    const reg = await getRegion()
    setRegion(reg)
  }
  const getCiudades = async () => {
    const selectBox = document.getElementById("region");
    const id_reg = selectBox.options[selectBox.selectedIndex].value;
    const ciu = await getCiudad(id_reg)
    setCiudad(ciu)
  }
  const getComunas= async () => {
    const selectBox = document.getElementById("ciudad");
    const id_ciu = selectBox.options[selectBox.selectedIndex].value;
    const com = await getComuna(id_ciu)
    setComuna(com)
  }

  useEffect(() => {
    getRegiones()
    getUsuario()
  },[])

  return (
    <>
    <Form className="form-perfil" onSubmit={putPerfil}>
      <div className="title">
        <div className="subtitle">
          <h3>{props.title}</h3>
        </div>
        <div className="img-title">
          <img src="../../user.png" className="img-perfil" />
        </div>
      </div>
      {
      <div className="form-user" >
        <div className="form-datos">
          <Form.Group className="mb-3" controlId="rut">
            <Form.Label>R.U.N</Form.Label>
            <Form.Control type="text" value={usuario.per_rut} />
          </Form.Group>  
          <Form.Group className="mb-3" controlId="nom">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder={usuario.per_nom} name="nomb"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="ape">
            <Form.Label>Apellido</Form.Label>
            <Form.Control type="text" placeholder={usuario.per_ape}/>
          </Form.Group>
        </div>
        <div className=" form-number">
          <Form.Group className="mb-3" controlId="edad">
            <Form.Label>Edad</Form.Label>
            <Form.Control type="number" placeholder={usuario.per_edad}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="fono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control type="number" placeholder={usuario.per_fono}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder={usuario.per_correo}/>
          </Form.Group>
        </div>
      </div>
      }
      <div className="form-selec mt-3">
      <Form.Select aria-label="Default select example" className="me-3 ms-3" id = "region" onChange= { () => getCiudades()}>
          <option value={usuario.id_reg}>{usuario.region}</option>
          {
            region.map((reg,i) => (
             <option key = {i} value={reg.id_reg}>{reg.region}</option>
            ))
          }  
        </Form.Select>
        <Form.Select aria-label="Default select example"  className="me-3" id = "ciudad" onChange= { () => getComunas()}>
          <option value={usuario.id_ciudad}>{usuario.ciudad}</option>
          {
            ciudad.map((ciu,i) => (
             <option key = {i} value={ciu.id_ciudad}>{ciu.ciudad}</option>
            ))
          }  
        </Form.Select>
        <Form.Select aria-label="Default select example" className="me-3" id = "comuna">
          <option value={usuario.id_comuna}>{usuario.comuna}</option>
          {
            comuna.map((com,i) => (
             <option key = {i} value={com.id_comuna}>{com.comuna}</option>
            ))
          }  
        </Form.Select>
      </div>
      <Form.Group className="mb-3" controlId="dir">
          <Form.Label>Dirección</Form.Label>
          <Form.Control type="text" placeholder={usuario.per_direc}/>
      </Form.Group>
      <div className="act">
      <Button variant="outline-dark" className="btn-udt" type="submit">Actualizar</Button>
      </div>
      </Form>
      <Form>
      < div className="pass mb-3">
          <Form.Group className="mb-3" controlId="pass">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" autoComplete="off"/>
          </Form.Group>
          <Button variant="outline-dark" className="btn-pass"> Cambiar</Button>
      </div>
      </Form>
    </>
  )
}

export default User
