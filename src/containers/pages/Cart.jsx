import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {removeFromCart, clearCart, updateCartProductCount} from '../../store/actions/shop';
import CartProduct from '../../components/Cart/CartProducts';
import CartProductTotals from '../../components/Cart/CartProductTotals';
import OrderSuccess from '../../components/OrderSuccess';
import PropTypes from 'prop-types';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

class Cart extends Component {
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
      console.log("user", user);
      console.log("heelloooo");
    })
  }   
    productCountHandler = (field_value, product_id) => {
        this.props.updateCartProductCountProp(field_value, product_id)
    };

    render() {

        let cartContent = null;
      

        if (this.props.cartTotalProp > 0) {
            let cartPriceCountArray = [];
            let cartProducts = this.props.cartProductsProp
                .map((productInCart) => {
                    // fetch product information from source based on id
                    // product information can also be stored in state
                    let productFromStore = this.props.productProps.find(product => product.id === productInCart.id);
                    cartPriceCountArray.push({
                            price: productFromStore.quantity > 0 ?
                                Math.round(productFromStore.price ) : 0,
                            count: productInCart.count
                        }
                    );
                    return (
                        <CartProduct
                            key={productInCart.id}
                            productName={productFromStore.name}
                            productCategory={productFromStore.category}
                            productPhoto={productFromStore.img}
                            productPrice={Math.round(productFromStore.price)}
                            productCount={productInCart.count}
                            productQuantity={productFromStore.quantity}
                            updateProductCount={(value) => this.productCountHandler(value, productInCart.id)}
                            removeCartProduct={() => this.props.removeProductFromCartProp(productInCart.id, productInCart.count)}
                            currency={this.props.usedCurrencyProp}
                        />
                    )
                });

            let cartTotals = <CartProductTotals
                subtotal={cartPriceCountArray.reduce((acc, el) => acc + (el.price * el.count), 0)}
                vat={this.props.vatProp}
                clearCart={() => this.props.clearProductsFromCartProp()}
                currency={this.props.usedCurrencyProp}
            />;

            cartContent = (
                
                <React.Fragment>
                
                    {cartProducts}
                    {cartTotals}
                </React.Fragment>
            )
        }
        else if (this.props.cartTotalProp === 0 && this.props.orderSuccessProp) {
            cartContent = <OrderSuccess/>
        } else {
            cartContent = <h5 className={'shop-empty-cart'}>Your cart is empty. <Link to={'/'}>Please fill it up.</Link>
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
                   <div className="container shop-container py-4">
                <div className={'p-4 shop-div'}>
                <StyledFirebaseAuth 
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}/>
                </div></div></div>
            )
            }
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        productProps: state.products,
        cartTotalProp: state.cartTotal,
        cartProductsProp: state.cart,
        vatProp: state.vat,
        orderSuccessProp: state.orderSuccess,
        usedCurrencyProp: state.usedCurrency
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeProductFromCartProp: (productId, count) => dispatch(removeFromCart(productId, count)),
        clearProductsFromCartProp: () => dispatch(clearCart()),
        updateCartProductCountProp: (value, productId) => dispatch(updateCartProductCount(Number(value), productId))
    }
};

Cart.propTypes = {
    cartTotalProp: PropTypes.number.isRequired,
    cartProductsProp: PropTypes.array.isRequired,
    productProps: PropTypes.array.isRequired,
    orderSuccessProp: PropTypes.bool.isRequired,
    vatProp: PropTypes.number,
    usedCurrencyProp: PropTypes.object.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(Cart);