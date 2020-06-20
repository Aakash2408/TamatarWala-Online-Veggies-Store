 
import React from 'react';
import MenuItem from "../UI/MenuItem/MenuItem";
import PropTypes from 'prop-types';
import props from 'prop-types'
import { Button, Nav} from 'reactstrap';
import firebase, { FirebaseAuth,app } from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import {reactLocalStorage} from 'reactjs-localstorage';

class menuComponent extends React.Component {
    state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user);
      
    })
  }   

   
    
  render(){
    return (
        <React.Fragment>
              
{this.state.isSignedIn ? 
          <Nav className="nav-main">  <MenuItem linkTo={'/'}>Home</MenuItem>
            <MenuItem linkTo={'/vegetables'}>Vegetables</MenuItem>
            <MenuItem linkTo={'/Fruits'}>Fruits</MenuItem>
            <MenuItem linkTo={'/Herbs'}>Herbs</MenuItem>
            <MenuItem linkTo={'/orders'}>Orders</MenuItem>            
            <MenuItem linkTo={'/cart'} className="cart-main">
                Cart <span className="badge badge-light">{this.props.cartCount}</span>
            </MenuItem>
<MenuItem linkTo={'/'} clickHandler={ ()=>firebase.auth().signOut().then(()=>{
  reactLocalStorage.clear();
  window.location.reload()
  console.log("signe out")
}) }>SignOut</MenuItem></Nav>
:     <Nav><MenuItem linkTo={'/'}>Home</MenuItem>
<MenuItem linkTo={'/vegetables'}>Vegetables</MenuItem>
<MenuItem linkTo={'/Fruits'}>Fruits</MenuItem>
<MenuItem linkTo={'/Herbs'}>Herbs</MenuItem>
<MenuItem linkTo={'/orders'}>Orders</MenuItem>            
{/* <MenuItem linkTo={'/cart'} className="cart-main">
    Cart <span className="badge badge-light">{this.props.cartCount}</span>
</MenuItem> */}
  <MenuItem linkTo={'/cart'} >Login</MenuItem></Nav>
            }
        </React.Fragment>
    )}
};

menuComponent.propTypes = {
  cartCount: PropTypes.number.isRequired,
  clearCart: PropTypes.func.isRequired
};

export default menuComponent;
