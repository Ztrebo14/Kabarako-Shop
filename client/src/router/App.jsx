import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Root from './Root'
import Dasboard from '../pages/Dashboard'
import AddItem from '../pages/AddItem'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path={'/' || '/home'} element={<Root/>}>
            <Route index element={<Dasboard/>} />
            <Route path='add-item' element={<AddItem/>} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
