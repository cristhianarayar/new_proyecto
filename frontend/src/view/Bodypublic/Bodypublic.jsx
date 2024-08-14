import "./Bodypublic.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useContext, useEffect, useState } from 'react';
import { MicarContext } from "../../context/MicarProvider";
import Cardpublic from "./Cardpublic";

const Bodypublic = () => {

  const { getTienda } = useContext(MicarContext)
  const [producto,setProducto] = useState([])
  const getTiendas = async () => {
    const data = await getTienda()
    setProducto(data)
  }

  useEffect(()=>{
    getTiendas()
},[])

  return (
    <div className="body-market flex-column">
      <h3>Productos</h3>
      <div className="body-card flex-row">
        {
          producto.map((produc, i) => ( 
            <div className="margen flex-row" key={i}>    
                <Cardpublic prod = {produc} />
            </div>  
          ))
        }
      </div>
    </div>
  );
};

export default Bodypublic;
