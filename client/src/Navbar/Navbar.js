import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
<Link to=''>Home</Link>
<Link to=''>How it Works</Link>
<button><Link to=''>Signin</Link></button>

    </div>
  )
}

export default Navbar