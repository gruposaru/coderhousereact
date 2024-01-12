
import {  NavLink,Link } from "react-router-dom";
import CartWidget from "../CartWidget/CardWidget.jsx"
//NavBar donde esaras los link para las diferentes pantallas
const NavBar = () => {

    return (
        <div className="navbar">
            <div>
                <Link to="/"><img className="logo" src="./public/image/logotienda.jpg" alt="logo" height={80} /></Link>
                <h1>pretty store</h1>
            </div>

            <nav>
                <ul>
                    <div>
                        <li>
                            <NavLink to="/" className="link">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/category/reloj" className="link">Reloj</NavLink>
                        </li>
                        <li>
                            <NavLink to="/category/Zapato" className="link">Zapatos</NavLink>
                        </li>
                        <li>
                            <NavLink to="/category/perfume" className="link">Perfume</NavLink>
                        </li>
                        <li>
                            <NavLink to="/category/audifonos" className="link">Audifonos</NavLink>
                        </li>
                        <li>
                            <NavLink to="/nosotros" className="link">Nosotros</NavLink>
                        </li>
                        <li>
                            <NavLink to="/cart" className="link"><CartWidget/></NavLink>
                        </li>
                    </div>
                </ul>
            </nav>

            <NavLink to="/cart" className="cart">
              
            </NavLink>
        </div>
    )
}
export default NavBar;




