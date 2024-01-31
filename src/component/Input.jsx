import React,{useId} from 'react'

const Input = ({label,type = "text", className="",...props},ref) => {

  const {id} = useId()
  return (
    <div className='flex justify-between items-center'>
        {label && <label htmlFor={id} className='block text-sm font-medium text-gray-700'>{label}</label>}
        <input
        id={id}
         type={type}
         className={`p-2 m-2 ${className}`}
         ref={ref}
         {...props}
         />
    </div>
  )
}

export default React.forwardRef(Input)