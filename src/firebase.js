import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyBEPhxyEU0oTqLR6mjiy4AJOSpmcM_DrcE",
    authDomain: "online-shop-32976.firebaseapp.com",
    databaseURL: "https://online-shop-32976.firebaseio.com",
    projectId: "online-shop-32976",
    storageBucket: "online-shop-32976.appspot.com",
    messagingSenderId: "728767128743",
    appId: "1:728767128743:web:b2621107de1f9dc2c56782",
    measurementId: "G-S9R8X2962W"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
export default firebase;