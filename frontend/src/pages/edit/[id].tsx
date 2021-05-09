import { Formik, Form, Field } from 'formik'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React from 'react'
import { InputField } from '../../components/InputField'
import {  usePostQuery, useUpdatePostMutation } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { useGetIntId } from '../../utils/useGetIntId'


const EditPost = () => {
    const router = useRouter();
    const intId = useGetIntId();
    const [{ data, fetching }] = usePostQuery({
      pause: intId === -1,
      variables: {
        id: intId,
      },
    });
    const [,updatePost] = useUpdatePostMutation();
    if (fetching) {
      return (
        <div>
          <div>loading...</div>
        </div>
      );
    }
  
    if (!data?.post) {
      return (
        <div>
          <div>could not find post</div>
        </div>
      );
    }
    return (
        <div className="py-10 grid place-content-center">
        <Formik initialValues={{title: data.post.title, text: data?.post?.text}} 
      onSubmit={async (values) => {
            updatePost({id: intId, ...values})
            router.push("/")
           }}>
          {({isSubmitting}) => (
              <Form className="flex flex-col shadow px-4 py-4">
                  <h1 className="text-center text-2xl mb-4">Edit Comment</h1>
                  <InputField 
                  name="title"
                  label="Edit Title"
                  type="text"
                  />
                  <label htmlFor="text">Edit Comment</label>
                  <Field className="shadow-inner" as="textarea" name="text" />
                  <button  type="submit" disabled={isSubmitting} className="bg-green-400 px-3 py-2 mt-8 rounded-full">Edit Post</button>
                  
              </Form>
          )}

      </Formik>
      
  </div>
    )
}

export default withUrqlClient(createUrqlClient)(EditPost)
