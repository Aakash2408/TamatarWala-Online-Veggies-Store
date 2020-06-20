import React from 'react';
import PropTypes from 'prop-types';

const orderList = (props) => {
    
    // let currencyKeys = Object.keys(props.currency);
    // let currencyName = props.currency[currencyKeys[1]];
    return (
        <React.Fragment >
            <div className="row" style={{cursor:'pointer'}} onClick={()=>{console.log("clickeed");props.hist.push(`/orders/${props.orderId}`)}}>
                <div className="col">
                    <div className="row">
                        
                        <div className="col-sm-5 col-md-4 shop-cart-product-details">
                            <h5 className="shop-cart-name text-capitalize">Order ID:{props.orderId}</h5>
                            {props.paymentId && <h5 className="shop-cart-name text-capitalize">Payment ID:{props.paymentId}</h5>}
                        </div>
                        <div className="col-sm-7 col-md-6">
                            <div className="row">
                                <div className="col-sm-6 text-left">
                                    <h6 className={'shop-cart-item-price'}>
                                       Rs.
                                         {props.orderPrice.toLocaleString()}
                                    </h6>
                                    <h6 className={'shop-cart-item-price'}>
                                        {props.date}
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

orderList.propTypes = {

    orderPrice: PropTypes.number.isRequired,
    orderId: PropTypes.number.isRequired,
   
};

export default orderList;