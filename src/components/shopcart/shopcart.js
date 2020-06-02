import fire from '../../fireconfig/config';
import React, { Component } from 'react';
import firebase from 'firebase';
import $ from 'jquery';
class ADDTOCART extends Component {
    
    addcart(){
        var productsFirebase = [];
        for (let index = 0; index < products.length; index++) {
          if(products[index].cart){
            var product = {
              name: products[index].name,
              imgsrc: products[index].imgsrc,
              price: products[index].price,
              category: products[index].category,
              quantity: products[index].quantity,
              total: products[index].total,
            }
            productsFirebase.push(product);
          }
        }
        firebase().database().ref('cart').push({
          total:total(),
          products: productsFirebase
        });
        Swal.fire({
          type:'success',
          title:'Success',
          text:'Operation Completed',

        });
        clean();
        
      };

      total(){
        let total=0;
        for (let index = 0; index < products.length; index++){
          if (products[index].cart) {
            total+=products[index].total;
            
          }
        }
        return total
      }

      con = 0;
      con2 = [];

      clean(){
        for (let index = 0; index < product.length; index++) {
          // products[index].name,
          // products[index].imgsrc,
          products[index].cart=false;
          // products[index].category,
          products[index].quantity=1;
          products[index].total=0;
          products[index].total=0;
          con2=[];
          updateCart();
        }
      }


   
      products = [ 
            {id:1,
            imgsrc:'',
            name:'apple',
            category:'fruit',
            price:3,
            cart:false,
            quantity:1,
            total:0
            },
            {id:2,
            imgsrc:'',
            name:'orange',
            category:'fruit',
            price:3,
            cart:false,
            quantity:1,
            total:0
            },
            {id:3,
                imgsrc:'',
                name:'Mango',
                category:'fruit',
                price:3,
                cart:false,
                quantity:1,
                total:0
                }
      ];



    render() {
     
        return (


          

            <body>
                <div>
                
                <div class="row">

                <table class="table">

                <thead class="thead-dark">
                    <tr>
                        <th scop="col">#</th>
                        <th scop="col">Remove</th>
                        <th scop="col">Image</th>
                        <th scop="col">Name</th>
                        <th scop="col">Quantity</th>
                        <th scop="col">Price</th>

                    </tr>
                    


                </thead>

                </table>

                </div>
                
            </div>
                <script src='https://cdn.jsdelivr.net/npm/sweetalert2@9.14.0/dist/sweetalert2.all.min.js'></script>
            </body>
            
        );
    }
}

export default ADDTOCART;
