import React, { useEffect, useState } from 'react';
import { Sidebar, Books } from './';
import { fetchFromAPI } from '../utils/API';
import { useNavigate } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';

const Home = ({ user, setUser }) => {
    const [latestBooks, setLatestBooks] = useState([]);
    const [topBooks, setTopBooks] = useState([]);
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const [selectedBook, setSelectedBook] = useState(null);

    const navigate = useNavigate();
    
    const handleBookSelect = (book_id) => {
        setSelectedBook(book_id);
    }

    useEffect(()=>{
        if(selectedBook){
             navigate(`/book/${selectedBook}`);
             setSelectedBook(null);
        }
    }, [selectedBook]);

    useEffect(() => {
        fetchFromAPI('/book/latest').then((data) => {
            setLatestBooks(data);
        });

        fetchFromAPI('/book/top').then((data) => {
            setTopBooks(data);
        });

        if(!user){
            setSidebarVisible(false);
        }
    }, []);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className='home'>
            {/* {user && <Sidebar isVisible={isSidebarVisible} />}
        
            {user && <button
                className={`toggle-button ${isSidebarVisible ? '' : 'sidebar-hidden'}`}
                onClick={toggleSidebar}>
                {isSidebarVisible ? '<' : '>'}
            </button>} */}
            {/* <div className={`content ${isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}> */}
                <div className='browse-content'>
                <p className='list-title'>Latest</p>
                {!latestBooks && <p className='loading'><Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open>
                    <CircularProgress color="inherit" />
                    </Backdrop></p>}
                <Books books={latestBooks} handleBookSelect={handleBookSelect} />
                <hr style={{width: `${latestBooks.length * 100}px`}}/>
                <p className='list-title'>Top Rated</p>
                <Books books={topBooks} handleBookSelect={handleBookSelect} />
            </div>
        </div>
    );
};

export default Home;
