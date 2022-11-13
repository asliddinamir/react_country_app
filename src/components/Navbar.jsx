import React from 'react'

export default function Navbar() {

const modeChanger = () =>{
    document.body.classList.toggle('light-mode')
}

  return (
    <div className='navbar'>
        <h2 className='title'>Country Web App</h2>
        <button onClick={modeChanger} className='toggleBtn'><i className='fas fa-moon'></i></button>
    </div>
  )
}
