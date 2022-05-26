import React from 'react'
import Login from '../components/Login'
import Navbar from '../components/Navbar';
import About from '../components/About'
import Footer from '../components/Footer';


function Home() {
  return (
    <div>
        <Navbar />
        <Login />
        <About />
        <Footer />
    </div>
  )
}

export default Home