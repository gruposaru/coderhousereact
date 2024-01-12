import React, {useState} from 'react';
import ItemCount from '../ItemCount/ItemCount';
import { Link } from 'react-router-dom';
import { useCartContext } from '../Context/CartContext';

//Componente de detalle del item
const ItemDetail = ({item}) => {
//Incializamos las variables 
  const[goToCart, setGoToCart] = useState(false);
  const {addProduct} = useCartContext()
  const onAdd = (quantity) =>{
   setGoToCart(true);
   addProduct(item, quantity);
  }

  return (
    <div className>
     <div className='col-md-4 offset-md-4'>
        <img src={item.img} className='img-fluid'alt={item.title}/>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <p> $ {item.price}</p>
        <p> Cantidad: {item.stock}</p>
     </div>
     <div>
      {goToCart ? <Link to='/cart'>Compra finalizada</Link> :<ItemCount stock={10} initial={1} onAdd={onAdd} />}
     </div>
     </div>
  )
}

export default ItemDetail