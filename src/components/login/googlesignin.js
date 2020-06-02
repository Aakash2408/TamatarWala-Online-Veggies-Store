import fire from '../../fireconfig/config';
import React, { Component } from 'react';
import firebase from 'firebase';
class GSIGNIN extends Component {
    signin(){
        var base_provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(base_provider).then((res)=>{console.log('success!!');
    console.log(res);
        alert('success');
})
        .catch((error)=>{
            console.log('failed!!');
            console.log(error);})
    }
    render() {
        return (
            <div>
                
                <button onClick={this.signin()} type="button">GSignin</button>
            </div>
        );
    }
}

export default GSIGNIN;
