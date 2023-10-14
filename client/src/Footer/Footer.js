import React from 'react'
import "./Footer.css"
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <div className='footer'>
        <div className='footer__logo'>
        <img src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png" alt=""></img>
        <ul>
           <li> <Link to="" className='link'><FacebookIcon/></Link></li>
           <li> <Link  className='link'> <LinkedInIcon/></Link></li>
          <li>  <Link  className='link'> < GitHubIcon/></Link></li>
            </ul>
        </div>
        <div className='footer__info'>
            <h3>Usefull Links</h3>
            <ul>
           <li> <Link to="" className='link'>How it works</Link></li>
           <li> <Link  className='link'> Terms of Service</Link></li>
          <li>  <Link  className='link'> Privacy polcy</Link></li>
            </ul>
        </div>
        <div className='footer__contact'>
            <h3>Contacts info</h3>

            <Link to=""  className='link'> Evangadi  Networks</Link>
            <p> evangadi@support.com</p>
            <p>+2518905667</p>
        </div>
    </div>
  )
} 
 

export default Footer