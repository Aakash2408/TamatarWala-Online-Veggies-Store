import React from 'react';
import MenuItem from "../UI/MenuItem/MenuItem";
import PropTypes from 'prop-types';

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
        </React.Fragment>
    )
};

menuComponent.propTypes = {
    cartCount: PropTypes.number
};

export default menuComponent;
