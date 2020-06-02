import React from 'react';
// import Appbar from "./components/Appbar";
import {Switch,Route,Link,Redirect,Router}  from 'react-router-dom'
import Home from './components/Home';
import Fruits from "./components/Fruits";
import Vegetables from "./components/Vegetables";
import Herbs from "./components/Herbs";
import {withRouter} from 'react-router';
import Header from './components/header';
import Footer from './components/footer';
import GSIGNIN from './components/login/googlesignin';
import logo from './logo.svg';
import './App.css';
// import ADDTOCART from './components/shopcart/shopcart';


function App() {
  return (

<div className="App">
    <GSIGNIN />
    {/* <Header />
      <Switch>
      
    <Route path="/"           exact component={Home} />
    <Route path="/vegetables"   component={Vegetables}/>
    <Route path="/herbs"      component={Herbs} />
    <Route path="/fruits"     component={Fruits} />
      
    </Switch>
<Footer />
    */}
   
   {/* <ADDTOCART /> */}
    </div>
      
  );
}

export default withRouter(App);
