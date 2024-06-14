import React from 'react'
import '../styles/pages/DisplayItem.css'
import { useCoffeeItem } from '../contexts/ItemContext'

const DisplayItem = () => {
    const { coffeeList, deleteItem } = useCoffeeItem()
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
                <button onClick={() => deleteItem(coffee.id)}>Delete</button>
                <li><button>Edit</button></li>
            </ul>
          )) }
        </div>  
      </div>
    </>
  )
}

export default DisplayItem