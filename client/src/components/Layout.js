import  React from 'react'
import {useState} from 'react'
import { Outlet } from 'react-router-dom'
import Home from './Home'
import Navbar from './Navbar'

const Layout = () => {
  
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default Layout
