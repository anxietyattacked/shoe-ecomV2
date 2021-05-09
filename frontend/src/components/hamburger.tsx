import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useRef, useEffect, useState } from "react";
import {useRouter} from "next/router"
import { OrderDetailInput } from "../context/cart";
import Link from "next/link"
import { Exact, LogoutMutation, MeQuery } from "../generated/graphql";
import { OperationContext, OperationResult } from "urql";


interface HBProps  {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    data: MeQuery | undefined
    logout: (variables?: Exact<{
        [key: string]: never;
    }> | undefined, context?: Partial<OperationContext> | undefined) => Promise<OperationResult<LogoutMutation>>
    isMobile: boolean
}

const Hamburger  : React.FC<HBProps> = ({isOpen, setIsOpen, data, logout, isMobile}) => {
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
      <div className="inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="px-2 mr-2 py-2 text-xl"
        >
         <span className="iconify" data-icon="cil-hamburger-menu" data-inline="false"></span>
        </button>
      </div>
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
                className="inline-block h-screen align-start"
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
                <div className="absolute left-0 top-0 right-0 inline-block w-7/12 h-screen overflow-hidden text-left transition-all transform bg-white shadow-xl">
                  <div className="grid place-content-end">
                    <button
                      type="button"
                      className="inline-flex justify-end px-4 py-2 text-xl font-bold text-white bg-gray-700 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={() => {
                          closeModal()
                      }}
                    >
                    <span className="iconify" data-icon="codicon-chrome-close" data-inline="false"></span>
                    </button>
                  </div>
                  {!data?.me ?
                  <div className="flex flex-col mt-2 ">
                      <Link href="/"><a className="pl-3 py-3 text-4xl shadow">Home</a></Link>
                      <Link href="/register"><a className="pl-3 py-3 text-4xl shadow">Register</a></Link>
                      <Link href="/login"><a className="pl-3 py-3 text-4xl shadow">Login</a></Link>
                  </div>   
                :
                <div className="flex flex-col mt-2">
                <Link href="/"><a className="pl-3 py-3 text-4xl shadow tracking-widest">Home</a></Link>
                <button onClick={async () => {
                await logout()
                router.reload()
                }} className="pl-3 py-3 text-4xl text-left shadow tracking-widest">Logout</button>
            </div>
                }
                  
  
                  
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </>
    );
}
export default Hamburger