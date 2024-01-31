import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import userAuth from '../appwrite/auth'
import { login } from "../store/authSlice"
import { Link } from 'react-router-dom'
import { Input, Button } from "../component"


const Signup = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })

  const submit = async (data) => {
    console.log(data)
    const session = await userAuth.signup(data)
    if (session) {
      const userData = await userAuth.getCurrentUser()
      if (userData) dispatch(login({ userData }))
      navigate("/")
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md flex flex-col items-center justify-evenly space-y-4">
      <img src="./pexels-scott-webb-430205.jpg" alt="Logo" className='w-20 h-10 m-3' />
      <form onSubmit={handleSubmit(submit)} className='flex flex-col items-center justify-center space-y-4'>
        <p className="text-center text-gray-600">Already have an account?<Link to={'/login'}> <span className='text-blue-600 font-bold'>Login here</span></Link></p>
        <div className='flex flex-col justify-start w-96 space-y-3'>
          <Input
            label="Full Name: "
            className="border border-black"
            {...register("name", {
              required: "Full Name is required",
              validate: {
                pattern: (value) => /^[A-Za-z ]+$/.test(value) || "Full name shouldn't have numbers or special characters"
              }
            })}
          />
          {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
          <Input
            type="email"
            label="Email: "
            className="border border-black"
            {...register("email", {
              required: "Email is required",
              validate: {
                pattern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || "Email must be valid"
              }
            })}
          />
          {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          <Input
            type="password"
            label="Password: "
            className="border border-black"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password should be atleast 8 characters long"
              }
            })}
          />
          {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
        </div>
        <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white 
        font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800">Signup</Button>
      </form>
    </div>
  )
}

export default Signup