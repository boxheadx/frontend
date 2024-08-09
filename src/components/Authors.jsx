import React, { useEffect, useState } from 'react'
import { fetchFromAPI } from '../utils/API'
import AuthorCard from './AuthorCard';

const Authors = ({user, setUser}) => {

    const [topAuthors, setTopAuthors] = useState([]);

    const getTopAuthors = async()=>{
        try{
            const top = await fetchFromAPI('/author/top');
            setTopAuthors(top);
        } catch(err){
            if(err.msg){
                console.log(err.msg);
            }
        }
    }

    const getUser = async() =>{
        try{
          const me = await fetchFromAPI('/user/me');
          setUser(me);
        } catch(err){
          setUser(null);
        }
    }
  
    useEffect(()=>{
        if(!user){
            getUser();
        }
        getTopAuthors();
    }, [user])

    return (
        <>
            <h1 style={{margin: "20px"}}>Top Rated Authors</h1>
            <div className='shelf-books-container'>
                {
                    topAuthors.map((author)=>{
                        return <AuthorCard author_id={author.author_id} user_id={author.user_id} rating={author.average_rating} author_name={author.author_name}/>
                    })
                }
            </div>
        </>
        
    )
}

export default Authors