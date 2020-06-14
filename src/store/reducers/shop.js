import * as actionTypes from '../actions/actionTypes';
import firebase from './firebase'

async function getProducts() {
    return new Promise((resolve, reject) => {
        const db = firebase.firestore();
        db.collection("products")
            .get()
            .then(querySnapshot => {
                // this is the data fetched from firebase
                const data = querySnapshot.docs.map(doc => doc.data());
                resolve(data);
            }).catch((err)=>{
                reject(err);
            })

    })

}


const initialState = {
    cart: [],
    vat: 16, //vat in percentage
    cartTotal: 0,
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
            name: 'standard',
            duration: '24 - 72 hours',
            cost: 50
        },
        {
            id: 2,
            name: 'fastest',
            duration: '1 - 24 hours',
            cost: 100
        }
    ],
    productMaxShowModal: false,
    modalMessage: null,
    showSideNavigation: false,
    productsLoading:false,
    productsFetchingError:false,
    ordersLoading:false,
    orders:[],
    totalCartPrice:0,
    ordersFetchingError:false,
    // used currency should load with the default currency name and rate

    products: []

    // products: [

    //             {id:19,
    //   name:'Broccoli 500g',
    //   img:'https://www.freepngimg.com/thumb/broccoli/12-broccoli-png-image-with-transparent-background-thumb.png',
    //   price:20,
    //   category:'vegetables',
    //   quantity:10,
    //   article:'vegetables'


    // },
    //  {id:20,
    //   name:'Cabbage 1000g',
    //   img:'https://www.freepngimg.com/thumb/cabbage/6-cabbage-png-image-thumb.png',
    //   price:25,
    //   category:'vegetables',
    //   quantity:10,
    //   article:'vegetables'

    // },
    //  {id:21,
    //   name:'Cucumber',
    //   img:'https://www.freepngimg.com/thumb/cucumber/11-cucumber-png-image-picture-download-thumb.png',
    //   price:20,
    //   category:'vegetables',
    //   quantity:10,
    //   article:'vegetables'

    // },
    // {id:22,
    //   name:'Pepper 1000g',
    //   img:'https://www.freepngimg.com/thumb/pepper/7-pepper-png-image-thumb.png',
    //   price:40,
    //   category:'vegetables',
    //   quantity:10,
    //   article:'vegetables'

    // },
    //  {id:23,
    //   name:'Garlic 100g',
    //   img:'https://www.freepngimg.com/thumb/garlic/2-2-garlic-transparent-thumb.png',
    //   price:20,
    //   category:'Immunity',
    //   quantity:10,
    //   article:'Immunity'

    // },
    //  {id:24,
    //   name:'Onion 500g',
    //   img:'https://www.freepngimg.com/thumb/onion/4-2-onion-png-clipart-thumb.png',
    //   price:60,
    //   category:'vegetables',
    //   quantity:10,
    //   article:'vegetables'

    // },
    //  {id:25,
    //   name:'Yello Corn 500g',
    //   img:'https://www.freepngimg.com/thumb/corn/20745-9-yellow-corn-thumb.png',
    //   price:30,
    //   category:'vegetables',
    //   quantity:10,
    //   article:'vegetables'

    // },
    //  {id:26,
    //   name:'Mushroom',
    //   img:'https://www.freepngimg.com/thumb/mushroom/29-mushroom-png-image-thumb.png',
    //   price:35,
    //   category:'vegetables',
    //   quantity:10,
    //   article:'vegetables'

    // },
    //  {id:27,
    //   name:'Tomato',
    //   img:'https://www.freepngimg.com/thumb/tomato/23-tomato-png-image-thumb.png',
    //   price:40,
    //   category:'vegetables',
    //   quantity:10,
    //   article:'vegetables'

    // },
    //  {id:28,
    //   name:'Salad Leaf 250g',
    //   img:'https://www.freepngimg.com/thumb/salad/13-salad-leaf-png-image-thumb.png',
    //   price:20,
    //   category:'vegetables',
    //   quantity:10,
    //   article:'vegetables'

    // },
    //   {id:29,
    //   name:'Mango 500g',
    //   img:'https://freepngimg.com/thumb/mango/9-2-mango-transparent-thumb.png',
    //   price:70,
    //   category:'fruits',
    //     quantity:10,


    // },
    //  {id:30,
    //   name:'Banana 1Dz',
    //   img:'https://freepngimg.com/thumb/banana/1-banana-png-image-thumb.png',
    //   price:60,
    //   category:'fruits',
    //     quantity:10,

    // },
    //  {id:31,
    //   name:'Potato 500g',
    //   img:'https://freepngimg.com/thumb/potato/7-potato-png-images-pictures-download-thumb.png',
    //   price:20,
    //   category:'vegetables',
    //     quantity:10,

    // },
    // {id:32,
    //   name:'Green Bitten Gourd 1000g',
    //   img:'https://img2.pngio.com/download-more-views-vegetables-bitter-gourd-full-size-png-bitter-gourd-png-555_322.png',
    //   price:40,
    //   category:'vegetables',
    //     quantity:10,

    // },
    //  {id:33,
    //   name:'Green Apple 500g',
    //   img:'http://pngimg.com/uploads/apple/apple_PNG12506.png',
    //   price:70,
    //   category:'fruits',
    //     quantity:10,

    // },
    //  {id:34,
    //   name:'Lychee 500g',
    //   img:'https://purepng.com/public/uploads/large/purepng.com-lycheefruitslycheelitchiliecheelizhili-zhilichee-981525183329hytaj.png',
    //   price:80,
    //   category:'fruits',
    //     quantity:10,

    // },
    //  {id:35,
    //   name:'Egg plant 500g',
    //   img:'https://www.freepngimg.com/thumb/eggplant/14-eggplant-png-images-download-thumb.png',
    //   price:35,
    //   category:'Immunity',
    //     quantity:10,

    // },
    //  {id:36,
    //   name:'Gourd 500g ',
    //   img:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTrf62sLV4atvo00JYoExWrI2v9PXakaeVHIrUR8SigGfI8G2j2&usqp=CAU',
    //   price:20,
    //   category:'Immunity',
    //     quantity:10,

    // },
    //  {id:37,
    //   name:'Lemon 500g',
    //   img:'https://www.freepngimg.com/thumb/lemon/13-green-lemon-png-image-thumb.png',
    //   price:40,
    //   category:'fruits',
    //     quantity:10,

    // },
    //  {id:38,
    //   name:'Watermelon 1000g',
    //   img:'https://www.freepngimg.com/thumb/watermelon/2-2-watermelon-free-download-png-thumb.png',
    //   price:20,
    //   category:'fruits',
    //     quantity:10,

    // },
    //         {id:39,
    //   name:'Mint 250g',
    //   img:'data:image/jpeg;base64,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',
    //   price:20,
    //   category:'Herbs',
    //     quantity:10,



    // },
    //    {id:40,
    //   name:'Methi 250g',
    //   img:'data:image/jpeg;base64,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',
    //   price:20,
    //   category:'Herbs',
    //     quantity:10,

    // },
    // {id:41,
    //     name:'Corriander 250g',
    //     img:'http://t3.gstatic.com/images?q=tbn:ANd9GcTEZdz-o_bo4qQpQQRfmmCwTs8GJydAIG_eHMfwOzbXbe7OAipnnJwecwlXWck9HBuWpAZkUCIBLkVyPrrv0-Q',
    //     price:40,
    //     category:"Herbs",
    //     quantity:10,

    // }
    // ,
    // {id:42,
    //     name:'Spinach 250g',
    //     img:'https://pngimg.com/uploads/spinach/spinach_PNG65.png',
    //     price:40,
    //     category:"Herbs",
    //     quantity:10,

    // },
    // {id:43,
    //     name:'Spinach 250g',
    //     img:'https://5.imimg.com/data5/NQ/KQ/MY-46372253/curry-leaves-500x500.png',
    //     price:40,
    //     category:"Herbs",
    //     quantity:10,

    // },
    //   {id:44,
    //     name:'Basil 250g',
    //     img:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQY5uu-EKG3IODpgLJKJWFSrNjehq82CX9dOkaL2f1RTinHO0Ps&usqp=CAU',
    //     price:70,
    //     category:"Herbs",
    //     quantity:10,

    // }



    // ]
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
                    newCart = state.cart.concat({ id: action.productId, count: 1,productName: productInStore.name});
                    newCartTotal = state.cartTotal + 1
                }
            }

            return {
                ...state,
                cartTotal: newCartTotal,
                cart: newCart,
                productMaxShowModal: productMaxShowModal,
                modalMessage: modalMessage
            };

        case actionTypes.REMOVE_FROM_CART:
            newCart = state.cart.filter(product => product.id !== action.productId)
            return {
                ...state,
                cart: newCart,
                cartTotal: state.cartTotal - action.productCount
            };

        case actionTypes.CLEAR_CART:
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

            return {
                ...state,
                cart: newCart,
                cartTotal: cartTotal
            };

        case actionTypes.CONFIRM_ORDER_SUCCESS:
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