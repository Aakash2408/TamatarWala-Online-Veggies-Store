import {PRODUCT_LIST_REQUEST} from "../constants/productConstants"
import axios from'axios';
const listProducts=() => async (dispatch) =>{
try{
 dispatch({type:PRODUCT_LIST_REQUEST});
    const {data}=await axios.get("/api/products");
    dispatch({type:PRODUCT_LIST_SUCCESS,payload:data});
}
catch(error){


    dispatch({type:PRODUCT_LIST_FAIL paylaod:message});
   
}
}

export {listProducts}