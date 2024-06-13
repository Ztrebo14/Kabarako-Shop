import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Root from './Root'
import Dasboard from '../pages/Dashboard'
import AddItem from '../pages/AddItem'
import DisplayItem from '../pages/DisplayItem'
import ItemProvider from '../contexts/ItemContext'

function App() {


  return (
    <>
      <ItemProvider>
        <Router>
          <Routes>
            <Route path={'/' || '/home'} element={<Root/>}>
              <Route index element={<Dasboard/>} />
              <Route path='display-item' element={<DisplayItem/> } />
              <Route path='add-item' element={<AddItem/>} />
            </Route>
          </Routes>
        </Router>
      </ItemProvider>
    </>
  )
}

export default App
