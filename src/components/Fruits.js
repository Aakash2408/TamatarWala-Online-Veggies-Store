import React from 'react';
import data from "./data3";
import './css/Fruits.css';
const Fruits = () =>{
    return(
<div>
<div className="css-11zk6ke">

    <section className="Fruits">
       <header className="css-1wu2h8j">
        <h1>
          Fruits
        </h1>
    </header>
     </section>   
       <div id="category" class="css-vz0s8c">
        
       
   
       <div className="main">
       <div className="content">
       <div className="products">
       {
           data.products.map(product => 
           <li>
        <div className="product">
        <img className="product-image" src={product.image}></img>
        <div className="css-qiwenx">
            <button className=" css-pncr0q" title="Add to Cart">
                <svg width="13" height="12" viewBox="0 0 13 12">
                         <path d="M67.213,68.157H65.137l-2.953-3.949a.517.517,0,0,0-.829,0L58.4,68.157H56.326a1.056,1.056,0,0,0-1.056,1.054.987.987,0,0,0,.042.292l1.5,5.3A1.643,1.643,0,0,0,58.392,76h6.756a1.659,1.659,0,0,0,1.587-1.2l1.5-5.305a.509.509,0,0,0,.015-.077l.017-.16a.434.434,0,0,0,0-.05A1.056,1.056,0,0,0,67.213,68.157ZM61.77,65.386l2.072,2.771H59.7Zm0,7.957A1.224,1.224,0,1,1,63,72.118a1.223,1.223,0,0,1-1.227,1.224Z" transform="translate(-55.269 -64)" fill="#5a5a5a">
                    </path>
                </svg>
            </button>
        </div>
        <div className="css-box">
        <div className="product-price">Rs. {product.price}</div>
        <div className="product-name">{product.name}</div>
       
        </div>
        </div>
       </li>
           
           )
       }
       
       </div>
       </div>
       </div>
     
     
     </div>
    </div> 
    
   </div>  

    );
}
export default Fruits; 