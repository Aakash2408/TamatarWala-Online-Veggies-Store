import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addToCart} from "../../store/actions/shop";
import ProductCard from "../../components/ProductCard";
import SecondaryLayout from "../../Layouts/SecondaryLayout";
import EmptyCategoryPageContent from  '../../components/EmptyCategoryPageContent';
import '../../components/css/Herbs.css';
class Children extends Component {
    render() {
        let products = <EmptyCategoryPageContent />;

        if (this.props.productsProps.length > 0) {
            products = this.props.productsProps
                .map(product => {
                return (
                    <ProductCard
                        key={product.id}
                        productName={product.name}
                        productPrice={product.price}
                        productDiscountPrice={product.discount_price}
                        productSale={product.sale}
                        productImage={product.img}
                        productCategory={product.category}
                        productQuantity={product.quantity}
                        currency={this.props.usedCurrencyProp}
                        addToCart={() => this.props.addProductToCartProp(product.id)}
                    />
                )
            })
        }
        return (<div className="css-11zk6ke">
         <section className="herbs">
       <header className="css-1wu2h8j">
        <h1>
          Herbs
        </h1>
    </header>
     </section>  
            
            <div id="category" className="css-vz0s8c">
               <div className="main">
       <div className="content">
       <div className="products">
                {products}
             
                </div>
                </div>
                </div>
            
            </div>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        productsProps: state.products.filter( product => product.category === 'Herbs'),
        usedCurrencyProp: state.usedCurrency
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addProductToCartProp: (productId) => dispatch(addToCart(productId))
    }
};

Children.propTypes = {
    productsProps: PropTypes.array.isRequired,
    usedCurrencyProp: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Children);