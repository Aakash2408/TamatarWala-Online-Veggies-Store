import React from 'react';

import "../../components/css/Cards.css";
// import "mdbreact/dist/css/mdb.css";
// import '@fortawesome/fontawesome-free/css/all.min.css';

// import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import { MDBCard, MDBCardTitle,  MDBRow, MDBCol, MDBIcon } from 'mdbreact';

const CardExample = () => {
  return (
<div>
    {/* <Header /> */}
    <div class="css-11zk6ke">
    <section class="cards-section">
    <MDBRow className="MDBRow">
     <MDBCol md='4' className="MDBCol">
     <Link to="/vegetables">
        <MDBCard 
          className='card-image'
          style={{
            background:"url('https://images.unsplash.com/photo-1489450278009-822e9be04dff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80')",
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
        </Link>
        </MDBCol>

        <MDBCol md='4' className="MDBCol">
        <Link to="/herbs">
        <MDBCard 
          className='card-image'
          style={{
            background:"url('https://images.unsplash.com/photo-1562592306-54967af3926d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')",
            height:"30vh",
            backgroundPosition:"center",
            backgroundSize:"cover",
            zIndex:"1"
            

          }}
        >
        <MDBCardTitle tag='h3' className='text-white'>
                <strong>Herbs</strong>

              </MDBCardTitle>
          
        </MDBCard>
        </Link>
        </MDBCol>

    <MDBCol md='4'>
    <Link to="/fruits">
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
        </Link>  
    </MDBCol>

         
      
    </MDBRow>
    </section>
    </div>
</div>    
  )
}

export default CardExample;