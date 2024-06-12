import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import MySelect from '../components/MySelect'
import * as Yup from 'yup'
import CoffeeNameSelect from '../components/CoffeeNameSelect'

const AddItem = () => {
  return (
    <>
        <Formik
            initialValues={{
                coffeeType: '',
                coffeeName: '',
                coffeeSize: '',
                coffeePrice: '',
                coffeeCost: '',
                coffeeStock: '',
            }}
            validationSchema={Yup.object({
                coffeeType: Yup.string().required('Required'),
                coffeeName: Yup.string().required('Required'),
                coffeeSize: Yup.string().required('Required'),
                coffeePrice: Yup.number().max(200, 'Must be less than 200').required('Required').positive(),
                coffeeStock: Yup.number().max(999, 'Maximum amount of stock').required('Required')
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2))
                    setSubmitting(false)
                }, 3000)
            }}
        >
        <Form>
            <label>Coffee Type:</label>
                <Field as='select' type='text' name='coffeeType' >
                    <option value=''>Select Coffee Type</option>
                    <option value='arabica'>Arabica</option>
                    <option value='robusta'>Robusta</option>
                    <option value='mixed'>Mixed</option>
                </Field>
                <ErrorMessage name='coffeeType' />
                <br />
                <label>Coffee Name:</label>
                <Field as='select' type='text' name='coffeeName' >
                    <option value="">Select Coffee Name</option>
                    <option value="cappuccino">Cappuccino</option>
                    <option value="latte">Latte</option>
                    <option value="flat white">Flat White</option>
                    <option value="americano">Americano</option>
                    <option value="cold brew">Cold Brew</option>
                    <option value="mocha">Mocha</option>
                </Field>
                <ErrorMessage name='coffeeName' />
                <br />
                <label>Size:</label>
                <Field as='select' type='text' name='coffeeSize' >
                    <option value="">Select Size</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Hard</option>
                </Field>
                <ErrorMessage name='coffeeSize' />
                <br />
                <label>Price:</label>
                <Field  type='number' name='coffeePrice' placeholder='Price' />
                <ErrorMessage name='coffeePrice' />
                <br />
                <label>Cost:</label>
                <Field  type='number' name='coffeeCost' placeholder='Cost' />
                <ErrorMessage name='coffeeCost' />
                <br />
                <label>Amount in Stock:</label>
                <Field  type='number' name='coffeeStock' placeholder='Amount in Stock' />
                <ErrorMessage name='coffeeStock' />
                <br />

                <button type='submit'>Submit</button>
        </Form>
        </Formik>
    </>
  )
}

export default AddItem