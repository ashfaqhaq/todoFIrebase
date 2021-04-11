import React from 'react'
import { useLocation,Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
function Header() {

    const location = useLocation()
    const {logout} = useAuth()
    return (
        <div className="mt-5">
          
                
  <div class="flex justify-around items-center flex-shrink-0 text-black text-5xl font-bold mr-6">
   Karlo
  </div>
 
  
  <div className="flex justify-around mt-5">
     
      {location.pathname==="/"? <button onClick={()=>logout()} class="">
        Logout
      </button>:<>
      <Link to="/signup" class=" ">
        Sign up 
      </Link>
     
      <Link to="/login" class="">
        Login
      </Link>
      </>
       }
    
    </div>
        </div>
    )
}

export default Header



