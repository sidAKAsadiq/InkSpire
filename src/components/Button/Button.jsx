import React from 'react'

function Button({
    children,
    type = 'button',
    bg_color = 'bg-blue-600',
    text_color = 'text-white',
    className = '' ,
    ...props
}) 
{
 
return (
    <button 
    className={`px-4 py-2 rounded-lg ${bg_color} ${text_color} ${className} `}
    type={type}
    {... props}
    
    >{children}
    </button>
  )
}

export default Button