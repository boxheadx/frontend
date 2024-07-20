import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Books from './Books';
import { fetchFromAPI, postToAPI } from '../utils/API';

const Search = () => {

  const { query } = useParams();
  const [searchResult, setSearchResult] = useState('');
  const [error, setError] = useState(null);

  const getSearchResults =async()=>{
    try{
      const results = await postToAPI('/book/search', {
        search: query
      });

      console.log(results)
      setSearchResult(results);
      if(searchResult.length == 0){
        setError('No results!');
      }

      else{
        setError('');
      }

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
  }, [searchResult])

  return (
    <div className='search-result'>
      <h1>Search results for '<a style={{color: 'blue'}}>{query}</a>'</h1>
     { searchResult && <Books books={searchResult} />}
     { error && <p> No results! </p>}
    </div>
  )
}

export default Search