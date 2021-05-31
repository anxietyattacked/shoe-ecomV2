import { Form, Formik } from 'formik'
import React from 'react'
import { InputField } from '../components/InputField'
import { useLoginMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import {useRouter} from "next/router"
import { createUrqlClient } from '../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'
import Link from 'next/link'
import Head from 'next/head'



const Login = () => {
    const router = useRouter()
    const [, login] = useLoginMutation()
    return (
        <div className="min-h-screen grid place-content-center">
                <Head>
    <title>SneakerFlex - Login</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
            <Formik initialValues={{usernameOrEmail: "", password: ""}} 
            onSubmit={async (values, {setErrors}) => {
                 const response = await login(values)
                 if(response.data?.login.errors){
                    setErrors(toErrorMap(response.data.login.errors))
                 }else if (response.data?.login.user)
                 if(typeof router.query.next === "string"){
                    router.push(router.query.next)
                 } router.push("/")
                 
                 }}>
                {({isSubmitting}) => (
                    <Form className="flex flex-col shadow pt-20 pb-20 px-20 mb-80">
                        <h1 className="text-center text-3xl mb-16">Login</h1>
                        <div className="grid place-content-center mb-4">
                            <h1 className="font-bold">Demo User</h1>
                            <p><strong>username:</strong>demo</p>
                            <p><strong>password:</strong>:tester</p>
                        </div>
                        <InputField className="w-96 shadow-inner"
                        name="usernameOrEmail"
                        label="Username or Email"
                        type="text"
                        />
                            <InputField 
                        name="password"
                        label="Password"
                        type="password"
                        />
                        <button  type="submit" disabled={isSubmitting} className="bg-gray-700 text-white font-bold text-xl px-3 py-2 mt-4">Login</button>
                    </Form>
                )}

            </Formik>
        </div>
    )
}

export default withUrqlClient(createUrqlClient)(Login)
