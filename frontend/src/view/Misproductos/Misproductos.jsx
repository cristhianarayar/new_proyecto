import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Misproductos.css";
import { NavLink} from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { MicarContext } from "../../context/MicarProvider";
import Cardmisproductos from "./Cardmisproductos";

const Misproductos = (props) => {
  
  const { getMiTienda } = useContext(MicarContext)
  const [producto,setProducto] = useState([])

  const getMisTiendas = async () => {
    const data = await getMiTienda()
    setProducto(data)
  }

  useEffect(()=>{
    getMisTiendas()
  },[])
  
  return (
    <Form className="producto flex-column">
      <h3>{props.title}</h3>
      <div className="td-buscar">
        <div className="lbl-buscar">
          <Form.Group className="mb-3 txt-inp" controlId="formGroupPassword">
            <Form.Label>Buscar Producto</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </div>
        <div className="btn-buscar">
         <Button variant="outline-dark" className="btn-add mt-3 mb-5">
            Buscar
          </Button>
        </div>
      </div>
      <div className="divcard">
      {
        producto.map((produc,i) => (
          <div className="margen" key = {i}>
            <Cardmisproductos prod= {produc} />            
          </div>          
        ))
      }        
        <div className="margen">
          
        </div>
      </div>
    </Form>
  );
};

export default Misproductos;
