import React, {Component, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios'
import {connect} from 'react-redux';
import {confirmOrder, setPromoCode, confirmOrderSuccess, fetchProducts} from '../../store/actions/shop';
import CheckoutCartProduct from '../../components/Checkout/CheckoutCartProduct';
import PromoCodeForm from '../../components/Checkout/PromoCodeForm';
import PromoCodeValue from '../../components/Checkout/PromoCodeValue';
import CheckoutCartTotals from '../../components/Checkout/CheckoutCartTotals';
import CustomerInputs from '../../components/Checkout/Forms/CustomerInputs';
import DeliveryOptions from '../../components/Checkout/Forms/DeliveryOptions'
import PaymentOptions from '../../components/Checkout/Forms/Payments/PaymentOptions';
import Alert from '../../components/UI/Alert/Alert';
import PropTypes from 'prop-types';
import formValidator from '../../Utility/formValidation';

import { Loading } from './Loading';
// import $ from'jquery';
// import {CardElement, injectStripe} from 'react-stripe-elements';

class Checkout extends Component {

    
    constructor(props){
        super(props)
        this.state = {
            promoCode: '',
            showAlert: false,
            alertType: '',
            alertMessage: '',
            loading:false,
            // paymentMethod: "creditCard",
            shippingPrice: 0,
            usedDeliveryOption: 1,
            makeOrder: false,
            correctCardInfo: false,
            customerInfo: {
                firstName: {
                    value: '',
                    valid: false,
                    touched: false,
                    errorsMsg: '',
                },
                secondName: {
                    value: '',
                    valid: false,
                    touched: false,
                    errorsMsg: '',
                },
                email: {
                    value: '',
                    valid: false,
                    touched: false,
                    errorsMsg: '',
                },
                mobile:{
                    value:'',
                    valid:false,
                    touched:false,
                    errorsMsg:'',
    
                },
                address:{
                     value:'',
                    valid:false,
                    touched:false,
                    errorsMsg:'',
                }
            },
        };

    }
    paymentProcess=(order_id,amount)=> {
        
        var options = {
            "key": "rzp_test_xQoYrmqy6S6WlL", // Enter the Key ID generated from the Dashboard
            "amount": parseInt(amount)*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Tamatarwala",
            "description": "",
            // callback_url:'',
            "image": "https://example.com/your_logo",
            "order_id": order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": (response)=>{
                // this.setState({loading:true})
                console.log('payment completed')
                this.setState({loading:false})
                this.props.confirmOrderSuccProp();
                this.props.fetchProdProp()
                // axios.post('',response).then(r=>{
                    
                //     console.log(r)
                // })

            },
            "prefill": {
                "name": "",
                "email": "",
                "contact": ""
            },
            "notes": {
                "address": ""
            },
            "theme": {
                "color": "#e40046"
            }
        };
        this.setState({loading:false})
        let rzp = new window.Razorpay(options);
        rzp.open();
        // document.getElementById('rzp-button1').onclick = function(e){
            
        //     e.preventDefault();
        // }
        // const openPayModal = () => {
        //     var rzp = new window.Razorpay(options);
        //     rzp.open();
        // };
        // useEffect(() => {
        //     const script = document.createElement('script');
        //     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        //     script.async = true;
        //     document.body.appendChild(script);
        // }, []);
        
    }
    customerInfoChangeHandler = (event, identifier) => {
        // use deep cloning to be able to get the values of nested objects
        const customerInfo = {...this.state.customerInfo};
        const customerInfoField = {...customerInfo[identifier]};
        customerInfoField.value = event.target.value;
        const validationResults = formValidator(identifier, customerInfoField.value);
        customerInfoField.valid = validationResults.isValid;
        customerInfoField.errorsMsg = validationResults.errorsMsg;
        customerInfoField.touched = true;
        customerInfo[identifier] = customerInfoField;

        let makeOrder = true;
        for (let identifier in customerInfo) {
            makeOrder = customerInfo[identifier].valid && makeOrder;
        }
        this.setState({customerInfo: customerInfo, makeOrder: makeOrder});
    };

    promoCodeChangeHandler = (event) => {
        this.setState({promoCode: event.target.value})
    };

    paymentOptionChangeHandler = (event) => {
        if (event.target.value === 'creditCard') {
            this.setState({correctCardInfo: false});
        } else {
            this.setState({correctCardInfo: true});
        }
        this.setState({paymentMethod: event.target.value})
    };

    confirmOrderHandler = (event,shoppingTotal) => {
        this.setState({
            loading:true
        })
        event.preventDefault();
        let order = {};
        order['cart'] = this.props.cartProductsProps;
        order['user'] = {
            firstName: this.state.customerInfo.firstName.value,
            secondName: this.state.customerInfo.secondName.value,
            email: this.state.customerInfo.email.value,
            mobile:this.state.customerInfo.mobile.value,
            address:this.state.customerInfo.address.value
        };
        order['usedPromoCode'] = this.state.promoCode;
        order['currency'] = this.props.usedCurrencyProp;
        order['paymentMethod'] = this.state.paymentMethod;
        order['deliveryOption'] = this.state.usedDeliveryOption;
        order['price'] = shoppingTotal
        // todo
        // create stripe token for payments
        
        this.props.confirmOrderProp(order,this.paymentProcess.bind(this))

    };

    setPromoCode = (event) => {
        event.preventDefault();
        // check promo code in state
        let getPromoCode = this.props.promoCodeProp.filter(codeName => (
            codeName.code === this.state.promoCode
        ));

        if (getPromoCode.length > 0) {
            this.props.setPromoCodeProp(getPromoCode[0]);
            this.setState({
                showAlert: true,
                alertType: 'alert-success',
                alertMessage: `The promo code you entered has given you a ${getPromoCode[0].percentage}% discount on the total price.`,
            })
        } else {
            this.setState({
                showAlert: true,
                alertType: 'alert alert-danger',
                alertMessage: 'The Promo code you entered does not have discounts',
            })
        }
    };

    closeAlertHandler = () => {
        this.setState({
            showAlert: !this.state.showAlert,
            alertType: '',
            alertMessage: '',
        })
    };

    deliveryOptionChangeHandler = (event) => {
        //get used delivery option from the state
        let deliveryOption = this.props.deliveryOptions.find(option => (
            option.id === parseInt(event.target.value)
        ));
        if (deliveryOption) {
            this.setState({
                usedDeliveryOption: parseInt(event.target.value),
                shippingPrice: deliveryOption.cost
            })
        }

    };

    creditCardHandler = (element) => {
        if (element.complete) {
            this.setState({correctCardInfo: true})
        }
    };

    render() {

        let productsPrices = [];
        let chosenPaymentMethod = null;
        // let currencyKeys = Object.keys(this.props.usedCurrencyProp);
        // let currencyValue = this.props.usedCurrencyProp[currencyKeys[0]];

        const cartProducts = this.props.cartProductsProps.map((cartProduct, index) => {
            // fetch product information from source based on id
            let productFromStore = this.props.productsProps.find(product => product.id === cartProduct.id);
            productsPrices.push({
                price: productFromStore.quantity > 0 ?
                    Math.round(productFromStore.price ) : 0, count:
                cartProduct.count
            });
            return (
                <CheckoutCartProduct
                    key={index}
                    checkoutProductName={productFromStore.name}
                    checkoutProductCategory={productFromStore.category}
                    checkoutProductPrice={Math.round(productFromStore.price )}
                    checkoutProductImage={productFromStore.img}
                    checkoutCartCount={cartProduct.count}
                    currency={this.props.usedCurrencyProp}
                />
            )
        });

        let shippingPrice = this.state.shippingPrice ? Math.round(this.state.shippingPrice ) : 0;
        let productTotals = productsPrices.reduce((acc, el) => acc + (el.price * el.count), 0);
        let vatPercentage = this.props.vatProps > 0 ? this.props.vatProps / 100 : 0;
        let vat = productTotals > 0 ? Math.round(productTotals * vatPercentage) : 0;
        let percentageDiscount = this.props.usedPromoCodeProp ? this.props.usedPromoCodeProp.percentage / 100 : 0;
        let discountAmount = productTotals * percentageDiscount;
        let shoppingTotal = productTotals > 0 ? ((productTotals + vat + shippingPrice) - discountAmount) : 0;

        if (this.state.paymentMethod === "creditCard") {
            chosenPaymentMethod =
                <div className={'ml-4 p-3 shop-card-field'}>
                    {/* <CardElement onChange={(element) => this.creditCardHandler(element)}/> */}
                </div>
        } else if (this.state.paymentMethod === "onDelivery") {
            chosenPaymentMethod =
                <div className={'ml-4 p-3'}>You will pay when the product is delivered to you.</div>
        }

        return (

            <div className="container py-4">
                  <div className="container order py-4">
                {this.props.cartTotalProps <= 0 ? <Redirect to="/cart"/> : null}

                {this.state.showAlert ? <Alert
                        alertType={this.state.alertType}
                        closeAlert={this.closeAlertHandler}>
                        {this.state.alertMessage}
                    </Alert>
                    : null
                }

                <div className="row">
                    
                    <div className="col-md-4 order-md-2 mb-4">

                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Order Review</span>
                            <span className="badge badge-secondary badge-pill">{this.props.cartTotalProps}</span>
                        </h4>

                        <ul className="list-group mb-3">

                            {/* items in cart */}
                            {cartProducts}

                            {/* used promo codes */}
                            {this.props.usedPromoCodeProp ?
                                <PromoCodeValue
                                    currency={this.props.usedCurrencyProp}
                                    usedPromoCode={this.props.usedPromoCodeProp}
                                    discountAmount={discountAmount}/> : null}

                            {/* checkout totals */}
                            <CheckoutCartTotals
                                productTotals={productTotals}
                                vat={vat}
                                shippingPrice={shippingPrice}
                                shoppingTotal={shoppingTotal}
                                currency={this.props.usedCurrencyProp}/>
                        </ul>

                        {/*promo code form */}
                        <PromoCodeForm
                            setPromoCode={this.setPromoCode}
                            promoCodeChangeHandler={(event) => this.promoCodeChangeHandler(event)}
                            promoCode={this.state.promoCode}
                        />

                    </div>
                    
                    <div className="col-md-8 order-md-1 ">
                        <h4 className="mb-3">Billing Information</h4>
                        <form className="shop-form shop-bg-white p-3" noValidate>
                            {/* customer details form fields */}
                            <CustomerInputs
                                customerInfo={this.state.customerInfo}
                                inputChanged={(event, identifier) => this.customerInfoChangeHandler(event, identifier)}/>
                            {/* delivery options selection fields */}
                            <h4 className="">Delivery Options</h4>
                            <DeliveryOptions
                                currency={this.props.usedCurrencyProp}
                                deliveryOptions={this.props.deliveryOptions}
                                usedDeliveryOption={this.state.usedDeliveryOption}
                                deliveryOptionChanged={this.deliveryOptionChangeHandler}/>

                            {/* <h4 className="mb-3">Payment Method</h4> */}
                            {/* payment option selection field */}
                            {/* <PaymentOptions
                                paymentMethod={this.state.paymentMethod}
                                paymentOptionChanged={this.paymentOptionChangeHandler}/> */}
                            {/* payment section */}
                            {/* <div>
                                {chosenPaymentMethod}
                            </div> */}

                            <hr className="mb-4"/>
                            <button
                                disabled={!(this.state.makeOrder)}
                                className="btn shop-btn-secondary btn-lg btn-block"
                                onClick={(event) => this.confirmOrderHandler(event,shoppingTotal)}
                                // onClick={(event) => this.paymentProcess(event)}
                                >
                                Confirm Order
                            </button>
                        </form>
                    </div>
                </div>
                {this.state.loading && <Loading loading={this.state.loading} />}
            </div>
            </div>

        )
    }
}

Checkout.propTypes = {
    productsProps: PropTypes.array.isRequired,
    cartProductsProps: PropTypes.array.isRequired,
    cartTotalProps: PropTypes.number.isRequired,
    promoCodeProp: PropTypes.array,
    usedPromoCodeProp: PropTypes.object,
    deliveryOptions: PropTypes.array.isRequired,
    usedCurrencyProp: PropTypes.object.isRequired,
    vatProps: PropTypes.number
};

Checkout.defaultProps = {
    shippingPriceProp: 0
};

const mapStateToProps = state => {
    return {
        productsProps: state.products,
        cartProductsProps: state.cart,
        cartTotalProps: state.cartTotal,
        vatProps: state.vat,
        promoCodeProp: state.promoCode,
        usedPromoCodeProp: state.usedPromoCode,
        deliveryOptions: state.deliveryOptions,
        usedCurrencyProp: state.usedCurrency
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        confirmOrderProp: (order,func) => dispatch(confirmOrder(order, func, ownProps)),
        setPromoCodeProp: (promoCode, percentage) => dispatch(setPromoCode(promoCode, percentage)),
        confirmOrderSuccProp:()=>dispatch(confirmOrderSuccess()),
        fetchProdProp:()=>dispatch(fetchProducts())
    }
};

// inject stripe prop into the component
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);