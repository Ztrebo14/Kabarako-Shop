import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useCoffeeItem } from '../contexts/ItemContext'
import { v4 as uuidv4 } from 'uuid'

const AddItem = () => {
    const { addItem } = useCoffeeItem()
    const [ coffeeCategory, setCoffeeCategory ] = useState('')

    const coffeeNames = {
        Arabica: ['Cappuccino', 'Latte', 'Flat White', 'Americano', 'ColdBrew', 'Mocha'],
        Robusta: ['Cafe au Lait', 'Vietnamese', 'Doppio', 'Instant Coffee', 'Iced Coffee'],
        Mixed: ['Espresso', 'Ristretto', 'Macchiato']
    }

  return (
    <>
        <Formik
            initialValues={{
                coffeeId: uuidv4(),
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
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                    // addItem function that add document reference to firestore db
                    await addItem(values)
                    alert('Item added successfully')
                    resetForm()

                    // lets find the firestore document id
                    console.log('This is the Document ID: ', values)
                } catch (error) {
                    console.error("Error adding document: ", error);
                    alert("Error adding item, please try again.");
                } finally {
                    setSubmitting(false)
                }
            }}
        >
        {({setFieldValue}) => (
            <Form>
                <label>Coffee Type:</label>
                    <Field 
                        as='select' 
                        type='text' 
                        name='coffeeType' 
                        onChange={(e) => {
                            const value = e.target.value
                            setCoffeeCategory(value)
                            setFieldValue('coffeeType', value)
                            setFieldValue('coffeeName', '') //Is to reset the coffee name when coffee type change
                        }} 
                    >
                        <option value=''>Select Coffee Type</option>
                        <option value='Arabica'>Arabica</option>
                        <option value='Robusta'>Robusta</option>
                        <option value='Mixed'>Mixed</option>
                    </Field>
                    <ErrorMessage name='coffeeType' />
                    <br />
                    <label>Coffee Name:</label>
                    { coffeeCategory && (
                        <>
                            <Field as='select' type='text' name='coffeeName' >
                                <option value="">Select Coffee Name</option>
                                { coffeeNames[coffeeCategory].map((name) => (
                                    <option key={name} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name='coffeeName' />
                            <br />
                        </>
                    )}
                    <label>Size:</label>
                    <Field as='select' type='text' name='coffeeSize' >
                        <option value="">Select Size</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
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
        )}
        </Formik>
    </>
  )
}

export default AddItem