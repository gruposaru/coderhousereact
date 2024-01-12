import React from 'react'
import Item from '../Item/Item'
//Ordenamos y recorremos los item para mostrarlos en pantalla
const ItemList = ({item}) => {
  return (
    <div className='row' id='itemlist'>
      {
      item.map(item=>
      
      <div className='col-md-3'
       key={item.id}>
       <Item item={item}/> 
       </div>
      )   
      }
   </div>
  )
}

export default ItemList