import React, { useEffect } from 'react'
import { fetchFromAPI } from '../utils/API';
import nopic from '../assets/no-picture.png'

const Shelves = ({user, setUser}) => {

  const getUser = async() =>{
    try{
      const me = await fetchFromAPI('/user/me');
      setUser(me);
    } catch(err){
      setUser(null);
    }
  }

  const getShelves = async()=>{
    
  }

  useEffect(()=>{
    if(!user){
      getUser();
    }
  },[]);

  return (
    <div>
      {!user && <p>You are not logged in!</p>}
     
    </div>
  )
}

export default Shelves