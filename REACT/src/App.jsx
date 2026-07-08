import React from 'react'

import Header from './Component/Header';

 const RestaurantCard = (props) =>{
  console.log(props);
  return(
    <div className="res-card">
      <img className="res-logo" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6MFXwHTJXSpL_QuRxQ9-TgPMfn-4BI0AwAE-j54s-dg&s=10' alt="res-logo"/>
      <h4>{props.resName}</h4>
      <h3>{props.cuisine}</h3>
      <h4>{props.rating}</h4>
      <h4>{props.Deliver}</h4>
    </div>
  )
 }
  const Body = () =>{
  return(
    <div className="body">
      <div className="Search">Search</div>
      <div className='res-container'>
         <RestaurantCard resName="Fassoss" cuisine="Dal Roti.Fast deliver" rating="2.4" Deliver="10 min delivery"/>
         <RestaurantCard resName="KFC" cuisine="Burger.Fast deliver" rating="4.9" Deliver="10 min delivery" />
       
         

  
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
