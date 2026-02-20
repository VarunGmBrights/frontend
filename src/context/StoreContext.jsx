import {createContext, useEffect, useState} from 'react'
import axios from 'axios'

export const StoreContext = createContext(null)
const StoreContextProvider = (props) => {

    const [cartItems, setcartItems] = useState({})
    const url = process.env.REACT_APP_API_URL || "http://localhost:4000"
    const [token , setToken] = useState("")
    
    // Create axios instance with credentials
    const api = axios.create({
      baseURL: url,
      withCredentials: true
    });

    const [food_list, setFoodList] = useState([])
  
    const addToCart = async (itemId)=> {
               if(!cartItems[itemId]){
                setcartItems((prev)=>({...prev,[itemId]:1}))
               }else{
                setcartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
               }

               if (token) {
                await api.post("/api/cart/add",{itemId},{headers:{Authorization: token}})
               }
    }

    const removeFromCart = async (itemId)=>{
        setcartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if (token) {
            await api.post("/api/cart/remove",{itemId},{headers:{Authorization: token}})
        }
    }

     const getTotalCartAmount = ()=> {
        let totalAmount = 0;
       for(const item in cartItems){
        if(cartItems[item]>0){

          let itemInfo = food_list.find((product)=>product._id === item);
          if (itemInfo) {  // ← ADD THIS LINE
            totalAmount += itemInfo.price* cartItems[item] 
        } 
       
        }
            }

            return totalAmount;
     }

     const  fetchFoodList  = async () => {
              const response = await api.get("/api/food/list")
              setFoodList(response.data.data)
     }    

     const looadCartData = async (token) => {
        const response = await api.post("/api/cart/get",{},{headers:{Authorization: token}})
        setcartItems(response.data.cartData)
     }

     useEffect(()=>{
      
       async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await looadCartData(localStorage.getItem("token"))
           }
       }
       loadData();
     },[])

    const contextValue = {
           food_list,
          cartItems,
          setcartItems,
          addToCart,
          removeFromCart,
          getTotalCartAmount,
          url,
          token,
          setToken,
          setFoodList 
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider





