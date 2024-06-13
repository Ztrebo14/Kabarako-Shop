import React, { useContext, useState } from 'react'
import { createContext } from 'react'

const ItemContext = createContext()

const ItemProvider = ({ children }) => {
    const [ coffeeList, setCoffeeList ] = useState([])
    
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