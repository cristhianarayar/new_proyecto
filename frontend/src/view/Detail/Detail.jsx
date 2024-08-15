import "./Detail.css";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

const Detail = () => {
  return (
    <div className="detail">
      <div className="detail-img">
        <Image src="../cardprueba.jpg" rounded className="img-card" />
      </div>
      <div className="detail-txt">
        <p>Producto:</p>
        <p>Card Koreanas</p>
        <p>Descripción:</p>
        <p>Este producto es de Korea</p>
        <p>Cantidad:</p>
        <p>100</p>
        <p>Valor unitario:</p>
        <p>$5.000</p>
      </div>
      <div className="detail-btn">
        <Button variant="outline-dark" className="btn-pagar mb-3 mt-3">
          Agregar al Carrito
        </Button>
      </div>
    </div>
  );
};

export default Detail;
