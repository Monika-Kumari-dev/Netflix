 import {react} from "react";
import logo from "../assets/LOGO.jpg";
 const Header = () =>{
  return (
    <div className='header'>
      <div className='logo-container'>
        <img className="logo" src={logo} alt="Logo"></img>
      </div>
      <div className='nav-items'>
       <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact Us</li>
        <li>Cart</li>
       </ul>
      </div>
    </div>
  );
 };
 export default Header;