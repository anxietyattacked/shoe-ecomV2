import React from 'react'
import { Formik, Form, Field } from "formik"
import { InputField } from '../components/InputField'
import { useRegisterMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import {useRouter} from "next/router"
import { createUrqlClient } from '../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'

interface registerProps {

}

const register : React.FC<registerProps> = ({}) => {
    const router = useRouter()
    const [, register] = useRegisterMutation()
    return (
        <div className="grid min-h-screen  place-content-center">
                <Head>
    <title>SneakerFlex - Register</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
            <Formik initialValues={{username: "", email: "", password: ""}} 
            onSubmit={async (values, {setErrors}) => {
                 const response = await register({options: values})
                 if(response.data?.register.errors){
                    setErrors(toErrorMap(response.data.register.errors))
                 }else if (response.data?.register.user)
                 router.push("/")
                 }}>
                {({isSubmitting}) => (
                    <Form className="flex flex-col shadow pt-20 pb-20 px-20 mb-80">
                        <h1 className="text-center text-3xl mb-16">Sign Up</h1>
                        <InputField className="w-96 shadow-inner"
                        name="username"
                        label="Username"
                        type="text"
                        />
                            <InputField 
                        name="email"
                        label="Email"
                        type="email"
                        />
                            <InputField 
                        name="password"
                        label="Password"
                        type="password"
                        />
                        <button  type="submit" disabled={isSubmitting} className="bg-gray-700 text-white font-bold text-xl px-3 py-2 mt-4">Sign Up</button>

                    </Form>
                )}

            </Formik>
        </div>
    )
}

export default withUrqlClient(createUrqlClient)(register)


