import { useState } from "react"
import { useCartContext } from "../Context/CartContext"
import {getFirestore, collection, addDoc, updateDoc, doc, getDoc} from 'firebase/firestore';

//Creamos el objeto con la información de las cajas de texto
export const CheckOut = () =>{
      const [nombre, setNombre] = useState('');
      const [apellido, setApellido] = useState('');
      const [telefono, setTelefono] = useState('');
      const [email, setEmail] = useState('');
      const [emailConfirmacion, setEmailConfirmacion] = useState('');
      const [error, setError] = useState('');
      const [ordenId, setOrdenId] = useState('');
      const [mensaje, setMensaje] = useState('');

     const {cart, totalPrice, removeProduct} = useCartContext();

     const manejadorFormulario = (event) =>{
      event.preventDefault();
     
//Validamos los cambios que esten completos
     if(!nombre || !apellido || !telefono || !email ||!emailConfirmacion ){
      setError('Por favor complete todos los campos requeridos');
      return;
     }

     //Confirmamos el email que sea igual
     if( email !== emailConfirmacion){
      setError('El email es diferente');
      return;
     }

//Obtenemos el total del precio
     const total = totalPrice();
     //Creamos la orden y su acomodo
     const orden ={
      items: cart.map((producto)=>({
        id: producto.id,
        nombre: producto.title,
        cantidad: producto.quantity,
      })),
      total: total,
      fecha: new Date(),
      nombre,
      apellido,
      telefono,
      email,
     };
     //Obtenemos los datos del repositoro
     Promise.all(
      orden.items.map(async (productoOrden)=>{
             const db = getFirestore();
             const productoRef = doc(db, 'products', productoOrden.id);

             const productoDoc = await getDoc(productoRef);
             const stockActual = productoDoc.data().stock;

             await updateDoc( productoRef, {
              stock: stockActual - productoOrden.cantidad,
             });
      })
     )
     .then(()=>{
       const db = getFirestore();
       addDoc(collection(db, 'orders'), orden)
       .then((docRef)=>{
        setOrdenId(docRef.id);
        removeProduct();
       })
      .catch((error)=>{
        console.log('No se pudo crear la orden', error);
        setError('Error en la orden');
      });
     })
     .catch((error)=>{
      console.log('No se puede actualizar el stock', error);
      setError('No se actualizo el stock');
     });    
    //Vaciomos las cajas 
     setNombre('');
     setApellido('');
     setTelefono('');
     setEmail('');
     setEmailConfirmacion('');
     setMensaje('');
    
};
  return(
        <div>
          <h2> Complete el formulario para confirmar la compra </h2>
           <form className="formulario" onSubmit={manejadorFormulario}>
           
            {cart.map((producto)=>(
              <div key={producto.id}>
                <p>{''} {producto.nombre} {producto.cantidad}</p>
                <p>{producto.precio}</p>
              </div>
            ))}

          <div>
           <label className="lab-check">Nombre:</label>
             <input className="defaultTextBox advancedSearchTextbox" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}
             />
          </div>

          <div>
           <label className="lab-check">Apellido:</label>
             <input className="defaultTextBox advancedSearchTextbox" type="text" value={apellido} onChange={(e) => setApellido(e.target.value)}
             />
          </div>

          <div>
           <label className="lab-check">Telefono:</label>
             <input className="defaultTextBox advancedSearchTextbox" type="number" value={telefono} onChange={(e) => setTelefono(e.target.value)}
             />
          </div>

          <div>
           <label className="lab-check">Email:</label>
             <input className="defaultTextBox advancedSearchTextbox" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
             />
          </div>

          <div>
           <label className="lab-check">Confirmar email</label>
             <input className="defaultTextBox advancedSearchTextbox" type="email" value={emailConfirmacion} onChange={(e) => setEmailConfirmacion(e.target.value)}
             />
          </div>


          {error && <p>{error}</p>}
          {ordenId && (
            <p> ¡Gracias por ser nuestro cliente ! Tu numero de compra es es: <br/> {''} {ordenId} {''} <br/></p>
          )}
           <div>
            <button  className="agregarcarriot" type="submit"> Enviar </button>
           </div>
          </form>
        </div>
     );
    }