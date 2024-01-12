import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {getFirestore, collection, getDocs, where, query} from 'firebase/firestore';
import ItemList from '../ItemList/ItemList';

//Componete que nos muestra la lista de items
const ItemListContainer = () => {
//Creamos las variables que usaremos en el obejeto
   const [item, setItem] = useState([])
   const {id} = useParams();

//Funcion con la que nos conectamos al repositorio de datos
  useEffect(()=>{
   const queryDb = getFirestore();
   const queryCollection = collection(queryDb, 'products');

   if(id){
    const queryFilter = query(queryCollection, where('categoryId', '==', id));
    getDocs(queryFilter).then((res)=>
    setItem(res.docs.map((p)=> ({id: p.id, ...p.data() })))
    );
   } else{
    getDocs(queryCollection).then((res)=>
    setItem(res.docs.map((p)=> ({id: p.id, ...p.data() })))
    );
   }
  }, [id])

  return (
    <div className='container'>
      <div className='row'>
       
       <ItemList item={item} />


      </div>
    </div>
  )
}

export default ItemListContainer