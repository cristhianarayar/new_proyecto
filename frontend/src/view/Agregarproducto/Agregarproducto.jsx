import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import './Agregarproducto.css'
import { useContext, useEffect, useState } from "react";
import { MicarContext } from "../../context/MicarProvider";


const Agregarproducto = (props) => {

  const [categoria,setCategoria] = useState ([])

  const { postProducto, getCategoria } = useContext(MicarContext)
  
  const getCategorias = async () => {
    const cat = await getCategoria()
    setCategoria(cat)
  }

    
  useEffect(() => {
    getCategorias()
  },[])

  return (
    <Form className="producto" onSubmit={postProducto}>
        <h3>{props.title}</h3>
      <Form.Group className="mb-3 txt-inp" controlId="pro">
        <Form.Label>Producto</Form.Label>
        <Form.Control type="text" placeholder="Producto" />
      </Form.Group>
      <Form.Select aria-label="Default select example" className="me-3 ms-3 selector" id = "cat">
        <option>Categoria</option>
            {
            categoria.map((cate,i) => (
             <option key = {i} value={cate.id_cat}>{cate.cat_nom}</option>
            ))
          }
      </Form.Select>
      <Form.Group className="mb-3 txt-inp" controlId="img">
        <Form.Label>Imagen</Form.Label>
        <Form.Control type="tex" placeholder="Imagen" />
      </Form.Group>
      <Form.Group className="mb-3 txt-inp" controlId="can">
        <Form.Label>Cantidad</Form.Label>
        <Form.Control type="number" placeholder="Cantidad" />
      </Form.Group>
      <Form.Group className="mb-3 txt-inp" controlId="val">
        <Form.Label>Valor</Form.Label>
        <Form.Control type="number" placeholder="Valor" />
      </Form.Group>
      <FloatingLabel controlId="des" label="Descripción" className='txt-inp'>
        <Form.Control 
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
        />
      </FloatingLabel>
      <Button variant="outline-dark" className="btn-add mt-3 mb-5" type='submit'>Agregar</Button>
    </Form>
  );
}

export default Agregarproducto