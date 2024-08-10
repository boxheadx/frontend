import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Books from './Books';
import { fetchFromAPI, postToAPI } from '../utils/API';
import { Backdrop, CircularProgress } from '@mui/material';

const Search = () => {

  const { query } = useParams();
  const [searchResult, setSearchResult] = useState('');
  const [error, setError] = useState(null); 
  const [selectedBook, setSelectedBook] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [searching, setSearching] = useState(true);

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
    setFetched(false);
    try{
      const results = await postToAPI('/book/search', {
        search: query
      });

      console.log(results)
      setSearchResult(results);
      setFetched(true);
      setSearching(false);

    } catch(err){
      setSearching(false);
      setFetched(true);
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
     { searchResult.length && <Books books={searchResult} handleBookSelect={handleBookSelect}/>}
     { (error || !searchResult.length) && fetched && !searching && <p> No results! </p>}
     {searching && <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open>
                    <CircularProgress color="inherit" />
                    </Backdrop>}
    </div>
  )
}

export default Search