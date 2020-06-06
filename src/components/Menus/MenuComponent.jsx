import React from 'react';
import MenuItem from "../UI/MenuItem/MenuItem";
import PropTypes from 'prop-types';
import { Button} from 'reactstrap';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";


const menuComponent = (props) => {
    


  
    return (
        <React.Fragment>
              
                  
            <MenuItem linkTo={'/'}>Home</MenuItem>
            <MenuItem linkTo={'/vegetables'}>Vegetables</MenuItem>
            <MenuItem linkTo={'/Fruits'}>Fruits</MenuItem>
            <MenuItem linkTo={'/Herbs'}>Herbs</MenuItem>
            
            <MenuItem linkTo={'/cart'}>
                Cart <span className="badge badge-light">{props.cartCount}</span>
            </MenuItem>
           
           
<a> <Button href={'/'} onClick={()=>firebase.auth().signOut()}>SignOUt</Button></a>
        

        </React.Fragment>
    )
};

menuComponent.propTypes = {
    cartCount: PropTypes.number
};

export default menuComponent;
