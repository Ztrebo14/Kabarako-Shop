import React, { useState } from 'react'
import '../styles/pages/DisplayItem.css'
import { useCoffeeItem } from '../contexts/ItemContext'

const DisplayItem = () => {
  const { coffeeList, deleteItem } = useCoffeeItem()
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ itemToDelete, setItemToDelete ] = useState(null)

  const openModal = (coffeeId) => {
    setItemToDelete(coffeeId)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setItemToDelete(null)
    setIsModalOpen(false)
  }

  const confirmDelete = () => {
    deleteItem(itemToDelete)
    closeModal()
  }

    console.log(coffeeList)
  return (
    <>
      <div className="displayCoffeeItem-container">
        <h3>Kabarako Shop List</h3>
        <div className="displayCoffeeItem-component">
          { coffeeList.map((coffee, index) => (
            <ul key={index}>
                <li>Coffee Type: <b>{coffee.coffeeType}</b></li>
                <li>Coffee Name: <b>{coffee.coffeeName}</b></li>
                <li>Size: <b>{coffee.coffeeSize}</b></li>
                <li>Price: <b>{coffee.coffeePrice}</b></li>
                <li>Cost: <b>{coffee.coffeeCost}</b></li>
                <li>Amount in Stock: <b>{coffee.coffeeStock}</b></li>
                <div className="item-action">
                  <button>Edit</button>
                  <button onClick={() => openModal(coffee.id)}>Delete</button>
                  <button>Order Coffee</button>
                </div>
            </ul>
          )) }
        </div>  
      </div>
      { isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h4>Confirm Deletion</h4>
            <p>Are you sure you want to delete this item?</p>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={closeModal}>No</button>
          </div>
        </div>
      )}
    </>
  )
}

export default DisplayItem