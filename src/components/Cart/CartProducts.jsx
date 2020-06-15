import React from 'react';
import PropTypes from 'prop-types';
import props from 'prop-types';
import { render } from 'react-dom';
class cartProducts extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {value: this.props.productCount}
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
      }
      
      increment() {
        this.setState(prevState => {
            if(prevState.value<this.props.productQuantity){
                this.props.updateProductCount(prevState.value+1)
                return {value:prevState.value+1}
            }else{
                return{...prevState}
            }
        })


      }
      
      decrement() {
        this.setState(prevState => {
            if(prevState.value>0){
                this.props.updateProductCount(prevState.value-1)
                return {value:prevState.value-1}
            }else{
                return {...prevState}
            }
        })
        
      }
      

    
    // let currencyKeys = Object.keys(props.currency);
    // let currencyName = props.currency[currencyKeys[1]];
    
  render(){
      const props = this.props;
    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col-md-2 shop-cart-image-div">
                            <img className={'shop-cart-image'}
                                 src={props.productPhoto}
                                 />
                        </div>
                        <div className="col-sm-5 col-md-4 shop-cart-product-details">
                            <h5 className="shop-cart-name text-capitalize">{props.productName}</h5>
                            <h6 className="shop-cart-category ">
                                {props.productCategory}
                            </h6>
                            <div>
                                <span
                                    className={"badge " + (props.productQuantity > 0 ? 'badge-success' : 'badge-danger')}>
                                    {props.productQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-7 col-md-6">
                            <div className="row">
                                <div className="col-sm-6 text-left">
                                    <h6 className={'shop-cart-item-price'}>
                                       Rs.
                                         {props.productPrice}
                                        </h6>

                                        {/* <div className="quantity-input">
                                            <button className="quantity-input__modifier quantity-input__modifier--left" onClick={this.decrement}>
                                            &mdash;
                                            </button>
                                            <input className="quantity-input__screen" type="text" value={this.state.value} readonly />
                                            <button className="quantity-input__modifier quantity-input__modifier--right" onClick={this.increment}>
                                            &#xff0b;
                                            </button>  
                                        </div> */}
                                        
                                        <div class="css-quantity" >
                                            <button title="Decrement" onClick={this.decrement} class="plus-minus">
                                           -
                                            </button>
                                            <input type="text" value={this.state.value}  disabled={props.productQuantity <= 0} onChange={props.updateProductCount} readonly class="css-111" />
                                            <button title="Increment" onClick={this.increment}  class="plus-minus">+
</button></div>


                                     
                                    {/* <select
                                        className="form-control input-sm my-3 w-50"
                                        disabled={props.productQuantity <= 0}
                                        value={props.productCount}
                                        onChange={props.updateProductCount}
                                    >
                                        {[...Array(props.productQuantity)].map((number, index) => (
                                            <option key={index} value={index + 1}>{index + 1}</option>
                                        ))}
                                    </select> */}
                                    <h6 className={'shop-cart-item-total'}>Total
                                    Rs.
                                        <span>{props.productPrice * props.productCount}</span>
                                    </h6>
                                </div>
                                <div className="col-sm-4 offset-sm-2 shop-cart-b-container">
                                    <button type="button" onClick={props.removeCartProduct}
                                            className="btn shop-btn-warning btn-sm">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
        </React.Fragment>
    );
                                
}
}
cartProducts.propTypes = {
    productPhoto: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    productCategory: PropTypes.string.isRequired,
    productPrice: PropTypes.number.isRequired,
    updateProductCount: PropTypes.func.isRequired,
    productQuantity: PropTypes.number.isRequired,
    removeCartProduct: PropTypes.func.isRequired,
   
};

export default cartProducts;