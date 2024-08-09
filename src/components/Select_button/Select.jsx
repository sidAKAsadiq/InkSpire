import React, {useId} from 'react'

const Select = React.forwardRef( function Select({
    options = [],
    label,
    className = "",
    ...props
}){
    const id = useId()
    return(
        <div className='w-full'>
            {label && 
            <label htmlFor= {id}>
                {label}
            </label>}
            <select
             id={id}
             ref = {ref}
             className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border-gray-200 w-full ${className}`}
             {... props}
             >
                {options?.map((each_option) => (
                    <option key={each_option} value={each_option}>
                        {each_option}
                    </option>
                ))}

             </select> 
        </div>
    )


} ,  ref)


export default Select