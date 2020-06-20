import * as actionTypes from './actionTypes';
import firebase from 'firebase'
import axios from 'axios'
export const addToCart = (productId, productQuantity) => {
    return {
        type: actionTypes.ADD_TO_CART,
        productId: productId,
        productQuantity: productQuantity
    }
};

export const fetchCart = ()=>{
    return {
        type:actionTypes.FETCH_CART
    }
}

export const requestProducts=()=>{
    return {
        type:actionTypes.REQUEST_FETCH_PRODUCTS
    }
}

export const fetchProductsSuccess = (products)=>{
    return {
        type:actionTypes.FETCH_PRODUCTS_SUCCESS,
        products:products
    }
}

export const fetchProductsFailed = (error)=>{
    return{
        type:actionTypes.FETCH_PRODUCTS_FAILED,
        error:error
    }
}

export const requestOrders=()=>{
    return {
        type:actionTypes.REQUEST_FETCH_ORDERS
    }
}

export const fetchOrdersSuccess=(orders)=>{
    return{
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}

export const fetchOrdersFailed=()=>{
    return{
        type:actionTypes.FETCH_ORDERS_FAILED
    }
}

export function fetchProducts(){
    return (dispatch)=>{
        dispatch(requestProducts());
        const db = firebase.firestore();
        return db.collection("products")
            .get()
            .then(querySnapshot => {
                // this is the data fetched from firebase
                const data = querySnapshot.docs.map(doc => {
                    const d = doc.data()
                    return {...d,doc_id:doc.id}});
                dispatch(fetchProductsSuccess(data));
                dispatch(fetchCart());
            }).catch((err)=>{
                dispatch(fetchProductsFailed(err));
            })
    }
}

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

export const placeOrder = ()=>{
    return{
        type:actionTypes.ORDER_PLACING
    }
}

// export function reduceQuantities(order){
//     const firestore = firebase.firestore()
//     for(var i=0;i<order.length;i++){
//         const dec = firebase.firestore.FieldValue.increment(-order[i].count)

//         firestore.collection('products').doc(order[i].doc_id).update({
//             quantity:dec
//         })
//     }
    

// }

export const confirmOrder = (order, func, ownProps) => {
    return dispatch => {

        // dispatch(placeOrder());


        const unsubs = firebase.auth().onAuthStateChanged(user=>{
            if(user){
                let url = 'https://us-central1-online-shop-32976.cloudfunctions.net/payment/create_order'  //paste the url here
                let url1 = 'http://localhost:4000/create_order'
                axios.post(url,{user_id:user.uid,amount:order['price'],order:{...order,date:new Date().toLocaleString()}}).then(r=>{
                    if(r.data.code==200){
                        let order_id = r.data.order_id
                        func(order_id,order['price'])
                    }else{

                        alert("Error placing the order")
                    }
                })

            }else{
                dispatch(confirmOrderFailure())
                ownProps.history.push('/cart');                
            }
        })


        // ownProps.history.push('/cart');

        // setTimeout(() => {
            
        //     dispatch(resetOrderSuccess())
        // }, 5000)
    }
};

export function fetchOrders(){
    return dispatch=>{
        dispatch(requestOrders());
        const db = firebase.firestore();

        return firebase.auth().onAuthStateChanged(user=> {
            
            if(user){
                return db.collection('users').doc(user.uid).collection('orders').get().then(res=>{
                    const data = res.docs.map(doc=>{const d = doc.data(); return{...d,doc_id:doc.id}});
                    dispatch(fetchOrdersSuccess(data))
                }).catch(e=>{
                    dispatch(fetchOrdersFailed())
                })
            }

        }) 

    }
}

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

