import { Formik, Form, Field } from 'formik'
import React from 'react'

interface SBProps {
    setSearch:React.Dispatch<React.SetStateAction<string>>
}

const SearchBar : React.FC<SBProps> = ({setSearch}) => {
    return (
        <Formik initialValues={{search: ""}} 
        onSubmit={async (values, {setErrors}) => {
          setSearch(values.search)
             
             }}>
            {({isSubmitting}) => (
                <Form className="flex shadow bg-gray-200 px-4 py-3 mb-3">
                
                      <Field className="shadow-inner w-full md:w-1/3" name="search" type="text" placeholder="search"/>
                      <div className="bg-gray-700 py-2 px-5">
                      <button type="submit" className="text-white text-xl">
                      <span className="iconify" data-icon="bi:search" data-inline="false">
                      </span>
                      </button>
                      </div>
                </Form>
            )}

        </Formik>
    )
}

export default SearchBar
