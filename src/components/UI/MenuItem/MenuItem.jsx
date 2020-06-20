import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";

const menuItem = (props) => {
    return (
        <li className={'nav-item'}>
            <NavLink onClick={props.clickHandler}
                className={'nav-link'}
                to={props.linkTo}
                exact>
                {props.children}
                
                </NavLink>

        </li>
    )
};

menuItem.propTypes = {
    navItemClasses: PropTypes.string,
    navLinkClasses: PropTypes.string,
    linkTo: PropTypes.string
};

export default menuItem;
