import React, { useEffect, useState } from 'react'

import"./Navbar.css"
import DehazeIcon from "@material-ui/icons/Dehaze";

import { Link } from 'react-router-dom'

const Navbar = () => {
  const [click,setClick]=useState(false)

  useEffect(()=>{
    function classToggle() {
      const navs = document.querySelectorAll('.navb__list')
      
      navs.forEach(nav => nav.classList.toggle('Navbar__ToggleShow'));
    };
    classToggle();
    
   const kick= document.querySelector('.navb__toggle')
      .addEventListener('click', classToggle);
      if(kick){
        setClick(true)

      }
    
  },[])
  
  

 

  return (
    
    <div className='navbar'>
      <div className='navb__img'><img src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png" alt=""></img></div>
      <div className='navb__toggle'>{<DehazeIcon/>}
      </div>
<div className='navb__list'>
<ul id='ul'>
<li ><Link to='/'style={{textDecoration:"none"}}>Home</Link></li>
<li  ><Link to='' style={{textDecoration:"none"}}>How it Works</Link></li>

<li ><button><Link to='/signup' style={{textDecoration:"none",color:"white"}}>Signin</Link></button></li>
</ul>

</div>
    </div>
  )
}

export default Navbar