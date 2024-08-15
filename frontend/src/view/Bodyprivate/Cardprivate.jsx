import "./Bodyprivate.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import { useContext, useState } from 'react';
import { MicarContext } from "../../context/MicarProvider";


const Cardprivate = (produc) => {

  const [show, setShow] = useState(false);
  const {getDetPiv, postCarrito} = useContext(MicarContext)

  const handleShow = async (id) => {
    setShow(true)
    const data = await getDetPiv(id)
    const obj1 = document.getElementById('title')
    obj1.innerHTML = data.pro_nom
    const obj2 = document.getElementById('des')
    obj2.innerHTML = data.pro_desc
    const obj3 = document.getElementById('dis')
    obj3.innerHTML = data.pro_cant
    const obj4 = document.getElementById('valor')
    obj4.innerHTML = data.pro_val
    const obj5 = document.getElementById('cat')
    obj5.innerHTML = data.cat_nom
    const obj6 = document.getElementById('nombre')
    obj6.innerHTML = data.nombre
  };
  const handleClose = () => setShow(false);

  const postCarritos = (idpro,valor) => {

      const data = [idpro,valor]
    postCarrito(data) 
  }

  return (
    <>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="../cardprueba.jpg" className="card-img-top"/>
          <Card.Body>
            <Card.Title>{produc.prod.pro_nom}</Card.Title>
              <hr/>
              <Card.Text><strong>Descripción: </strong>{produc.prod.pro_desc}</Card.Text>
              <div className="val">
                <Card.Text className="me-3"><strong>Cantidad: </strong>{produc.prod.pro_cant}</Card.Text>
                <Card.Text><strong>Valor: </strong>${produc.prod.pro_val}</Card.Text>
              </div>
              <Card.Text><strong>Categoría: </strong>{produc.prod.cat_nom}</Card.Text>
            <Button variant="dark" className="ver" onClick={() => handleShow(produc.prod.id_prod)} >Ver Detalle</Button>
          </Card.Body>
        </Card>
        <Modal show={show} onHide={handleClose}> 
        <Modal.Header closeButton className="mod-title">
          <Modal.Title id = "title" ></Modal.Title>
        </Modal.Header>
        <Modal.Body >  
          <div className="cuerpo">
              <div className="img-modal">
                <Image src="../cardprueba.jpg" className="img-mod"/>
              </div>
              <div className="desc-modal">
                  <p className="desc ms-3 mt-4"><strong>Descripción:</strong><p  id="des"></p></p>
                <p className="disp ms-3"><strong>Disponibilidad:</strong><p id="dis"></p></p>
                <p className="val ms-3 " ><strong>Valor:</strong><p id="valor"></p></p>
                <p className="cate ms-3"><strong>Categoría:</strong><p  id="cat"></p></p>
                <p className="cate ms-3 "><strong>Vendedor:</strong><p  id="nombre"></p></p>
              </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark btn-car" onClick={()=>postCarritos(produc.prod.id_prod,produc.prod.pro_val)}>
            Agregar al Carrito
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cardprivate;