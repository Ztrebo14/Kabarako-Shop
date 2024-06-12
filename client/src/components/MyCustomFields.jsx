import React from 'react'
import { useField } from 'formik'

const myCustomFields = () => {
  return (
    <div>myCustomFields</div>
  )
}

export const MyCheckBox = ({ children, ...props }) => {
    const [ field, meta ] = useField({...props, type:'checkbox'})
    return(
        <>
            <label className='check-input'>
                <input type='checkbox' {...field} {...props} />
                {children}
            </label>
            { meta.touched && meta.error ? (
                <div>{meta.error}</div>
            ) : null}
        </>
    )
}

export const MySelect = ({ label, ...props }) => {
    const [ field, meta ] = useField(props)
  return (
    <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <select {...field} {...props} />
        { meta.touched && meta.error ? (
            <div>{meta.error}</div>
        ) : null}
    </>
  )
}

export default myCustomFields