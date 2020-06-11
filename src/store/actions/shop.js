import * as actionTypes from './actionTypes';
import firebase from 'firebase';
export const addToCart = (productId, productQuantity) => {
    return {
        type: actionTypes.ADD_TO_CART,
        productId: productId,
        productQuantity: productQuantity
    }
};

export const removeFromCart = (productId, count) => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        productId: productId,
        productCount: count
    }
};

export const clearCart = () => {
    return {
        type: actionTypes.CLEAR_CART
    }
};

export const updateCartProductCount = (value, productId) => {
    return {
        type: actionTypes.UPDATE_CART_PRODUCT_COUNT,
        newCountValue: value,
        productId: productId,
    }
};

export const confirmOrder = (order, ownProps) => {
    return dispatch => {
        // send order object to an api end point of choice
        console.log("yess");
        console.log( order);
        console.log(order['cart'][0]);
        console.log(order['user']);
        // todo
        //token to be used with stripe
        dispatch(confirmOrderSuccess());
        // dispatch.preventDefault();
        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        const userRef = db.collection('cart').add({
           "cart":order['cart'][0],
           "user_details":order['user']
        });

        ownProps.history.push('/cart');
        setTimeout(() => {
            dispatch(resetOrderSuccess())
        }, 5000)
    }
};

export const closeMaxProductModal = () => {
    return {
        type: actionTypes.CLOSE_MAX_PRODUCT_MODAL
    }
};

export const confirmOrderSuccess = () => {
    return {
        type: actionTypes.CONFIRM_ORDER_SUCCESS
    }
};

export const resetOrderSuccess = () => {
    return {
        type: actionTypes.RESET_ORDER_SUCCESS
    }
};

export const confirmOrderFailure = () => {
    // todo
    return {
        type: actionTypes.CONFIRM_ORDER_FAILURE
    }
};

export const toogleSideBar = () => {
    return {
        type: actionTypes.TOGGLE_SIDE_BAR
    }
};

export const setPromoCode = (promoCodeObject) => {
    return {
        type: actionTypes.SET_PROMO_CODE,
        promoCode: promoCodeObject,
    }
};

