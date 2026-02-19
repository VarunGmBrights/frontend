
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Home from './Pages/Home/Home.jsx'
import Cart from './Pages/Cart/Cart.jsx'
import Footer from './Components/Footer/Footer.jsx'
import { useState } from 'react'
import LoginPopup from './Components/LoginPopup/LoginPopup.jsx'
import Verify from './Pages/verify/Verify.jsx'
import Myorders from './Pages/MyOrders/Myorders.jsx'

function App() {

   const [showLogin, setShowLogin] = useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className="app">
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
        <Route path='/verify' element={<Verify/>} />
        <Route path='/myorders' element={<Myorders/>} />
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
