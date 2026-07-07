import React from 'react'
import logo from "./assets/LOGO.jpg";
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
 }

 const RestaurantCard = () =>{
  return(
    <div className="res-card">
      <img className="res-logo" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6MFXwHTJXSpL_QuRxQ9-TgPMfn-4BI0AwAE-j54s-dg&s=10' alt="res-logo"/>
      <h3>Coffee Shop</h3>
      <h4>4.4 stars</h4>
      <h4>Delivery in 10 minutes</h4>
    </div>
  )
 }
  const Body = () =>{
  return(
    <div className="body">
      <div className="Search">Search</div>
      <div className='res-container'>
         <RestaurantCard/>
         <RestaurantCard/>
         <RestaurantCard/>
         <RestaurantCard/>
         <RestaurantCard/>
         <RestaurantCard/>
         

  
      </div>
    </div>
  )
 }
const AppLayout = () => {
  return (
    <div className="app">
    <Header/>
    <Body/>
   
    </div>
  )
};


export default AppLayout
