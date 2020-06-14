import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import OrderList from '../../components/Order/OrderList';

import PropTypes from 'prop-types';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

class Orders extends Component {false
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
    })
  }   


    render() {

        let cartContent = null;
      

        if (this.props.orderProductsProp.length>0) {
            let orderList = this.props.orderProductsProp
                .map((order) => {
                    // fetch product information from source based on id
                    // product information can also be stored in state
                    
                    return (
                        <OrderList
                            orderPrice={Math.round(order.price)}
                            orderId={order.doc_id}
                            hist={this.props.history}
                            currency={this.props.usedCurrencyProp}
                            
                        />
                    )
                });

            

            cartContent = (
                
                <React.Fragment>
                
                    {orderList}

                </React.Fragment>
            )
        }else {
            cartContent = <h5 className={'shop-empty-cart'}>Your orders are empty.
            </h5>;
        }

        return (<div>
            {this.state.isSignedIn ?(
            <div className="container shop-container py-4">
                <div className={'p-4 shop-div'}>
                    {cartContent}
                </div>
            </div>):(
                <div>
                <StyledFirebaseAuth 
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}/>
                </div>
            )
            }
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        productProps: state.products,
        orderProductsProp: state.orders,
        vatProp: state.vat,
        usedCurrencyProp: state.usedCurrency
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

Orders.propTypes = {
    orderProductsProp: PropTypes.array.isRequired,
    productProps: PropTypes.array.isRequired,
    vatProp: PropTypes.number,
    usedCurrencyProp: PropTypes.object.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(Orders);