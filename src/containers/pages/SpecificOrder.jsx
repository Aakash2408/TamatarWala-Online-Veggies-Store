import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import OrderProduct from '../../components/Order/OrderProducts';
import OrderProductTotals from '../../components/Order/OrderProductTotals';
import PropTypes from 'prop-types';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

class SpecificOrder extends Component {false
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
    productCountHandler = (field_value, product_id) => {
        this.props.updateCartProductCountProp(field_value, product_id)
    };

    render() {

        let orderContent = null;
      

        if (this.props.orderProductsProp) {
            let orderPriceCountArray = [];
            let orderProducts = this.props.orderProductsProp
                .map((productsInOrder) => {
                    // fetch product information from source based on id
                    // product information can also be stored in state
                    let productFromStore = this.props.productProps.find(product => product.id === productsInOrder.id);
                    orderPriceCountArray.push({
                            price: productFromStore.quantity > 0 ?
                                Math.round(productFromStore.price ) : 0,
                            count: productsInOrder.count
                        }
                    );
                    return (
                        <OrderProduct
                            key={productsInOrder.id}
                            productName={productFromStore.name}
                            productCategory={productFromStore.category}
                            productPhoto={productFromStore.img}
                            productPrice={Math.round(productFromStore.price)}
                            productCount={productsInOrder.count}
                            currency={this.props.usedCurrencyProp}
                        />
                    )
                });

            let orderTotals = <OrderProductTotals
                subtotal={orderPriceCountArray.reduce((acc, el) => acc + (el.price * el.count), 0)}
                vat={this.props.vatProp}
                currency={this.props.usedCurrencyProp}
                shoppingTotal={this.props.price}
            />;

            orderContent = (
                
                <React.Fragment>
                
                    {orderProducts}
                    {orderTotals}
                </React.Fragment>
            )
        }
         else {
            orderContent = <h5 className={'shop-empty-cart'}>Invalid Order ID. <Link to={'/orders'}>Go back to My Orders.</Link>
            </h5>;
        }

        return (<div>
            {this.state.isSignedIn ?(
            <div className="container shop-container py-4">
                <div className={'p-4 shop-div'}>
                    {orderContent}
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

const mapStateToProps = (state,ownProps) => {
    let order_id = ownProps.match.params.order_id
    let order = state.orders.find(spec_order=>spec_order.doc_id==order_id)

    return {
        productProps: state.products,
        orderProductsProp: order?order['cart']:null,
        price:order?order.price:null,
        vatProp: state.vat,
        usedCurrencyProp: state.usedCurrency
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

SpecificOrder.propTypes = {
    orderProductsProp: PropTypes.array.isRequired,
    productProps: PropTypes.array.isRequired,
    vatProp: PropTypes.number,
    usedCurrencyProp: PropTypes.object.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(SpecificOrder);