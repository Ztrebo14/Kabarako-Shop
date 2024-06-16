import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Root from './Root'
import AddItem from '../pages/AddItem'
import DisplayItem from '../pages/DisplayItem'
import EditItem from '../pages/EditItem'
import ItemProvider from '../contexts/ItemContext'

function App() {


  return (
    <>
      <ItemProvider>
        <Router>
          <Routes>
            <Route path={'/'} element={<Root/>}>
              <Route index element={<DisplayItem />} />
              <Route path='add-item' element={<AddItem/>} />
              <Route path='/edit-item/:itemId' element={<EditItem />} />
            </Route>
          </Routes>
        </Router>
      </ItemProvider>
    </>
  )
}

export default App
