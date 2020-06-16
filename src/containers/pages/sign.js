import React, { Component } from 'react';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Index from './Index';
import { Redirect } from 'react-router';
// import MenuItem from "../UI/MenuItem/MenuItem.jsx";
import { Link } from 'react-router-dom';
class signInpage extends Component {
     state = { isSignedIn: true }
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
      console.log("user", user)
    })
  }   
    render() {
        return (
          <div className="main">
          <div>{ this.state.isSignedin ?
            (  <div className="container shop-container py-4">
            <div className={'p-4 shop-div'}>
                <Index/>
            </div>
        </div>
            )
                
            :  (<StyledFirebaseAuth 
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth.then}/>
            
            
            )}
                        
            </div>
            
            </div>
        );
    }
}

export default signInpage;