import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import my_store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home_page from './pages/Home_page.jsx'
import { Protected } from './components/index.js'
import Login_page from './pages/Login_page.jsx'
import Sign_up_page from './pages/Sign_up_page.jsx'
import All_posts_page from './pages/All_posts_page.jsx'
import Add_post_page from './pages/Add_post_page.jsx'
import Edit_post_page from './pages/Edit_post_page.jsx'
import Single_post_page from './pages/Single_post_page.jsx'
import My_posts_page from './pages/My_posts_page.jsx'

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children : [
    {
      path: '/',
      element: <Home_page />
    },
    {
      path: '/login', //i think yay protected nahi hona chahihye!
      element: (
        <Protected authentication = {false} >
          <Login_page />
        </Protected>
      )
    },
    {
      path: '/signup', //i think yay protected nahi hona chahihye!
      element: (
        <Protected authentication = {false}>
          <Sign_up_page />
        </Protected>
      )
    },
    {
      path: '/all-posts',
      element: (
        <Protected>
          <All_posts_page />
        </Protected>
      )
    },
    {
      path: '/my-posts',
      element: (
        <Protected>
          <My_posts_page/>
        </Protected>
      )
    },
    {
      path: '/add-post',
      element: (
        <Protected>
          <Add_post_page />
        </Protected>
      )
    },    
    {
      path: '/edit-post/:slug',
      element: (
        <Protected>
          <Edit_post_page />
        </Protected>
      )
    },
    {
      path: '/post/:slug',
      element: (
        <Protected>
          <Single_post_page />
        </Protected>
      )
    }        
  ]
}
]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={my_store}>
    <RouterProvider router={router} />
  </Provider>,
)
