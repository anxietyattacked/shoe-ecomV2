import { Formik, Form, Field } from 'formik'
import { withUrqlClient } from 'next-urql'
import Link from 'next/link'
import router from 'next/router'
import React, { useEffect, useState } from 'react'
import { InputField } from '../components/InputField'
import { useCreatePostMutation, useMeQuery } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { toErrorMap } from '../utils/toErrorMap'
import { useIsAuth } from '../utils/useIsAuth'
import login from './login'

const createPost : React.FC<{}> = () => {
    useIsAuth()
    const [, createPost] = useCreatePostMutation()
    const [sent, setSent] = useState(false)


    return (
        <div className="py-10 grid place-content-center">
              <Formik initialValues={{title: "", text: ""}} 
            onSubmit={async (values) => {
                 const {error} = await createPost({input: values})
                if(!error){
                    setSent(true)
                    router.push("/")
                }
                 
                 }}>
                {({isSubmitting}) => (
                    <Form className="flex flex-col shadow px-4 py-4">
                        {sent ? <div className="text-green-500">Comment Sent</div> : null}
                        <h1 className="text-center text-2xl mb-4">Comment</h1>
                        <InputField 
                        name="title"
                        label="Title"
                        type="text"
                        />
                        <label htmlFor="text">Comment</label>
                        <Field className="shadow-inner" as="textarea" name="text" />
                        <button  type="submit" disabled={isSubmitting} className="bg-green-400 px-3 py-2 mt-8 rounded-full">Create Post</button>
                        
                    </Form>
                )}

            </Formik>
            
        </div>
    )
}

export default withUrqlClient(createUrqlClient)(createPost)
