import React, { useContext, createContext, useEffect, useState } from 'react'
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

const ItemContext = createContext()

const ItemProvider = ({ children }) => {
    const [ coffeeList, setCoffeeList ] = useState([])

    const addItem = async (newItem) => {
      const docRef = await addDoc(collection(db, 'coffeeList'), newItem)
      setCoffeeList(prevList => [...prevList, { id: docRef.id, ...newItem }])
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'coffeeList'))
          const items = []
          querySnapshot.forEach((doc) => {
            // Log each document ID and data
            // console.log(`${doc.id} => ${doc.data()}`);

            // Add each document's data to the items array
            items.push({ id: doc.id, ...doc.data() });
          });
          
          // Update the state once with the complete list
          setCoffeeList(items);

        } catch (error) {
          console.error('Error fetching documents: ', error)
        }
      }
      fetchData()
    }, [])

    const deleteItem = async (coffeeId) => {
      try {   
        console.log(`Attempting to delete document with ID: ${coffeeId}`)
        await deleteDoc(doc(db, 'coffeeList', coffeeId))
        console.log(`Document with ID ${coffeeId} successfully deleted from Firestore`);
  
        // Remove the item from the local state
        setCoffeeList(prevList => prevList.filter(item => item.id !== coffeeId));
        alert('Item Deleted!')
        console.log(`Document with ID ${coffeeId} successfully removed from local state`);

      } catch (error) {
        console.error('Error deleting document: ', error)
        alert(`Error deleting document: ${error.message}`);
      }
    }

    const editItem = async (coffeeId, updatedItem) => {
      const docRef = doc(db, 'coffeeList', coffeeId)
      await updateDoc(docRef, updatedItem)
      try {
        setCoffeeList(prevList => 
          prevList.map(item => 
            item.id === coffeeId ? { id: coffeeId, ...updatedItem} : item
          )
        )
        alert('Item successfully updated!')
      } catch (error) {
        console.log('Error updating document: ', error)
        alert(`Error updating item ${error.message}`)
      }
    }
    
  return (
    <>
        <ItemContext.Provider value={{
           coffeeList, 
           setCoffeeList, 
           deleteItem, 
           addItem,
           editItem
        }}>
            {children}
        </ItemContext.Provider>
    </>
  )
}

export default ItemProvider

export const useCoffeeItem = () => {
    return useContext(ItemContext)
}