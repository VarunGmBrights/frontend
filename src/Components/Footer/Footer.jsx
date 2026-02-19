import React from 'react'
import './Footer.css'
import { assets } from '../../assets /assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>

   <div className="footer-content">
    <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto blanditiis at sequi ratione non, ipsam aperiam rerum atque quasi magnam sit dolor repellendus delectus quibusdam molestiae porro molestias incidunt saepe unde facilis minima a culpa recusandae. Et labore a ipsa.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
            </div>
    </div>
    <div className="footer-content-center">
    <h2>COMPANY</h2>
    <ul>
        <li>Home</li>
        <li>About Us</li>
        <li>Delivery</li>
        <li>Privacy-Policy</li>
    </ul>
</div>
    <div className="footer-content-right">
        <h2>Get in Touch</h2>
        <ul>
            <li>+91 7618782564</li>
            <li>mongodbvgm@gmail.com</li>
        </ul>
    </div>
 
   </div>
   <hr />
   <p className="footer-copyright">Copyright 2025 © Varungm.com - All Right Reserved </p>
    </div>
  )
}

export default Footer