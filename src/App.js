import React from 'react';
// import Appbar from "./components/Appbar";
import Navbar  from "./components/nav";
import Header from "./components/header";
import HeroBanner from "./components/Hero-banner" ;
import Cards from "./components/cards";
import FooterBanner from "./components/Footer-banner";
import Footer from "./components/footer";
import HomeCards from "./components/home-cards1";
import HomeCards2 from "./components/home-cards2";
// import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <div className="App">
         
          {/* <Appbar/> */}
          {/* <Navbar/> */}
          <Header />
          <HeroBanner />
          <Cards/>
          <HomeCards/>
          <HomeCards2/>
          <FooterBanner />
          <Footer/>

 
    </div>
  );
}

export default App;
