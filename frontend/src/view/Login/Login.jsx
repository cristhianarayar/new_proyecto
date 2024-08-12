import Form from "react-bootstrap/Form";
import "./Login.css";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { MicarContext } from "../../context/MicarProvider";

const Login = (props) => {
  const { handleLoginSubmit } = useContext(MicarContext);
  return (
    <div className="login">
      <div className="form-login">
        <Form onSubmit={handleLoginSubmit}>
        <h3>{props.title}</h3>
          <Form.Group className="mb-3" controlId="rut">
            <Form.Label>R.U.N</Form.Label>
            <Form.Control type="text" placeholder="Ingrese RUN"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="pass">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" autoComplete="off"/>
          </Form.Group>
          <div className="active btn-login">
            <Button variant="outline-dark" type = "submit" >Inicio</Button>
            <hr className="line " />
          </div>
          <div className="btn-crerec1">
            <NavLink to="/crear-recuperar" className="active">
              <Button variant="outline-dark" >
                Crea o recupera tu clave aquí
              </Button>
            </NavLink>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
