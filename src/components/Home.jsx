import React, { useEffect, useState } from 'react';
import { Sidebar, Books } from './';
import { fetchFromAPI } from '../utils/API';
import { useNavigate } from 'react-router-dom';

const Home = ({ user, setUser }) => {
    const [latestBooks, setLatestBooks] = useState([]);
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const [selectedBook, setSelectedBook] = useState(null);

    const navigate = useNavigate();
    
    const handleBookSelect = (book_id) => {
        setSelectedBook(book_id);
    }

    useEffect(()=>{
        if(selectedBook){
             navigate(`/book/${selectedBook}`);
        }
        setSelectedBook(null);
    }, [selectedBook]);

    useEffect(() => {
        fetchFromAPI('/book/latest').then((data) => {
            setLatestBooks(data);
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
                <Books books={latestBooks} handleBookSelect={handleBookSelect} />
                <hr style={{width: `${latestBooks.length * 100}px`}}/>
                <p className='list-title'>Top Rated</p>
                <Books books={latestBooks} handleBookSelect={handleBookSelect} />
            </div>
        </div>
    );
};

export default Home;
