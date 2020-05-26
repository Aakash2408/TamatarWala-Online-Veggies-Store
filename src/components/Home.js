import React from 'react';
import Header from "./header";
import HeroBanner from "./Hero-banner";
import Cards from "./cards";
import HomeCards1 from "./home-cards2";
import HomeCards2 from "./home-cards1";
import FooterBanner1 from "./Footer-banner";
import FooterBanner2 from "./Footer-banner2";
import  Footer   from "./footer"



function Home() {
    return(
        <div>
        <HeroBanner />
        <Cards />
        <HomeCards1/>
        <FooterBanner2/>
        <HomeCards2/>
        <FooterBanner1/>
       
      </div>
    )
}
export default Home;