import React from 'react'
import userAuth from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LogoutBtn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const logoutHandler = ()=>{
        userAuth.logout().then(()=>{
            dispatch(logout())
            navigate("/")
        })
    }

  return (
    <button
    className="text-white hover:text-gray-100 font-bold text-lg bg-orange-500 hover:bg-orange-600 
    py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
    onClick={logoutHandler}
    >
        Logout
    </button>
  )
}

export default LogoutBtn