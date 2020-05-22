import React from 'react';
// import Appbar from "./components/Appbar";
import Navbar  from "./components/nav";
import Header from "./components/header";
import HeroBanner from "./components/Hero-banner" ;
import Cards from "./components/cards";
// import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <div className="App">
         
          {/* <Appbar/> */}
          <Navbar/>
          <Header />
          <HeroBanner />
          <Cards/>
          

 
    </div>
  );
}

export default App;
