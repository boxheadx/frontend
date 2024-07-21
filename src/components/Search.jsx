import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Books from './Books';
import { fetchFromAPI, postToAPI } from '../utils/API';

const Search = () => {

  const { query } = useParams();
  const [searchResult, setSearchResult] = useState('');
  const [error, setError] = useState(null); 
  const [selectedBook, setSelectedBook] = useState(null);

  const navigate = useNavigate();
  
  const handleBookSelect = (book_id) => {
    console.log(book_id)
      setSelectedBook(book_id);
  }

  useEffect(()=>{
      if(selectedBook){
           navigate(`/book/${selectedBook}`);
      }
      setSelectedBook(null);
  }, [selectedBook]);

  const getSearchResults =async()=>{
    console.log('called search')
    setError(null);
    try{
      const results = await postToAPI('/book/search', {
        search: query
      });

      console.log(results)
      setSearchResult(results);

    } catch(err){
      console.log(err)
      if(err.msg){
        setError(err.msg);
      }
      else{
        setError(err);
      }
    }
  }

  useEffect(()=>{
    getSearchResults();
  }, [query])

  return (
    <div className='search-result'>
      <h1>Search results for '<a style={{color: 'blue'}}>{query}</a>'</h1>
     { searchResult && <Books books={searchResult} handleBookSelect={handleBookSelect}/>}
     { error || !searchResult.length && <p> No results! </p>}
    </div>
  )
}

export default Search