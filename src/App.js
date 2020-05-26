import React from 'react';
// import Appbar from "./components/Appbar";
import {Switch,Route,Link,Redirect,Router}  from 'react-router-dom'
import Navbar  from "./components/nav";
import Header from "./components/header";
import HeroBanner from "./components/Hero-banner" ;
import Cards from "./components/cards";
import FooterBanner from "./components/Footer-banner";
import FooterBanner2 from "./components/Footer-banner2";
import Footer from "./components/footer";
import HomeCards from "./components/home-cards1";
import HomeCards2 from "./components/home-cards2";
import Fruits from "./components/Fruits";
import Vegetables from "./components/Vegetables";
import Herbs from "./components/Herbs";


// import logo from './logo.svg';
import './App.css';


function App() {
  return (

<div>
    
    
     
    <div className="App">
          <Route path="/vegetables" component={Vegetables} />
    <Route path="/herbs"       component={Herbs} />
    <Route path="/fruits"       component={Fruits} />
          {/* <Appbar/> */}
          {/* <Navbar/> */}
          <Header />
          <HeroBanner />
          <Cards/>
          <HomeCards/>
          <FooterBanner2/>
          <HomeCards2/>
          <FooterBanner />
          <Footer/>

 
    </div>
    </div>
  );
}

export default App;
