import React from 'react'
import"./Navbar.css"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png" alt=""></img>
<ul>
<li><Link to=''style={{textDecoration:"none"}}>Home</Link></li>
<li><Link to='' style={{textDecoration:"none"}}>How it Works</Link></li>

<li><button><Link to='' style={{textDecoration:"none",color:"white"}}>Signin</Link></button></li>
</ul>

    </div>
  )
}

export default Navbar