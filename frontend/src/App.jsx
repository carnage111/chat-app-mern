import React from 'react'
import './index.css'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Login from './components/entryPoints/Login'
import Signup from './components/entryPoints/Signup'
import Home from './components/entryPoints/Home'

const App = () => {
  return (
    <div id='app-div'>
      <BrowserRouter>
        <Nav />
        <div className="pro-container">
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
      
    </div>
  )
}

export default App