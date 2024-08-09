import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchFromAPI } from '../utils/API';
import ShelfBookCard from './ShelfBookCard';
import { Backdrop, CircularProgress } from '@mui/material';

const Shelf = ({user, setUser}) => {
    const { shelf_id } = useParams();

    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    const getUser = async() =>{
        try{
          const me = await fetchFromAPI('/user/me');
          setUser(me);
        } catch(err){
          setUser(null);
        }
    }

    const getBooks = async()=>{
        try{
            const books = await fetchFromAPI(`/shelves/${shelf_id}/books`);
            setBooks(books);
            console.log('hmmmm')
        } catch(err){
            if(err.response.data){
                setError(err.response.data);
                console.log(`error`);
            } else{
                console.log(err);
            }
        }
    }

    const handleRemove = async (status)=>{
        await getBooks();
    }

    useEffect(()=>{
        if(!user){
            getUser();
        }
    }, []);

    useEffect(()=>{
        if(user){
            getBooks();
        }
    }, [user]);
    

  return (
    <div>
        {error && <p>{error}</p>}
        {!error && !books.length && <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open>
                    <CircularProgress color="inherit" />
                    </Backdrop>}
        {user && !error && (
            <div className='shelf-books-container'>
                {books.map((book)=>{ return <ShelfBookCard book={book} key={book.book_id} shelf_id={shelf_id} handleRemove={handleRemove}/> })}
            </div>

        )}

    </div>
  )
}

export default Shelf