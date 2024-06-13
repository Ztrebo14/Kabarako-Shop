import React, { useContext, createContext, useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

const ItemContext = createContext()

const ItemProvider = ({ children }) => {
    const [ coffeeList, setCoffeeList ] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'coffeeList'))
          const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          setCoffeeList(items)
        } catch (error) {
          console.error('Error fetching documents: ', error)
        }
      }

      fetchData()
    }, [])
    
  return (
    <>
        <ItemContext.Provider value={{ coffeeList, setCoffeeList }}>
            {children}
        </ItemContext.Provider>
    </>
  )
}

export default ItemProvider

export const useCoffeeItem = () => {
    return useContext(ItemContext)
}