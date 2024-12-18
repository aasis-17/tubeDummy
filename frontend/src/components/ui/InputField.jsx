import React, { forwardRef } from 'react'
import { useId } from 'react'

function InputField({
    label,
    type="text",
    className,
    classLabel,
    ...props
},ref)
{
    const id = useId()
  return (

    <>
      { label && <label className={`${classLabel}`} htmlFor={id}>{label}</label> }
        <input
            id={id}
            className={`outline-none ${className}`}
            type={type}
            {...props}
            ref={ref}
             />

    </>
  )
}

export default forwardRef(InputField)