import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const orderProductTotals = (props) => {

    // let currencyKeys = Object.keys(props.currency);
    // let currencyName = props.currency[currencyKeys[1]];

    let subtotal = props.subtotal;
    let vatPercentage = props.vat > 0 ? props.vat/100 : 0;
    let vat = subtotal > 0 ? Math.round(subtotal * vatPercentage) : 0;
    let totalCost = props.shoppingTotal

    return (
        <React.Fragment>
            {/* <div className="row">
                <div className="col-6 col-sm-4  offset-sm-5 text-left shop-cart-amounts">
                    Subtotal
                </div>
                <div className="col-6 col-sm-3 text-right shop-cart-amounts">
                  Rs.{subtotal.toLocaleString()}
                </div>
            </div> */}
            {/* <hr/> */}
            {/* <div className="row">
                <div className="col-6 col-sm-4 offset-sm-5 text-left shop-cart-amounts">
                    Tax
                </div>
                <div className="col-6 col-sm-3 text-right shop-cart-amounts">
                   Rs.{vat.toLocaleString()}
                </div>
            </div> */}
            {/* <hr/> */}
            <div className="row">
                <div className="col-6 col-sm-4 offset-sm-5 text-left">
                    <h4 className={'shop-cart-total'}>Total</h4>
                </div>
                <div className="col-6 col-sm-3 text-right">
                    <h4 className={'shop-cart-total'}>
                       Rs.{totalCost.toLocaleString()}
                    </h4>
                </div>
            </div>
            <hr/>
        </React.Fragment>
    )
};

orderProductTotals.propTypes = {
    subtotal: PropTypes.number.isRequired,
    vat: PropTypes.number,
    
};

orderProductTotals.defaultProps = {
    shippingPrice: 0,
};

export default orderProductTotals;