import "./Bodyprivate.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { MicarContext } from "../../context/MicarProvider";
import Cardprivate from "./Cardprivate";

const Bodyprivate = (props) => {
  
  const { getTiendaPrivate } = useContext(MicarContext)
  const [producto,setProducto] = useState([])

  const getTiendasPrivate = async () =>{
    const data = await getTiendaPrivate()
    setProducto(data)
  }
    
  useEffect(()=>{
    getTiendasPrivate()
  },[])

  return (
    <div className="body-market2 flex-column">
      <h3>{props.title}</h3>
      <div className="body-card2 flex-row">
        {
          producto.map((produc,i) => (
            <div className="margen2 flex-row" key={i}>
              <Cardprivate prod = {produc} />
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Bodyprivate;