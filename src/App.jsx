import './App.css'
import React from "react";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Cart from './components/Cart/Cart';
import Nosotros from './components/Nosotros/Nosotros'
import CartProvider from './components/Context/CartContext';
import Inexistente from './components/Utils/Inexistente';
import LoaderComponent from './components/LoaderComponent';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { CheckOut } from './components/Checkout/Checkout';

export const App = () => {
  return (
    <>
      <BrowserRouter>
      <LoaderComponent/>
      <CartProvider> 
      <NavBar/>
     
      <Routes>
        <Route path="/" element={<ItemListContainer/>}/>
        <Route path="/category/:id" element={<ItemListContainer/>}/>
        <Route path="/item/:id" element={<ItemDetailContainer/>}/>
        <Route path={"/cart"} element={<Cart/>}/>
        <Route path={"/checkout"} element={<CheckOut/>} />
        <Route path={'*'} element={ <Inexistente /> } />
        <Route path={'/nosotros'} element={ <Nosotros/> } />
      
        </Routes>
        </CartProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
