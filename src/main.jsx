import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import {AddPost,AllPost,Home,Login,Signup, Post,EditPost} from "./pages/index.js"

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },

      {
        path:"/login",
        element:<Login/>
      },

      {
        path:"/signup",
        element:<Signup/>
      },

      {
        path:"/add-post",
        element:<AddPost/>
      },

      {
        path:"/all-post",
        element:<AllPost/>
      },

      {
        path:"/post/:id",
        element:<Post/>
    },
    
    {
        path:"/edit-post/:id",
        element:<EditPost/>
    }

    ]
      
  }
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  // </React.StrictMode>
)
