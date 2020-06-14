import React from 'react';
import PropTypes from 'prop-types';

const orderProducts = (props) => {
    
    // let currencyKeys = Object.keys(props.currency);
    // let currencyName = props.currency[currencyKeys[1]];

    return (
        <React.Fragment>
            <div className="row" >
                <div className="col">
                    <div className="row">
                        <div className="col-md-2 shop-cart-image-div">
                            <img className={'shop-cart-image'}
                                 src={props.productPhoto}
                                 />
                        </div>
                        <div className="col-sm-5 col-md-4 shop-cart-product-details">
                            <h5 className="shop-cart-name text-capitalize">{props.productName}</h5>
                            <h6 className="shop-cart-category ">
                                {props.productCategory}
                            </h6>
                        </div>
                        <div className="col-sm-7 col-md-6">
                            <div className="row">
                                <div className="col-sm-6 text-left">
                                    <h6 className={'shop-cart-item-price'}>
                                       Rs.
                                         {props.productPrice.toLocaleString()}
                                        </h6>
                                    <h6>Count:{props.productCount} </h6>
                                    <h6 className={'shop-cart-item-total'}>Total
                                    Rs.
                                        <span>{props.productPrice * props.productCount.toLocaleString()}</span>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
        </React.Fragment>
    )
};

orderProducts.propTypes = {
    productPhoto: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    productCategory: PropTypes.string.isRequired,
    productPrice: PropTypes.number.isRequired,
    productQuantity: PropTypes.number.isRequired,
   
};

export default orderProducts;