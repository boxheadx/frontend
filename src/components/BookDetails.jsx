import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchFromAPI } from '../utils/API';
import {BookInfo, Reviews} from './';

const BookDetails = () => {

  const [bookDetails, setBookDetails] = useState(null);
  const [user, setUser] = useState(null);
  const [loggedOut, setLoggedOut] = useState(true);
  const [genres, setGenres] = useState(null);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);
  const { book_id } = useParams();

  const fetchDetails = async()=>{
    try{
      const details = await fetchFromAPI(`/book/details/${book_id}`);
      const book_genres = await fetchFromAPI(`/book/details/genres/${book_id}`);
      setBookDetails(details);
      setGenres(book_genres);
      setError(null);
    } catch(err){
      if(err.msg){
        setError(err.msg)
      }
      else{
        setError(err);
      }
    }
  }

  const getUser = async() =>{
    try{
      const me = await fetchFromAPI('/user/me');
      setUser(me);
      setLoggedOut(false);
    } catch(err){
      setLoggedOut(true);
    }
  }

  useEffect(()=>{
    getUser();
    fetchDetails();
  }, [updated])

  return (
    <div className='details'>
      {
        error && <p> Failed to fetch book details</p>
      }
      {!error && <BookInfo bookDetails={bookDetails} genres={genres} book_id={book_id}/>}
      {!error && <Reviews book_id={book_id} user={user} setUpdated={setUpdated}/>}
    </div>
  )
}

export default BookDetails