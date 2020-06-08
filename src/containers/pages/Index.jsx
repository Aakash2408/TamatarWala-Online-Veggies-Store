import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import HeroBanner from './HeroBanner.jsx';
import Immunity from './ImmunityBoosters.jsx';
import Cards from './cards';
import FooterCards from './footerBanner.js';
import FooterCards2 from './footerBanner2.js';

import {addToCart} from '../../store/actions/shop';
import ProductCard from '../../components/ProductCard';
import SecondaryLayout from "../../Layouts/SecondaryLayout";
import EmptyCategoryPageContent from  '../../components/EmptyCategoryPageContent';
import '../../components/css/Vegetables.css';
class Index extends Component {

    render() {

        let products = <EmptyCategoryPageContent />;

        if (this.props.productsProps) {
            products = this.props.productsProps.map(product => {
                
                
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
                        addToCart={() => this.props.addProductToCartProp(product.id, product.quantity)}

                    />
                    
                    
                )
            })
        }
        return (
            <div>
            <HeroBanner/>
            <Cards/>
             <Immunity/>
            
            
            {/* <cards/> */}
            <div className="css-11zk6ke">
            <div id="category" className="css-vz0s8c">
               <div className="main">
                    <div class="css-oh3fg6"><h3 class="css-fqak9j">Featured Products</h3></div>
       <div className="content">
       <div className="products">
                {products}
                </div>
                </div>
                </div>
                </div>
            
            </div>
            <FooterCards2/>
            <FooterCards/>
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        productsProps: state.products.filter(product => product.category === 'vegetables'),
        usedCurrencyProp: state.usedCurrency
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addProductToCartProp: (productId, productQuantity) => dispatch(addToCart(productId, productQuantity))
    }
};

Index.propTypes = {
    productsProps: PropTypes.array.isRequired,
    usedCurrencyProp: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);