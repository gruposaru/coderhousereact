import React, { useEffect, useState } from "react";

//Componente donde llevamos el control de las cantidades del item
const ItemCount = ({ initial, stock, onAdd }) => {
	//Creamos el set count entero
	const [count, setCount] = useState(parseInt(initial));
	//Funcion donde decresemos el contador
	const decrease = () => {
		setCount(count - 1);
	};
//Mateoo donde aumentamos el contador
	const increase = () => {
		setCount(count + 1);
	};
//funcion donde  obtenemos la cantiad inicial
	useEffect(() => {
		setCount(parseInt(initial));
	}, [initial]);

	return (
		<div className="counter">
			<button disabled={count <= 1} onClick={decrease} className="operacion">
				-
			</button>
			<span>{count}</span>
			<button disabled={count >= stock} onClick={increase} className="operacion">
				+
			</button>
			
			<div>
				<button disabled={stock <= 0} onClick={() => onAdd(count)} className="agregarcarriot">
					Agregar al carrito
				</button>
			</div>
		</div>
	);
};

export default ItemCount;