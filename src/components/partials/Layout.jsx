import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function Layout() {
  return (
    <div className='h-screen'>
        <Header/>
        <Outlet/>
        {/* <Footer/> */}
    </div>
  )
}

export default Layout