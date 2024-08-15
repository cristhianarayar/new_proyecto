import './Carrito.css'
import Table from "react-bootstrap/Table"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import { NavLink} from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { MicarContext } from "../../context/MicarProvider";

const Carrito = (props) =>{

    const {getCarrito, getVenta} = useContext(MicarContext)
    const [producto,setProduct] = useState([])
    const [id,setId] = useState([])
    const getCarritos = async () => {
      const data = await getCarrito()
      setProduct(data)
    }

    useEffect(() => {
      getCarritos()
    },[])

    console.log(id)
    return(
        <div className="div-carrito">
      <h3>{props.title}</h3>
      <Table striped>
        <thead>
          <tr>
            <th ></th>
            <th className="aline1">Producto</th>
            <th className="aline1">Descripción</th>
            <th className="aline1">Cantidad</th>
            <th className="aline1">Valor</th>
          </tr>
        </thead>
        <tbody>
          {
            producto.map((produc,i) => (
              <tr key = {i} id = "grilla">
                <td className="aline1 td-img"><Image src="../cardprueba.jpg" rounded className="img-card1"/></td>
                <td className="aline1">{produc.pro_nom}</td>
                <td className="aline1">{produc.pro_desc}</td>
                <td className="aline1"><Button className="img-agr1 me-2"/>{produc.det_cant}<Button className="img-agr2 ms-2 mb-2"/></td>
                <td className="aline1 negro">{produc.det_total}</td>
            </tr>
            ))
          }
            <tr>
                <td colSpan={4} className="aline2 negro">
                  Total
                </td>
                <td className="aline1 negro">$1000000</td>
            </tr>
        </tbody>
        
      </Table>
      <div className="btn-pagar">
      <Button variant="outline-dark" className="btn-pagar mb-3 mt-3" onClick={ () => getVenta() }>Ir a Pagar</Button>
      </div>
    </div>
    )
}

export default Carrito