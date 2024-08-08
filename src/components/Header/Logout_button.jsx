import React from 'react'
import {useDispatch} from 'react-redux'
import auth_service_obj from '../../appwrite/auth'
import { logout } from '../../store/auth_slice'

function Logout_button() {
    const dispatch = useDispatch()

    const logout_handler = () => {
        auth_service_obj.logout()
        .then(() => {
            dispatch(logout())
        })
        .catch((error) => {
            console.log("Error logging out in logout button : ", error)
        })
    }

 
    return (
    <button 
    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logout_handler}
    >
        Logout
    </button>
  )
}

export default Logout_button