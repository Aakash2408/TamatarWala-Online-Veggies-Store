import React, { Component} from "react";




import "./css/Header.css";

// import { fetchProducts } from "../helpers/products.helpers";
class header extends Component{
render(){

    return (
      
    <div className="main">  
      <div className="css-lilrry">
        <div className="css-yiublk">
          <div className="css-4cvtjf">
            <div className="css-4cffwv">
                <button className="css-ehmq8d">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M432 176H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16zM432 272H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16zM432 368H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16z"></path>
                  </svg>
                </button>
                  <div className="logo css-11fpb1a">
                    <a aria-current="page" className="" href="/">
                      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MiIgaGVpZ2h0PSIyMSIgdmlld0JveD0iMCAwIDgyIDIxIj4KICA8dGV4dCBpZD0iUElDS1NZLiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxNikiIGZpbGw9IiMyOTI5MjkiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtZmFtaWx5PSJTYWlsZWMtQm9sZCwgU2FpbGVjIiBmb250LXdlaWdodD0iNzAwIj48dHNwYW4geD0iMCIgeT0iMCI+UElDS1NZLjwvdHNwYW4+PC90ZXh0Pgo8L3N2Zz4K" alt="Site Logo" class="css-xvayrh" />
                    </a>
                  </div>
            </div>
            <div className="css-vurnku">
                <button className="css-5z9l6o">
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      <path d="M16.122,12.452a6.772,6.772,0,1,0-1.195,1.2l.036.038,3.592,3.592a.847.847,0,0,0,1.2-1.2L16.16,12.488ZM14.364,4.706a5.079,5.079,0,1,1-7.183,0A5.079,5.079,0,0,1,14.364,4.706Z" transform="translate(-4 -1.525)" fill="#292929" fill-rule="evenodd">
                      </path>
                    </svg>
                </button>
                <div className="picksySearch css-vurnku">
                  <label className="search css-7zrp1a">
                      <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16">
                        <path d="M16.122,12.452a6.772,6.772,0,1,0-1.195,1.2l.036.038,3.592,3.592a.847.847,0,0,0,1.2-1.2L16.16,12.488ZM14.364,4.706a5.079,5.079,0,1,1-7.183,0A5.079,5.079,0,0,1,14.364,4.706Z" transform="translate(-4 -1.525)" fill-rule="evenodd">
                        </path>
                      </svg>
                      <input type="text" value="" placeholder="What Are You Looking For?" autocomplete="off" />
                  </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>    



    );
  }
}
// const mapStateToProps = (state) => {
//   return {
//     badgeValue: state.user.cartCount,
//   };
// };

export default header;
