import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchFromAPI } from '../utils/API';
import {BookInfo, Reviews} from './';

const BookDetails = () => {

  const [bookDetails, setBookDetails] = useState(null);
  const [genres, setGenres] = useState(null);
  const [error, setError] = useState(null);
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

  useEffect(()=>{
    fetchDetails();
  }, [])

  return (
    <div className='details'>
      {
        error && <p> Failed to fetch book details</p>
      }
      {!error && <BookInfo bookDetails={bookDetails} genres={genres}/>}
      {!error && <Reviews book_id={book_id} />}
    </div>
  )
}

export default BookDetails