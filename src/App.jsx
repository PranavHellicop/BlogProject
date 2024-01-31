import { useState,useEffect } from 'react'
import './App.css'
import userAuth from './appwrite/auth'
import {login,logout} from "./store/authSlice"
import { useDispatch } from 'react-redux'
import { Header,Footer,Container } from './component'
import { Outlet,ScrollRestoration } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()


useEffect(()=>{
 userAuth.getCurrentUser().then((userData)=>{
  if(userData){
    dispatch(login({userData}))
  }else{
    dispatch(logout())
  }

 })
 .finally(()=>{

   setLoading(false)
 }
 )
},[])


  return !loading ? 
    <div className='bg-gray-200'>
      <Header />
      <Container>

      <Outlet />
      </Container>
      <Footer />
      <ScrollRestoration />
    </div>
  : <div>Loading...</div>
}

export default App
