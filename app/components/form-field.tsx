import { useState, useEffect } from "react"


interface FormFieldProps {
  htmlFor: string
  label: string
  type?: string
  value: any
  onChange?: (...args: any) => any,
  error?: string
}

export function FormField({ 
    htmlFor, 
    label, 
    type = 'text', 
    value, 
    onChange = () => {},
    error = ""
   }: FormFieldProps) {
    // component takes in error message. Updates on change of input fields.
    const [errorText, setErrorText] = useState(error)

    useEffect(() => {
      setErrorText(error)
    }, [error])
  return (
    <>
      <label htmlFor={htmlFor} className="text-gray-600 font-semibold select-none">
        {label}
      </label>
      <input
        onChange={e => {
          onChange(e)
          setErrorText("")
        }}
        type={type}
        id={htmlFor}
        name={htmlFor}
        className="w-full p-2 rounded-xl my-2 select-none"
        value={value}
      />
      <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
           {errorText || ''}
     </div>
    </>
  )
}