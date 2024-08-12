import "./Misproductos.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Cardmisproductos = (produc) => {

  return (
    <>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="../src/assets/cardprueba.jpg" className="card-img-top"/>
          <Card.Body>
            <Card.Title>{produc.prod.pro_nom}</Card.Title>
              <hr/>
              <Card.Text><strong>Descripción: </strong>{produc.prod.pro_desc}</Card.Text>
              <div className="val">
                <Card.Text className="me-3"><strong>Cantidad: </strong>{produc.prod.pro_cant}</Card.Text>
                <Card.Text><strong>Valor: </strong>${produc.prod.pro_val}</Card.Text>
              </div>
              <Card.Text><strong>Categoría: </strong>{produc.prod.cat_nom}</Card.Text>
            <Button variant="dark" className="ver">Actualizar</Button>
          </Card.Body>
        </Card>

    </>
  );
};

export default Cardmisproductos;