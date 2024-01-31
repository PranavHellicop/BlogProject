import React,{useId} from "react"

const Select = ({options, label,...props},ref)=>{
    const {id} = useId()
    return(
        <div>
            {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>}
            <select id={id} ref={ref} {...props} className={`px-3 mb-4 py-2 rounded-lg bg-white
         text-black outline-none focus:bg-gray-50 
         duration-200 border border-gray-200 w-full 
        `}>
                {options?.map((option)=>(
                    <option value={option} key={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)