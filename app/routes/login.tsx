import { Layout } from "~/components/layout"
import { FormField } from "~/components/form-field"
import { useState, useEffect, useRef } from "react"
import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { json, redirect} from "@remix-run/node"
import { validateEmail, validateName, validatePassword } from "~/utils/validators.server"
import { login, register, getUser } from '~/utils/auth.server'
import { useActionData } from "@remix-run/react"



export const loader: LoaderFunction = async ({ request }) => {
    // If there's already a user in the session, redirect to the home page
  return (await getUser(request)) ? redirect('/') : null
}

//pulls the form data out of the request object.
//ensures an email and password were provided
//ensures firstName and lastName were provided if the _action value is "register"
export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
  const action = form.get('_action')
  const email = form.get('email')
  const password = form.get('password')
  let firstName = form.get('firstName')
  let lastName = form.get('lastName')

  if (typeof action !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 })
  }

  if (action === 'register' && (typeof firstName !== 'string' || typeof lastName !== 'string')) {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 })
  }

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
    ...(action === 'register'
      ? {
          firstName: validateName((firstName as string) || ''),
          lastName: validateName((lastName as string) || ''),
        }
      : {}),
  }

  if (Object.values(errors).some(Boolean))
    return json({ errors, fields: { email, password, firstName, lastName }, form: action }, { status: 400 })

    switch (action) {
        case 'login': {
            return await login({ email, password })
        }
        case 'register': {
            firstName = firstName as string
            lastName = lastName as string
        
            return await register({ email, password, firstName, lastName })
        }
        default:
            return json({ error: `Invalid Form Data` }, { status: 400 });
  }}


export default function Login() {
    const [action, setAction] = useState("login")
// Hooks into the data returned from the action function.
    const actionData = useActionData()
    // Sets up an errors variable which will hold field-specific errors, such as "Invalid Email", in an object. 
    // It also sets up a formError variable which will hold error messages to display form messages such as "Incorrect Login".
    const firstLoad = useRef(true)
    const [errors, setErrors] = useState(actionData?.errors || {})
    const [formError, setFormError] = useState(actionData?.error || "")
    // Updates the formData state variables to default to any values returned by the action function if available.
    const [formData, setFormData] = useState({
        email: actionData?.fields?.email || "",
        password: actionData?.fields?.password || "",
        firstName: actionData?.fields?.firstName || "",
        lastName: actionData?.fields?.lastName || "",
    })
    // if user is shown errors and user switches forms, errors are cleared.
    useEffect(() => {
        if (!firstLoad.current) {
            const newState = {
                email: "",
                password: "",
                firstName: "",
                lastName: "",
            }
            setErrors(newState)
            setFormError("")
            setFormData(newState)
        }
    }, [action])

    useEffect(() => {
        if (!firstLoad.current) {
            setFormError("")
        }
    }, [formData])

    useEffect(() => { firstLoad.current = false } , [])

    //updates the form data when an input changes
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setFormData(form => ({ ...form, [field]: event.target.value }))
      }
    
    return (
        <Layout>
            <div className="h-full justify-center items-center flex flex-col gap-y-4">
                <button
                    onClick={() => setAction(action == 'login' ? 'register' : 'login')}
                    className="select-none absolute top-8 right-8 rounded-xl bg-gray-900 font-semibold text-gray-300 px-3 py-2 transition duration-300 ease-in-out hover:bg-gray-400 hover:text-gray-900 hover:-translate-y-1"
                >
                    {action === 'login' ? 'Sign Up' : 'Sign In'}
                </button>
                <img className="w-60 select-none" src={require("public/Blink_logo_black.png")} alt="Blink"></img>
                <h2 className="text-4xl font-extrabold text-gray-900 select-none">Portal</h2>
                
                <p className="font-semibold text-slate-800 select-none">
                    {action === "login" ? "Sign In For Tooling Around!" : "Sign Up To Get Started!"}</p>

                <form method="POST" className="rounded-2xl bg-gray-200 p-6 w-96">
                    <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">{formError}</div> 
                        <FormField
                            htmlFor="email"
                            label="Email"
                            value={formData.email}
                            onChange={e => handleInputChange(e, 'email')}
                            error={errors?.email}
                        />
                        <FormField
                            htmlFor="password"
                            type="password"
                            label="Password"
                            value={formData.password}
                            onChange={e => handleInputChange(e, 'password')}
                            error={errors?.password}
                        />
                        {action === 'register' && (
                        <>
                        <FormField
                            htmlFor="firstName"
                            label="First Name"
                            onChange={e => handleInputChange(e, 'firstName')}
                            value={formData.firstName}
                            error={errors?.firstName}
                        />
                        <FormField
                            htmlFor="lastName"
                            label="Last Name"
                            onChange={e => handleInputChange(e, 'lastName')}
                            value={formData.lastName}
                            error={errors?.lastName}
                        />
                        </>
                    )}
                <div className="w-full text-center">
                <button type="submit" name="_action" value={action} className="select-none rounded-xl mt-2 bg-gray-800 px-3 py-2 text-gray-300 font-semibold transition duration-300 ease-in-out hover:bg-gray-400 hover:text-gray-800 hover:-translate-y-1">
                    {
                        action === 'login' ? "Sign In" : "Sign Up"
                    }
                </button>
                </div>
                </form>
            </div>
        </Layout> 
    )
}