import React, { useState } from 'react'
import '../../src/styles/pages/DisplayItem.css'
import { useCoffeeItem } from '../contexts/ItemContext'
import { useNavigate } from 'react-router-dom'

const DisplayItem = () => {
  const { coffeeList, deleteItem, editItem } = useCoffeeItem()
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ itemToDelete, setItemToDelete ] = useState(null)
  const [ sortConfig, setSortConfig ] = useState({ field: 'coffeeType', order: 'asc'})
  const navigate = useNavigate()

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

  const sortCoffeeList = [...coffeeList].sort((a, b) => {
    const { field, order } = sortConfig
    let comparison = 0

    if (field === 'coffeePrice') {
      comparison = order === 'asc' ? a[field] - b[field] : b[field] - a[field]
    } else {
      comparison = order === 'asc' ? a[field].localeCompare(b[field]) : b[field].localeCompare(a[field])
    }

    return comparison
  })

  const toggleSortField = (field) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.field === field) {
        return {
          field,
          order: prevConfig.order === 'asc' ? 'desc' : 'asc'
        }
      }
      return { field, order: 'asc' }
    })
  }

  return (
    <>
      <div className="displayCoffeeItem-container">
        <h2>Kabarako Shop Menu</h2>
        <div className="toggle-sort">
          <button onClick={() => toggleSortField('coffeeType')}>
            Sort by Coffee Type: ({ 
              sortConfig.field === 'coffeeType' && sortConfig.order === 'asc' ? 'Ascending' : 'Descending' 
            })
          </button>
          <button onClick={() => toggleSortField('coffeeName')}>
            Sort by Coffee Name: ({ 
              sortConfig.field === 'coffeeName' && sortConfig.order === 'asc' ? 'Ascending' : 'Descending' 
            })
          </button>
          <button onClick={() => toggleSortField('coffeePrice')}>
            Sort by Coffee Price: ({ 
              sortConfig.field === 'coffeePrice' && sortConfig.order === 'asc' ? 'Ascending' : 'Descending' 
            })
          </button>
        </div>
        <div className="displayCoffeeItem-component">
          { sortCoffeeList.map((coffee, index) => (
            <ul key={index}>
                <li>Coffee Type: <b>{coffee.coffeeType}</b></li>
                <li>Coffee Name: <b>{coffee.coffeeName}</b></li>
                <li>Size: <b>{coffee.coffeeSize}</b></li>
                <li>Price: <b>{coffee.coffeePrice}</b></li>
                <li>Cost: <b>{coffee.coffeeCost}</b></li>
                <li>Amount in Stock: <b>{coffee.coffeeStock}</b></li>
                <div className="item-action">
                  <button onClick={() => navigate(`edit-item/${coffee.id}`)}>Edit</button>
                  <button onClick={() => openModal(coffee.id)}>Delete</button>
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
            <button className='button-confirm' onClick={confirmDelete}>Yes</button>
            <button className='button-close' onClick={closeModal}>No</button>
          </div>
        </div>
      )}
    </>
  )
}

export default DisplayItem