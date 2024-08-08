import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({children , authentication = true}) {
    const dispatch = useDispatch()
    const is_authenticated = useSelector(state => state.is_authenticated)
    const [loader , set_loader] = useState("true")
    const navigate = useNavigate()

    useEffect(() => {
        if(authentication && is_authenticated === false){
            navigate('/login')
        }
        else if(!authentication && is_authenticated === true){
            navigate('/')
        }
        set_loader(false)

    }, [is_authenticated , navigate , authentication])

    return (
    loader ? <h1>Loading</h1> : <>{children}</>
  )
}

export default Protected