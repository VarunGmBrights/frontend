
import React, { useContext,useEffect,useState } from 'react'
import './Place.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const PlaceOrder = () => {

const { getTotalCartAmount,token ,food_list, cartItems,url} = useContext(StoreContext)
const [data, setData] = useState({
  firstname :"",
  lastname:"",
  email:"",
  street:"",
  city:"",
  state:"",
  zipcode:"",
  country:"",
  phone:""

})





const onChangeHandler = (e) => {
  const name = e.target.name
  const value = e.target.value

  setData(data=>({...data,[name]:value}))
}

const placeOrder = async (e) => {
          e.preventDefault();
          let orderItems = [];
          food_list.map((item)=>{
            if (cartItems[item._id]>0) {
              let itemInfo = item;
              itemInfo["quantity"] = cartItems[item._id];
              orderItems.push(itemInfo)
            }
          })

         let orderData = {
          address:data,
          items:orderItems,
          amount:getTotalCartAmount()+2,

         }

         let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
         if (response.data.success) {
          const {session_url} = response.data;
          window.location.replace(session_url);
          
         }else {
          alert("Error")
        }
}


const navigate = useNavigate();

useEffect(()=> {
     if (!token) {
      navigate('/cart')
     }else if(getTotalCartAmount()===0){
       navigate('/cart')
     }
},[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>

      <div className="place-order-left">
     <p className="title">Delivery Information</p>
     <div className="multi-fields">
      <input required type="text" onChange={onChangeHandler} value={data.firstname}  name='firstname'  placeholder='First Name' />
      <input required type="text" onChange={onChangeHandler} value={data.lastname} name='lastname'  placeholder='Last Name' />
     </div>
     <input required type="email" onChange={onChangeHandler} value={data.email} name='email'  placeholder='Email address' />
     <input required type="text" onChange={onChangeHandler} value={data.street} name='street'  placeholder='Street' />
     <div className="multi-fields">
      <input required type="text" onChange={onChangeHandler} value={data.city} name='city'  placeholder='City' />
      <input required type="text" onChange={onChangeHandler} value={data.state} name='state' placeholder='State' />
     </div>
     <div className="multi-fields">
      <input required type="text" onChange={onChangeHandler} value={data.zipcode} name='zipcode' placeholder='Zip Code' />
      <input required type="text" onChange={onChangeHandler} value={data.country} name='country' placeholder='Country' />
     </div>
     <input required type="text" onChange={onChangeHandler} value={data.phone} name='phone' placeholder='Phone' />
      </div>

     
      <div className="place-order-right">
      <div className="cart-total">
            <h2>cart Totals</h2>
            <div>
            <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount()===0?0:50}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+50}</b>
              </div>
              
            </div>
            <button type='submit' >PROCCED TO PAYMENT</button>

          </div>
      </div>

    </form>
  )
}

export default PlaceOrder

