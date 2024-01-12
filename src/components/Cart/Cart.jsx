import React from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../Context/CartContext.jsx';
import ItemCart from '../ItemCart/ItemCart.jsx';
import { getFirestore,collection,addDoc } from 'firebase/firestore';
//Componente de carrito
const Cart = () => {
  const { cart, totalPrice } = useCartContext();
 
//Creamos un obejto para probar
const order={
buyer:{
    name:'pepito',
    email:'store@gmail.com',
    phone:'1234567890',
    address:'calle donde vivo'
},
items:cart.map((product)=>({
    id:product.id,
    title:product.title,
    price:product.price,
    quantity:product.quantity,
})),
total:totalPrice(),

};

//Funcion que nos conecta con firebase
const handleClick=()=>{
    const db = getFirestore();
    const ordersCollection= collection(db,"orders");
    addDoc(ordersCollection,order).then(({id})=> console.log(id))   ;
}

//Validamos que no venga vacio
  if (cart.length === 0) {
    return (
      <>
        <p>No hay elementos en el carrito</p>
        <Link to="/">Hacer compras</Link>
      </>
    );
  }

  return (
    <>
     {cart.map((product) => (
        <ItemCart key={product.id} product={product} />
      ))}
       <div className="formulario">
      <p>total: $ {totalPrice()}</p>
   
      <Link to="/checkout">
        {' '}
        <button onClick={handleClick}  className="btn-total">Finalizar Compra</button>
      </Link>
      </div>
    </>
  );
};

export default Cart;
