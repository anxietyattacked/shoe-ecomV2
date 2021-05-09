import { query } from '@urql/exchange-graphcache'
import { Formik, Form } from 'formik'
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import Link from 'next/link'
import  { useRouter } from 'next/router'
import React, { useState } from 'react'
import { InputField } from '../../components/InputField'
import { useChangePasswordMutation } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { toErrorMap } from '../../utils/toErrorMap'


const ChangePassword : NextPage = () => {
    const router = useRouter()
    const [, changePassword] = useChangePasswordMutation()
    const [tokenError, setTokenError] = useState("")
    return (
        <div className="py-10 grid place-content-center">
            <Formik initialValues={{newPassword: ""}} 
            onSubmit={async (values, {setErrors}) => {
                 const response = await changePassword({newPassword: values.newPassword, 
                    token: typeof router.query.token === "string" ? router.query.token : ""})
                 if(response.data?.changePassword.errors){
                    const errorMap = toErrorMap(response.data.changePassword.errors)
                    if('token' in errorMap){
                        setTokenError(errorMap.token)
                    }
                    setErrors(errorMap)
                 }else if (response.data?.changePassword.user)
                 router.push("/")
                 }}>
                {({isSubmitting}) => (
                    <Form className="flex flex-col shadow px-4 py-4">
                        <h1 className="text-center text-2xl mb-4">Change Password</h1>
                        {tokenError ? <div>
                        <div className="text-red-600">{tokenError}</div> 
                        <Link href="/forgot-password">Forgot Password?</Link>
                        </div>
                        : null}
                            <InputField 
                        name="newPassword"
                        label="New Password"
                        type="password"
                        />
                        <button  type="submit" disabled={isSubmitting} className="bg-green-400 px-3 py-2 mt-8 rounded-full">Change Password</button>

                    </Form>
                )}

            </Formik>
        </div>
    )
}


//@ts-ignore
export default withUrqlClient(createUrqlClient, {ssr: false})(ChangePassword)
