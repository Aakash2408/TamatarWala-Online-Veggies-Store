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
            background:
              "url('https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'),linear-gradient(to right,rgba(0,0,0,0.8) ,rgba(0,0,0,0))",
            height:"40vh",
            backgroundPosition:"center",
            backgroundSize:"cover"

          }}
        >
          <div className='text-white text-center d-flex align-items-center py-5 px-4'>
            <div>
              <h5 className='white-text'>
                 Fruits
              </h5>
              <MDBCardTitle tag='h3' className='pt-2'>
                <strong></strong>
              </MDBCardTitle>
              
              
            </div>
          </div>
        </MDBCard>
        </MDBCol>

    <MDBCol md='6'>
       <MDBCard
          className='card-image'
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'),linear-gradient(to right,rgba(0,0,0,0.9) ,rgba(0,0,0,0))",
            height:"40vh",
            boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
            backgroundPosition:"center",
            backgroundSize:"cover"

          }}
        >
          <div className='text-white text-center d-flex align-items-center py-5 px-4'>
            <div>
              <h5 className='white-text'>
                 Fruits
              </h5>
              <MDBCardTitle tag='h3' className='pt-2'>
                <strong></strong>
              </MDBCardTitle>
              
              
            </div>
          </div>
        </MDBCard>   
    </MDBCol>

         {/* <MDBCol md='4' >
        <MDBCard
          className='card-image'
          style={{
            backgroundImage:
              "url('https://mdbootstrap.com/img/Photos/Horizontal/City/6-col/img%20(47).jpg')"
          }}
        >
          <div className='text-white text-center d-flex align-items-center rgba-indigo-strong py-5 px-4'>
            <div>
              <h5 className='white-text'>
                 Fruits
              </h5>
              <MDBCardTitle tag='h3' className='pt-2'>
                <strong>This is card title</strong>
              </MDBCardTitle>
             
              <MDBBtn color='deep-orange'>
                <MDBIcon icon='clone left' /> View project
              </MDBBtn>
            </div>
          </div>
        </MDBCard>
         </MDBCol> */}
      
    </MDBRow>
    </section>
    </div>
  )
}

export default CardExample;