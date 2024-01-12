import React, { useState, useContext } from 'react';
//creamos el componente de context
const CartContext = React.createContext(''); 
export const useCartContext = () => useContext(CartContext); 
 
//Funcion de cart provider el cual resive un children
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addProduct = (item, quantity) => {
        if (isInCart(item.id)) {
            setCart(
                cart.map((prod) => {
                    return prod.id === item.id
                        ? { ...prod, quantity: prod.quantity + quantity }
                        : prod;
                })
            );
        } else {
            setCart([...cart, { ...item, quantity }]);
        }
    };
//Obtenemos el precio total
    const totalPrice = () => {
        return cart.reduce((prev, act) => prev + act.quantity * act.price, 0);
    };
//Obtenemos el total de productos
    const totalProducts = () =>
        cart.reduce(
            (acumulador, productoActual) => acumulador + productoActual.quantity,
            0
        );
//Limpiamos el carrito
    const clearCart = () => setCart([]);

    const isInCart = (id) =>
        cart.find((prod) => prod.id === id) ? true : false;
//Removemos un producto
    const removeProduct = (id) =>
        setCart(cart.filter((prod) => prod.id !== id));

    return ( 
        <CartContext.Provider 
            value={{ 
                clearCart, 
                isInCart,
                removeProduct,
                addProduct,
                totalPrice,
                totalProducts,
                cart, 
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;