// import React, { Component } from 'react';
// import orderList from  "../components/Order/OrderList";

// import PropTypes from 'prop-types';
// class admin extends Component{
//     render()
//     {  let cartContent = null;
      

//         if (this.props.orderProductsProp.length>0) {
//             let orderList = this.props.orderProductsProp
//                 .map((order) => {
                    
//         return(
//         <orderList
//          orderPrice={Math.round(order.price)}
//          orderId={order.doc_id}
//          paymentId = {order.payment_id}
//          date={order.date}
//          hist={this.props.history}
//          currency={this.props.usedCurrencyProp}/>
//                 )});
//                 cartContent = (
                
//                     <React.Fragment>
                    
//                         {orderList}
    
//                     </React.Fragment>
//                 )
//                 return (<div>

//                     <div className="container shop-container py-4">
//                         <div className={'p-4 shop-div'}>
//                             {cartContent}
//                         </div>
//                     </div>)
//                 </div>
//                 )
       
//     }
// }}
// const mapStateToProps = state => {
//     return {
//         productProps: state.products,
//         orderProductsProp: state.orders,
//         vatProp: state.vat,
//         usedCurrencyProp: state.usedCurrency
//     }
// };

// const mapDispatchToProps = (dispatch) => {
//     return {

//     }
// };

// admin.propTypes = {
//     orderProductsProp: PropTypes.array.isRequired,
//     productProps: PropTypes.array.isRequired,
//     vatProp: PropTypes.number,
//     usedCurrencyProp: PropTypes.object.isRequired
// };

// export default admin;