import React from 'react'
import { useDispatch } from "react-redux"
import authService from "../../services/authServices.js"
import { logout as userLogout } from '../../store/authSlice.js'
import { useNavigate } from 'react-router-dom'


function LogoutBtn() {

    const dispatch = useDispatch()
   const navigate = useNavigate()

    // const logoutHandler = async()=> {
    //     await authService.logout()
    //     dispatch(userLogout())
    //     navigate("/")  
    // }

    const logoutHandler = () => {
      window.location.reload()
        // authService.logout()
        // .then(() => navigate("/"))
        // .then(() => dispatch(userLogout()))
       
    }


  return (
    <div>
        <button 
          onClick={logoutHandler}>
            Logout
        </button>
    </div>
  )
}

export default LogoutBtn