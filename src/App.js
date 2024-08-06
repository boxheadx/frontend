import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Profile, Search, Home, BookDetails, Login, Register, PostBook, Shelves } from './components';
import './index.css';
import getUser from './utils/Auth';

const App = () => {

    const [user, setUser] = useState(null);

    useEffect(()=>{
        getUser(setUser);
    }, [])
    return (
        <BrowserRouter>
            <div className='app'>
                <Navbar user={user} setUser={setUser}/>
                <Routes>
                    <Route path='/' element={<Home user={user} setUser={setUser}/>}/>
                    <Route path='/profile' element={<Profile user={user} setUser={setUser}/>} />
                    <Route path='/search/:query' element={<Search />} />
                    <Route path='/book/:book_id' element={<BookDetails />} />
                    <Route path='/login' element={<Login user={user} setUser={setUser}/>} />
                    <Route path='/register' element={<Register/>} />
                    <Route path='/author/post' element={<PostBook/>} />
                    <Route path='/shelves' element={<Shelves user={user} setUser={setUser}/>} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App