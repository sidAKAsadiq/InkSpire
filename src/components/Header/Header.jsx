import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {Logout_button,Container,Logo} from '../index'
import { useNavigate } from 'react-router-dom'


function Header() {
  const user_authentication_status = useSelector(state => state.is_authenticated)

  const navigate = useNavigate()

  const navbar_items = [
    {
      name : 'Home',
      slug : "/",
      is_active : true ,
    },
    {
      name : 'Login',
      slug : "/login",
      is_active : !user_authentication_status ,
    },
    {
      name : 'Sign Up',
      slug : "/sign-up",
      is_active :!user_authentication_status ,
    },      
    {
      name : 'All posts',
      slug : "all-posts",
      is_active : user_authentication_status,
    }, 
    {
      name : 'Add post',
      slug : "add-post",
      is_active : user_authentication_status,
    },        

  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <ul  className='flex ml-auto'>
             {navbar_items.map((each_item) =>
               each_item.is_active ? 
               (
               <li key={each_item.name}>
               <button 
               onClick={() => navigate(each_item.slug)}
               className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
               >
                each_item.name
               </button>
               </li>
               )
               : null
               )} 
          </ul>
               {user_authentication_status && (
                <li>
                 <Logout_button />
                </li>
               )}

        </nav>

      </Container>

    </header>
  )
}

export default Header