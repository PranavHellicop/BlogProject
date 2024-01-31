import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {LogoutBtn,Button} from "../../component"

const Header = () => {

    const authStatus = useSelector((state)=>state.auth.status)
    const NavItems = [

        {
            item:"Home",
            slug:"/",
            status:true
        },
        {
            item:"Signup",
            slug:"/signup",
            status:!authStatus
        },
        {
            item:"Login",
            slug:"/login",
            status:!authStatus
        },
        {
            item:"Add Post",
            slug:"/add-post",
            status:authStatus
        },
        {
            item:"All Post",
            slug:"/all-post",
            status:authStatus
        }

    ]

  return (
    <header className="bg-gradient-to-r from-orange-500 to-yellow-600 p-4 sticky top-0 z-20">
    <div className='mx-auto flex justify-between items-center'>
        {/* LOGO */}
        <Link to="/">
        <div className='ml-5'>
            <img src="./pexels-scott-webb-430205.jpg" alt="Logo" className='w-30 h-12' />
        </div>
        </Link>
        <nav className='flex items-center'>
        {NavItems.map((Navitem)=>(
                Navitem.status && 
                <ul className='flex' key={Navitem.item}>
                    <Link to={`${Navitem.slug}`}>
                        <li className='mx-3'>
                            <Button 
                            className="text-white hover:text-gray-100 font-bold text-md bg-orange-500
                             hover:bg-orange-600 py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
                        >{Navitem.item}</Button></li>
                    </Link>

                </ul>
            )
            
            )}
            {authStatus &&
            <ul>

                <li><LogoutBtn/></li> 
            </ul>
            }
        </nav>
        
    </div>
    </header>
  )
}

export default Header