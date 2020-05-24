import React from 'react';
import "./css/Cards.css";
import "mdbreact/dist/css/mdb.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import { MDBCard, MDBCardTitle, MDBBtn, MDBRow, MDBCol, MDBIcon } from 'mdbreact';

const CardExample = () => {
  return (
    <div class="css-11zk6ke">
    <section class="cards-section">
    <MDBRow className="MDBRow">
     <MDBCol md='6' className="MDBCol">
        <MDBCard
          className='card-image'
          style={{
            background:"url('https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')",
            height:"30vh",
            backgroundPosition:"center",
            backgroundSize:"cover",
            zIndex:"1"
            

          }}
        >
        <MDBCardTitle tag='h3' className='text-white'>
                <strong>Vegetables</strong>

              </MDBCardTitle>
          
        </MDBCard>
        </MDBCol>

    <MDBCol md='6'>
       <MDBCard
          className='card-image'
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1253250/pexels-photo-1253250.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')",
            height:"30vh ",
            boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
            backgroundPosition:"center",
            backgroundSize:"cover"

          }}>
        
          
          
              
              
                <MDBCardTitle tag='h3' className='text-white'>
                <strong>Fruits</strong>

              </MDBCardTitle>
              
              
                 
              
           
          
        </MDBCard>   
    </MDBCol>

         
      
    </MDBRow>
    </section>
    </div>
  )
}

export default CardExample;