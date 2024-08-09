import React, { useEffect, useState } from 'react'
import { fetchFromAPI, postToAPI } from '../utils/API';
import addicon from '../assets/add.png';
import ShelfCard from './ShelfCard';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';

const Shelves = ({user, setUser}) => {

  const [shelves, setShelves] = useState([]);
  const [customShelves, setCustomShelves] = useState([]);
  const [newShelf, setNewShelf] = useState(null);
  const [newShelfError, setNewShelfError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [fetched, setFetched] = useState(false);

  const navigate = useNavigate();

  const getUser = async() =>{
    try{
      const me = await fetchFromAPI('/user/me');
      setUser(me);
    } catch(err){
      setUser(null);
    }
  }

  const getShelves = async()=>{

    try{
      const shelves = await fetchFromAPI('/shelves/shelfids');
      setShelves(shelves);
    } catch(err){
      console.log(err)
    }
  }

  const getCustomShelves = async()=>{
    try{
      const shelves = await fetchFromAPI('/shelves');
      setCustomShelves(shelves);
    } catch(err){
      console.log(err);
    }
  }

  const addShelf = async()=>{
    try{
      setNewShelf(null);
      setNewShelfError(null);
      await postToAPI('/shelves/create', {name: newShelf});
      getCustomShelves();
    } catch(err){
      if(err.msg){
        setNewShelfError(err.msg);
      }
      else{
        setNewShelfError(err);
      }
    }
  }

  const handleShelfSelect = (shelf_id)=>{
    setSelected(shelf_id);
  }

  useEffect(()=>{
    if(!user){
      getUser();
    }
    if(user){
      getShelves();
      getCustomShelves();
    }
  },[]);

  useEffect(()=>{
    if(user){
      getShelves();
      getCustomShelves();
    }
  },[user]);

  useEffect(()=>{
    if(selected){
      navigate(`/shelf/${selected}`);
      setSelected(null);
      console.log('shelf selected')
    }
  }, selected)

  return (
    <div>
      {!user && <p>You are not logged in!</p>}
      {user && !shelves.length && !fetched && <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open>
                    <CircularProgress color="inherit" />
                    </Backdrop>}
      {user && shelves.length &&(
        <div className='shelves-container'>
      {    
          shelves.map((shelf)=>{
            return <ShelfCard key={shelf.shelf_id} shelf={shelf} handleShelfSelect={handleShelfSelect}/>
          })
      }
        <h1 style={{margin: "30px"}}> Custom Shelves </h1>
        {customShelves && (
          <>
          {           
            customShelves.map((shelf)=>{
            return <ShelfCard key={shelf.shelf_id} shelf={shelf} handleShelfSelect={handleShelfSelect}/>
          })}
          </>
        )}
        <TextField
        label="New Shelf"
        variant="outlined"
        value={newShelf}
        onChange={(e) => setNewShelf(e.target.value)}
        sx={{ margin: '26px' }}
      />
        <img src={addicon} height={50} width={50} style={{margin: '26px', cursor: 'pointer'}} onClick={addShelf}/>
        <br/>
        {newShelfError && <div style={{ color: 'white', backgroundColor: 'red', padding: '30px', border: '1px solid red', borderRadius: '20px',marginTop: '70px', marginLeft: '100px', flex: 1, marginRight: '30px', height: '60px', textAlign: 'center', paddingBottom: '40px' }}><p>{newShelfError}</p></div>}
        </div>
      )}
     
    </div>
  )
}

export default Shelves