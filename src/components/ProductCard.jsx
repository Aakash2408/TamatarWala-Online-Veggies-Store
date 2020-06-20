import React from 'react';
import PropTypes from 'prop-types';
import "./css/homecards.css";
import { render } from 'react-dom';
class productCard  extends React.Component{
    constructor(props) {
        super(props);
        
        this.state = {value: this.props.productCount}
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
      }
      
      increment() {
        // this.setState(prevState => {
        //     if(prevState.value<this.props.productQuantity){
        //         this.props.updateProductCount(prevState.value+1)
        //         return {value:prevState.value+1}
        //     }else{
        //         return{...prevState}
        //     }
        // })

        if(this.props.productCount<this.props.productQuantity){
            this.props.updateProductCount(this.props.productCount+1)
        }


      }
      
      decrement() {
        // this.setState(prevState => {
        //     if(prevState.value>0){
        //         this.props.updateProductCount(prevState.value-1)
        //         return {value:prevState.value-1}
        //     }else{
        //         return {...prevState}
        //     }
        // })
        if(this.props.productCount>0){
            this.props.updateProductCount(this.props.productCount-1)
        }
        
      }    // let currencyKeys = Object.keys(props.currency);
    // let currencyValue = props.currency[currencyKeys[0]];
    // let currencyName = props.currency[currencyKeys[1]];
    render(){
        const props=this.props
    
    return (
      
          
            <li>
                <div className="product">
                    
                        <img className="product-image"
                            src={props.productImage}
                           
                        />
                        

                        <div className="css-qiwenx" >
                            { !this.props.activeCartProd && <button
                                    className="css-pncr0q"
                                    style={this.props.productCount>0?{backgroundColor:'black'}:{}}
                                    disabled={props.productQuantity <= 0 }
                                    onClick={props.addToCart}>
                                {this.props.productCount==0 && <svg width="13" height="12" viewBox="0 0 13 12">
                                    <path d="M67.213,68.157H65.137l-2.953-3.949a.517.517,0,0,0-.829,0L58.4,68.157H56.326a1.056,1.056,0,0,0-1.056,1.054.987.987,0,0,0,.042.292l1.5,5.3A1.643,1.643,0,0,0,58.392,76h6.756a1.659,1.659,0,0,0,1.587-1.2l1.5-5.305a.509.509,0,0,0,.015-.077l.017-.16a.434.434,0,0,0,0-.05A1.056,1.056,0,0,0,67.213,68.157ZM61.77,65.386l2.072,2.771H59.7Zm0,7.957A1.224,1.224,0,1,1,63,72.118a1.223,1.223,0,0,1-1.227,1.224Z" transform="translate(-55.269 -64)" fill="#5a5a5a">
                                    </path>
                                </svg>}
                                {
                                    this.props.productCount>0 && this.props.productCount.toLocaleString()
                                }
                            </button>}
                            {
                                this.props.activeCartProd && <div class="css-quantity" >
                                        <button title="Decrement" onClick={this.decrement} class="plus-minus">-</button>
                                        <input type="text" value={this.props.productCount.toLocaleString()}  disabled={props.productQuantity <= 0} onChange={(event)=>props.updateProductCount(event.target.value)} readOnly class="css-111" />
                                        <button title="Increment" onClick={this.increment}  class="plus-minus">+</button>
                                </div>
                            }
                        </div>
                   

                    <div className="css-box">
                        <div className="product-price">Rs. {props.productPrice}</div>
                                

                        <div className="product-name">{props.productName}</div>
                        {/* <div className="shop-card-price">Rs.{Math.round(props.productPrice).toLocaleString()} */}
                           
                        </div>
                       


                    
                </div>
            </li>
            
    
            
      
    )
                        }
};

productCard.propTypes = {
    productCategory: PropTypes.string.isRequired,
    productImage: PropTypes.string.isRequired,
    productSale: PropTypes.bool.isRequired,
    productDiscountPrice: PropTypes.number,
    productPrice: PropTypes.number.isRequired,
    updateProductCount: PropTypes.func.isRequired,
    productName: PropTypes.string.isRequired,
    addToCart: PropTypes.func.isRequired,
    productQuantity: PropTypes.number.isRequired,
    removeCartProduct: PropTypes.func.isRequired,
    productQuantity: PropTypes.number.isRequired
};

export default productCard;