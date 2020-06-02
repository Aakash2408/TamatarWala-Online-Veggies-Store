import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDY2R2rok013OazibFT6kVQgCXxaRok6E8",
    authDomain: "fruitstore-a485a.firebaseapp.com",
    databaseURL: "https://fruitstore-a485a.firebaseio.com",
    projectId: "fruitstore-a485a",
    storageBucket: "fruitstore-a485a.appspot.com",
    messagingSenderId: "533131437156",
    appId: "1:533131437156:web:b992031e7f054412486b71",
    measurementId: "G-9JPLWGENLF"
  };


  const fire = firebase.initializeApp(firebaseConfig);

export default fire;