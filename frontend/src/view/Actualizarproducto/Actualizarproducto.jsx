import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./Actualizarproducto.css";

const Actualizarproducto = (props) => {
  return (
    <Form className="producto">
      <h3>{props.title}</h3>
      <Form.Group className="mb-3 txt-inp mt-5" controlId="formGroupPassword">
        <Form.Label>Producto</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3 txt-inp" controlId="formGroupPassword">
        <Form.Label>Imagen</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3 txt-inp" controlId="formGroupPassword">
        <Form.Label>Cantidad</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3 txt-inp" controlId="formGroupPassword">
        <Form.Label>Valor</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <FloatingLabel
        controlId="floatingTextarea2"
        label="Descripción"
        className="txt-inp"
      >
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "100px" }}
        />
      </FloatingLabel>
      <div className="btn-accion">
      <Button variant="outline-dark" className="btn-add mt-3 mb-5 me-5">
        Actualizar
      </Button>
      <Button variant="outline-dark" className="btn-add  mt-3 mb-5">
        Eliminar
      </Button>
      </div>
    </Form>
  )
}

export default Actualizarproducto
