import React, { useEffect, useState } from 'react'
import '../styles/pages/AddItem.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { useCoffeeItem } from '../contexts/ItemContext'


const EditItem = () => {
    const { itemId } = useParams() 
    const navigate = useNavigate()
    const { editItem, coffeeList } = useCoffeeItem()
    const [ coffeeCategory, setCoffeeCategory ] = useState ('')

    const initialData = coffeeList.find(item => item.id === itemId) || {
        coffeeType: '',
        coffeeName: '',
        coffeeSize: '',
        coffeePrice: '',
        coffeeCost: '',
        coffeeStock: '',
    }

    const coffeeNames = {
        Arabica: ['Cappuccino', 'Latte', 'Flat White', 'Americano', 'ColdBrew', 'Mocha'],
        Robusta: ['Cafe au Lait', 'Vietnamese', 'Doppio', 'Instant Coffee', 'Iced Coffee'],
        Mixed: ['Espresso', 'Ristretto', 'Macchiato']
    }

  return (
    <>
        <button onClick={() => navigate(-1)}>Back</button>
        <Formik
            initialValues={initialData}
            validationSchema={Yup.object({
                coffeeType: Yup.string().required('Required'),
                coffeeName: Yup.string().required('Required'),
                coffeeSize: Yup.string().required('Required'),
                coffeePrice: Yup.number().max(300, 'Must be less than 300').required('Required').positive(),
                coffeeCost: Yup.number().max(300, 'Must be less than 300').required('Required').positive(),
                coffeeStock: Yup.number().max(999, 'Maximum amount of stock').required('Required')
            })}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    // addItem function that add document reference to firestore db
                    await editItem(itemId, values)
                    console.log(values)
                    navigate('/')
                    // lets find the firestore document id
                    // console.log('This is the Document ID: ', values)
                } catch (error) {
                    console.error("Error updating document: ", error);
                    alert(`Error updating item: ${error.message}`);
                } finally {
                    setSubmitting(false)
                }
            }}
        >
        {({setFieldValue, values}) => (
            <Form>
                <div className="form-wrapper">
                    <h3>EditItem</h3>
                    <div className="form-inputs-field">
                        <div className="form-f1">
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
                        </div>
                        <div className="form-f2">
                            <label>Coffee Name:</label>
                            { values.coffeeType && (
                                <>
                                    <Field as='select' type='text' name='coffeeName' >
                                        <option value="">Select Coffee Name</option>
                                        { coffeeNames[values.coffeeType]?.map((name) => (
                                            <option key={name} value={name}>
                                                {name}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name='coffeeName' />
                                    <br />
                                </>
                            )}
                        </div>
                        <div className="form-f3">
                            <label>Size:</label>
                            <Field as='select' type='text' name='coffeeSize' >
                                <option value="">Select Size</option>
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                            </Field>
                            <ErrorMessage name='coffeeSize' />
                            <br />
                        </div>
                        <div className="form-f4">
                            <label>Price:</label>
                            <Field  type='number' name='coffeePrice' placeholder='Price' />
                            <ErrorMessage name='coffeePrice' />
                            <br />
                        </div>
                        <div className="form-f5">
                            <label>Cost:</label>
                            <Field  type='number' name='coffeeCost' placeholder='Cost' />
                            <ErrorMessage name='coffeeCost' />
                            <br />
                        </div>
                        <div className="form-f6">
                            <label>Amount in Stock:</label>
                            <Field  type='number' name='coffeeStock' placeholder='Amount in Stock' />
                            <ErrorMessage name='coffeeStock' />
                            <br />
                        </div>

                        <button className='form-submit' type='submit'>Submit</button>
                    </div>
                </div>
            </Form>
        )}
        </Formik>
    </>
  )
}

export default EditItem