import React, {InputHTMLAttributes} from "react"
import {useField, Field, ErrorMessage} from "formik"

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string
    label: string
}

export const InputField: React.FC<FieldProps> = ({label, ...props}) => {
    const [field, {error}] = useField(props)
    return (
        <>
        <label htmlFor={field.name}>{label}</label>
        <Field {...field} className="shadow-inner" {...props} id={field.name}/>
        {error ? <ErrorMessage name={field.name}>{error => <div className="text-red-600">{error}</div>}</ErrorMessage> : null}
        </>
    )
}