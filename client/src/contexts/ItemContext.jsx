import React, { useContext, createContext, useEffect, useState } from 'react'
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc, runTransaction, Transaction } from 'firebase/firestore'
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
      // get the coffeeId and assigned it to docRef
      const docRef = doc(db, 'coffeeList', coffeeId)
      // using the updateDoc method, get the docRef and the updated values
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

    const orderItem = async (coffeeId, quantity) => {
      //first get the item doc in firestore db and assign it
      const itemRef = doc(db, 'coffeeList', coffeeId)

      try {
        //use runTransact function from firestore
        await runTransaction(db, async (transaction) => {
        const itemDoc  = await transaction.get(itemRef)
        if (!itemDoc.exists()) {
          throw new Error('Item does not exist')
        }

        const newCoffeeStock = itemDoc.data().coffeeStock - quantity

        if (newCoffeeStock < 0) {
          throw new Error('No enough inventory')
        }

        transaction.update(itemRef, {
          coffeeStock: newCoffeeStock
        })
        setCoffeeList(prevList => 
          prevList.map(item => 
            item.id === coffeeId ? { ...item, coffeeStock: newCoffeeStock  } : item
          )
        )
      })
      alert('Transaction successfully committed')
      console.log('Transaction successfully committed')
      } catch (error) {
        console.log('Transaction failed', error)
      }
    }
    
  return (
    <>
        <ItemContext.Provider value={{
           coffeeList, 
           setCoffeeList, 
           deleteItem, 
           addItem,
           editItem,
           orderItem
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