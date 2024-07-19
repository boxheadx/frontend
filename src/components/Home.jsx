import React, { useEffect, useState } from 'react';
import {Sidebar, Books } from './';
import {fetchFromAPI} from '../utils/API';

const Home = () => {
    
    const [latestBooks, setLatestBooks] = useState([]);

    useEffect(()=>{
        fetchFromAPI('/book/latest').then((data) =>{
            setLatestBooks(data);
        })
    }, []);

    return (
        <div className='home'>
            <Sidebar />
            <p className='list-title'> Latest </p>
            <Books books={latestBooks}/>
        </div>

  )
}

export default Home