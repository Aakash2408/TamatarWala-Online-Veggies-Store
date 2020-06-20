import * as actionTypes from '../actions/actionTypes';
import firebase from './firebase'
import {reactLocalStorage} from 'reactjs-localstorage';



const initialState = {
    cart: [],
    vat: 16, //vat in percentage
    cartTotal: 0,
    // state : { isSignedIn: false },
    orderSuccess: false,
    promoCode: [
        {
            code: 'TENPERCENT',
            percentage: 10
        },
        {
            code: 'FIVEPERCENT',
            percentage: 5
        }
    ],
    usedPromoCode: null,
    deliveryOptions: [
        {
            id: 1,
            name: 'Standard',
            duration: '2 - 4 hours',
            cost: 0
        },
        // {
        //     id: 2,
        //     name: 'fastest',
        //     duration: '1 - 24 hours',
        //     cost: 100
        // }
    ],
    productMaxShowModal: false,
    modalMessage: null,
    showSideNavigation: false,
    productsLoading:false,
    productsFetchingError:false,
    ordersLoading:false,
    orders:[],
    activeProduct:'',
    totalCartPrice:0,
    ordersFetchingError:false,
    // used currency should load with the default currency name and rate

    products: []

  
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_FETCH_PRODUCTS:
            return{
                ...state,
                productsLoading:true,
            }
        case actionTypes.FETCH_PRODUCTS_SUCCESS:
            return{
                ...state,
                productsLoading:false,
                productsFetchingError:false,
                products:action.products
            }
        
        case actionTypes.FETCH_CART:
             let newCart2 = reactLocalStorage.getObject('cart',[],true);
             var cartTotal = 0;
             for(var i=0;i<newCart2.length;i++){
                 cartTotal+=newCart2[i].count;
                 
             }
            return{
                ...state,
                cartTotal: cartTotal,
                cart: newCart2,
            }
        
        case actionTypes.FETCH_PRODUCTS_FAILED:
            return {
                ...state,
                productsLoading:false,
                productsFetchingError:true,
            }
        case actionTypes.ADD_TO_CART:
            let newCart = state.cart;
            let newCartTotal = state.cartTotal;
            let productMaxShowModal = state.productMaxShowModal;
            let modalMessage = null;

            if (action.productQuantity <= 0) {
                productMaxShowModal = !state.productMaxShowModal;
                modalMessage = 'Sorry! This product is out of stock'
            } else {
                let chkProductInCart = state.cart.find(product => product.id === action.productId);
                let productInStore = state.products.find(product=>product.id===action.productId)
                if (chkProductInCart) {
                    if (chkProductInCart.count < action.productQuantity) {
                        newCart = state.cart.map(
                            product => (product.id === action.productId ?
                                { ...product, count: product.count + 1 } : product
                            ));
                        newCartTotal = state.cartTotal + 1
                    } else {
                        productMaxShowModal = !state.productMaxShowModal;
                        modalMessage = 'Sorry! Your product order cannot exceed our stock.'
                    }
                } else {
                    newCart = state.cart.concat({ id: action.productId, count: 1,productName: productInStore.name,doc_id:productInStore.doc_id});
                    newCartTotal = state.cartTotal + 1
                }
            }
            reactLocalStorage.setObject('cart', newCart);

            return {
                ...state,
                cartTotal: newCartTotal,
                cart: newCart,
                productMaxShowModal: productMaxShowModal,
                modalMessage: modalMessage,
                activeProduct:action.productId
            };

        case actionTypes.REMOVE_FROM_CART:
            newCart = state.cart.filter(product => product.id !== action.productId)
            reactLocalStorage.setObject('cart', newCart);
            return {
                ...state,
                cart: newCart,
                cartTotal: state.cartTotal - action.productCount
            };

        case actionTypes.CLEAR_CART:
            reactLocalStorage.clear();
            return {
                ...state,
                cartTotal: 0,
                cart: [],
            };

        case actionTypes.UPDATE_CART_PRODUCT_COUNT:
            let product = state.cart.find(product => product.id === action.productId);
            let cartTotal = state.cartTotal;
            newCart = state.cart;
            if (product) {
                cartTotal = state.cartTotal - (product.count - action.newCountValue);
                newCart = state.cart.map(
                    product => product.id === action.productId ?
                        { ...product, count: action.newCountValue } : product
                );
            }
            reactLocalStorage.setObject('cart', newCart);

            return {
                ...state,
                cart: newCart,
                cartTotal: cartTotal
            };

        case actionTypes.CONFIRM_ORDER_SUCCESS:
            reactLocalStorage.clear();
            return {
                ...state,
                cart: [],
                cartTotal: 0,
                orderSuccess: true
            };

        case actionTypes.RESET_ORDER_SUCCESS:
            return {
                ...state,
                orderSuccess: false
            };

        case actionTypes.CONFIRM_ORDER_FAILURE:
            return {
                ...state,
            };

        case actionTypes.CLOSE_MAX_PRODUCT_MODAL:
            return {
                ...state,
                productMaxShowModal: !state.productMaxShowModal
            };

        case actionTypes.TOGGLE_SIDE_BAR:
            return {
                ...state,
                showSideNavigation: !state.showSideNavigation

            };

        case actionTypes.SET_PROMO_CODE:
            return {
                ...state,
                usedPromoCode: action.promoCode
            };

        case actionTypes.CHANGE_CURRENCY: {

            let currencyName = null;
            let currencyValue = null;
            let currencyObj = {};


            let currencyNameSearch = Object.keys(state.exchangeRates.rates).filter(rate => (
                action.currencyName === rate
            ));
            if (currencyNameSearch) {
                currencyName = action.currencyName;
                currencyValue = state.exchangeRates.rates[currencyName];

                currencyObj[currencyName] = currencyValue;
                currencyObj['symbol'] = state.currencySymbols[currencyName]
            }


            return {
                ...state,
                // just in case the currency is not found
                usedCurrency: currencyNameSearch ? currencyObj : this.state.usedCurrency
            }
        }
        case actionTypes.REQUEST_FETCH_ORDERS:
            return {
                ...state,
                ordersLoading:true,
                ordersFetchingError:false
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return{
                ...state,
                orders:action.orders,
                ordersLoading:false,
                ordersFetchingError:false
            }
        case actionTypes.FETCH_ORDERS_FAILED:
            return{
                ...state,
                orders:[],
                ordersLoading:false,
                ordersFetchingError:true
            }
        default:
            return {
                ...state,
            }
    }

};

export default reducer;