import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import "./Crearuser.css";
import { useContext, useEffect, useState } from "react";
import { MicarContext } from "../../context/MicarProvider";

function Crearuser(props) {

  const { postPerfil, getRegion, getCiudad, getComuna} = useContext(MicarContext);
  
  const [region,setRegion] = useState([])
  const [ciudad,setCiudad] = useState([])
  const [comuna,setComuna] = useState([])
  
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
  },[])

  
  return (
    <div className="div-form">
    <Form className="form" onSubmit={postPerfil}>
      <h3>{props.title}</h3>
      <div className="validate">
        <Form.Group className="mb-3" controlId="rut">
          <Form.Label>R.U.N</Form.Label>
          <Form.Control type="text" placeholder="Ingrese R.u.n"/>
        </Form.Group>
      </div>
      <div className="form-data">
        <Form.Group className="mb-3" controlId="pass">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" autoComplete="off"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="nom">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Nombre"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="ape">
          <Form.Label>Apellido</Form.Label>
          <Form.Control type="text" placeholder="Apellido"/>
        </Form.Group>
      </div>
      <div className="form-date">
        <Form.Group className="ms-5 mb-3 me-4" controlId="edad">
          <Form.Label>Edad</Form.Label>
          <Form.Control type="number" placeholder="99"/>
        </Form.Group>
        <Form.Group className="mb-3 ms-5" controlId="fono">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control type="number" placeholder="912345678"/>
        </Form.Group>
      </div>
      <div className="form-dir">
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"/>
        </Form.Group>
      </div>
      <div className="select">
        <Form.Select aria-label="Default select example" className="me-3 ms-3" id = "region" onChange= { () => getCiudades()}>
          <option>Región</option>
          {
            region.map((reg,i) => (
             <option key = {i} value={reg.id_reg}>{reg.region}</option>
            ))
          }  
        </Form.Select>
        <Form.Select aria-label="Default select example"  className="me-3" id = "ciudad" onChange= { () => getComunas()}>
          <option>Ciudad</option>
          {
            ciudad.map((ciu,i) => (
             <option key = {i} value={ciu.id_ciudad}>{ciu.ciudad}</option>
            ))
          }  
        </Form.Select>
        <Form.Select aria-label="Default select example" className="me-3" id = "comuna">
          <option>Comuna</option>
          {
            comuna.map((com,i) => (
             <option key = {i} value={com.id_comuna}>{com.comuna}</option>
            ))
          }  
        </Form.Select>
      </div>
      <div className="form-dir mt-3" >
        <Form.Group className="mb-3" controlId="dir">
          <Form.Label>Dirección</Form.Label>
          <Form.Control type="text" placeholder="Dirección"/>
        </Form.Group>
      </div>
      <div className="create">
        <Button variant="outline-dark" className="btn-crerec" type = "submit">
          Crear
        </Button>
      </div>
    </Form>
    </div>
  );
}

export default Crearuser;
