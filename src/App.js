import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Profile, Search, Home, BookDetails, Login, Register } from './components';
import './index.css';

const App = () => {
  return (
    <BrowserRouter>
        <div className='app'>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/profile' element={<Profile />} />
                <Route path='/search/:query' element={<Search />} />
                <Route path='/book/:book_id' element={<BookDetails />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register/>} />
            </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App