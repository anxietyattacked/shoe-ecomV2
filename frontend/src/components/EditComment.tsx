import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useRef, useEffect, useState } from "react";
import {useRouter} from "next/router"
import { OrderDetailInput } from "../context/cart";
import { OperationContext, OperationResult } from "urql";
import { Exact, UpdateCommentMutation } from "../generated/graphql";
import { Formik, Form, Field } from "formik";

interface ECProps  {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    updateComment: (variables?: Exact<{
        id: number;
        text: string;
    }> | undefined, context?: Partial<OperationContext> | undefined) => Promise<OperationResult<UpdateCommentMutation>> 
    commentId: {
        id: number;
        text: string;
    }
}

const EditComment  : React.FC<ECProps> = ({isOpen, setIsOpen, updateComment ,commentId}) => {
    const router = useRouter()
    const cancelButtonRef = useRef();

    function closeModal() {
      setIsOpen(false);
    }
  
    function openModal() {
      setIsOpen(true);
    }
  
    return (
      <>
        <Transition show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            initialFocus={cancelButtonRef as any}
            static
            open={isOpen}
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>
  
              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="grid place-content-end">
                    <button
                      type="submit"
                      className="inline-flex justify-center px-6 py-2 text-md font-bold text-white bg-gray-700 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={() => {
                          closeModal()
                      }}
                    >
                        <span className="iconify text-xl" data-icon="codicon-chrome-close" data-inline="false"></span>
                    </button>
                  </div>
                  <Formik initialValues={{ text: commentId.text}} 
            onSubmit={async (values) => {
                 const {error} = await updateComment({id:commentId.id,text: values.text})
                if(!error){
                    setIsOpen(false)
                }
                 
                 }}>
                {({isSubmitting}) => (
                    <Form className="flex flex-col px-4 py-4">
                        <h1 className="text-center text-2xl mb-4">Edit Comment</h1>
                        <label htmlFor="text">Edit Comment</label>
                        <Field className="shadow-inner" rows={10} cols={10} as="textarea" name="text" />
                        <button  type="submit" disabled={isSubmitting} className="bg-gray-700 text-white font-bold text-xl px-3 py-2 mt-8">Create Post</button>
                        
                    </Form>
                )}

            </Formik>
  
                  
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </>
    );
}
export default EditComment