import React from 'react';
import nav  from "./components/nav";
import header from "./components/header";
import HeroBanner from "./components/Hero-banner" ;
import Cards from "./components/cards";
// import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <div className="App">
          <nav />
          <header/>
          <HeroBanner />
          <Cards/>
          

 
    </div>
  );
}

export default App;
