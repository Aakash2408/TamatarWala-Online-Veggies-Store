import React, { Component } from 'react';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Index from './Index';
import { Redirect } from 'react-router';

class signInpage extends Component {
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
      console.log("user", user)
    })
  }   
    render() {
        return (
          <div className="main">
          <div>{ this.state.isSignedin ?
            (
              <button linkTo={'/'} onClick={()=>firebase.auth().signOut()}>SignOut</button>
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