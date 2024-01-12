import React from 'react';
import { useCartContext } from '../Context/CartContext';

//Componete que nos muestra el item con sus atrivutos
const ItemCart = ({ product }) => {
    const { removeProduct } = useCartContext();
    return (
      <div className="formulario">
        <img  src={product.img} alt={product.title} />
        <div>
          <p>Título: {product.title}</p>
          <p>Cantidad: {product.quantity}</p>
          <p>Precio u.: {product.price}</p>
          <p>Subtotal: ${product.quantity * product.price}</p>
          <button onClick={() => removeProduct(product.id)}>Eliminar</button>
        </div>
      </div>
    );
};

export default ItemCart;